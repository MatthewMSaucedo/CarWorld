import jwt_decode from "jwt-decode"
import { CW_API_ENDPOINTS, API_RETRY } from '../../../AppConstants'

export type CWBackendTokenDecoded = {
    exp: number
}

export enum CWUserType {
    Standard,
    Moderator,
    Admin,
    Guest
}

export class CWUser {
    // User details
    username: string
    userType: CWUserType

    // Auth
    authToken?: CWToken
    refreshToken?: CWToken
    isLoggedIn: boolean

    // Digital Devotion Points
    // TODO: Get this number in the login response
    ddp: number

    constructor(
        username: string,
        userType: CWUserType,
        ddp: number,
        isLoggedIn: boolean,
        authToken: string,
        refreshToken?: string
    ) {
        this.username = username
        this.userType = userType
        this.ddp = ddp
        this.isLoggedIn = isLoggedIn

        if (authToken) {
            this.authToken = new CWToken(authToken)
        }
        if (refreshToken) {
            this.refreshToken = new CWToken(refreshToken) 
        }
    }

    async grantDDP(quantity: number): Promise<boolean> {
        let waitTime = 0
        let attempts = 0
        let res: any | undefined = undefined;

        // NOTE: I don't think the caller should have to use the Redux slice for this;
        //       rather, I think it makes sense to do it under the hood here.
        //       As long as we are always following these mutable actions with an update
        //       to the Redux store, then this will handle itself. Sure; a failed refresh
        //       looks the same, in the return of this function call, as a failed DDP grant.
        //       However, since we will follow this call with an update to the Redux store,
        //       the importation mutation difference (isLoggedIn == true/false) will present
        //       itself. That should trigger a re-render, if false.
        // Update Authtoken if neccessary
        const currentTime = new Date()
        if ((this.refreshToken?.expiration || new Date(0)) < currentTime) {
            const refreshWorked = await this.refreshAuth()
            if (!refreshWorked) {
                this.isLoggedIn = false
                return false
            }
        }

        // Exponential backoff for retries
        while(attempts < API_RETRY) {
            await this.waitFor(waitTime)
            waitTime = 2 ** attempts * 100

            // POST DDP to CWApi
            res = await fetch(CW_API_ENDPOINTS.user.grantddp, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Authorization": this.authToken?.token || ""
                },
                body: JSON.stringify({ ddpGranted: quantity }),
            })
            res = await res.json()

            attempts++
            if (res.code === 200) {
                break
            }
        }

        let ddpGrantSucceeded: boolean
        if (attempts === 3) {
            console.log(`Failed to add {quantity} DDP to user {this.username}`)
            ddpGrantSucceeded = false
        } else {
            this.ddp += quantity
            ddpGrantSucceeded = true
        }

        return ddpGrantSucceeded
    }

    async refreshAuth(): Promise<boolean> {
        // Make sure refresh token is still valid
        const currentTime = new Date()
        if ((this.refreshToken?.expiration || new Date(0)) < currentTime) {
            return false
        }

        // GET new Auth token via Refresh
        let res = await fetch("url-string/refresh", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({ token: this.refreshToken?.token }),
        })

        // Update authtoken or log error
        // TODO: find actual res structure
        let jsonRes: { code: number, body: any } = await res.json()
        if ( jsonRes.body === null || jsonRes.code !== 200) {
            console.log("Failed to refresh authtoken")
            return false
        } else {
            this.authToken?.updateToken(jsonRes.body.token)
            return true
        }
    }

    private waitFor(milliseconds: number): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, milliseconds));
    }
}

export class CWToken {
    token: string
    expiration: Date

    constructor(token: string) {
        this.token = token
        this.expiration = CWToken.determineExpiration(token)
    }

    static determineExpiration(token: string): Date {
        const expDate = new Date(0)

        const decodedToken: CWBackendTokenDecoded = jwt_decode(token)
        expDate.setUTCSeconds(decodedToken.exp)

        return expDate
    }

    updateToken(token: string) {
        this.token = token
        this.expiration = CWToken.determineExpiration(token)
    }
}
