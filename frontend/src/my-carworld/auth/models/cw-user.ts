import jwt_decode from "jwt-decode"
import { CW_API_ENDPOINTS, API_RETRY } from '../../../AppConstants'

export type CWBackendTokenDecoded = {
    exp: number
}

export type CWReduxLoginUserReqBody = {
    username: string,
    userType: string,
    authToken: string,
    refreshToken: string,
    isLoggedIn: boolean,
    referral: string,
    joined: string,
    ddp: number
}

export enum CWUserType {
    Standard,
    Moderator,
    Admin,
    Guest
}

// TODO: Add try/catch wrappings
export class CWUser {
    // User details
    username: string
    userType: CWUserType

    // Auth
    authToken: CWToken
    refreshToken: CWToken
    isLoggedIn: boolean

    // Digital Devotion Points
    ddp: number
    referral: string

    // Metadata, stringified Date() obj
    joined?: string

    constructor(
        username: string,
        userType: CWUserType,
        ddp: number,
        isLoggedIn: boolean,
        authToken: string,
        refreshToken: string,
        referral: string,
        joined?: string
    ) {
        this.username = username
        this.userType = userType

        this.ddp = ddp
        this.referral = referral

        this.isLoggedIn = isLoggedIn

        this.authToken = new CWToken(authToken)
        this.refreshToken = new CWToken(refreshToken)

        if (joined) {
            this.joined = joined
        }
    }

    static staticLogin(loginReq: CWReduxLoginUserReqBody): CWUser {
        return new CWUser(
            loginReq.username,
            // NOTE: TypeScript 2.1 added keyof to allow string index here
            CWUserType[loginReq.userType as keyof typeof CWUserType],
            loginReq.ddp,
            loginReq.isLoggedIn,
            loginReq.authToken,
            loginReq.refreshToken,
            loginReq.referral,
            loginReq.joined,
        )
    }

    static staticUserFromGuestToken(guestToken: string): CWUser {
        return new CWUser(
            "guest",            // username
            CWUserType.Guest,   // userType
            0,                  // ddp
            false,              // isLoggedIn
            guestToken,         // authToken
            "",                 // refreshToken
            "",                 // referral
        )
    }

    async refreshAuth(): Promise<boolean> {
        // Make sure refresh token is still valid
        const currentTime = new Date()
        if (this.refreshToken.expiration < currentTime) {
            return false
        }

        // GET new Auth token via Refresh
        let res = await fetch("url-string/refresh", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({ token: this.refreshToken.token }),
        })

        // Update authtoken or log error
        // TODO: find actual res structure
        let jsonRes: { code: number, body: any } = await res.json()
        if ( jsonRes.body === null || jsonRes.code !== 200) {
            console.log("Failed to refresh authtoken")
            return false
        } else {
            this.authToken.updateToken(jsonRes.body.token)
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

    static isExpired(expiration: Date): boolean {
        const exp = new Date(expiration)
        return new Date() > exp
    }

    static determineExpiration(token: string): Date {
        // This defaults to some date from 1980
        const expDate = new Date(0)

        // Dummy token for initialization of Redux store
        if (token === "") {
            return expDate
        }

        const decodedToken: CWBackendTokenDecoded = jwt_decode(token)
        expDate.setUTCSeconds(decodedToken.exp)

        return expDate
    }

    updateToken(token: string) {
        this.token = token
        this.expiration = CWToken.determineExpiration(token)
    }


    // static updateToken(token: string) {
        // this.token = token
        // this.expiration = CWToken.determineExpiration(token)
    // }
}
