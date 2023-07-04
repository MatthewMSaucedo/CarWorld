export enum CWUserType {
    Standard,
    Moderator,
    Admin
}

export class CWUser {
    API_RETRY: number = 4

    username: string
    userType: CWUserType
    session: CWAuthSession
    ddp: number

    constructor(
        username: string,
        authToken: string,
        userType: CWUserType,
        ddp: number
    ) {
        this.username = username
        this.userType = userType
        this.ddp = ddp
        this.session = {
            token: authToken,
            expiration: ""
        }
    }

    async grantDDP(quantity: number): Promise<boolean> {
        let waitTime = 0
        let attempts = 1
        let res: any | undefined = undefined;

        // Exponential backoff for retries
        while(attempts < this.API_RETRY) {
            await this.waitFor(waitTime)
            waitTime = 2 ** attempts * 100

            // POST DDP to CWApi
            res = await fetch("url-string/ddp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify({ token: this.session?.token }),
            })
            res = await res.json()

            attempts++
            // TODO: find actual res structure
            if (res.success) {
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

    async refreshAuth(): Promise<void> {
        // POST DDP to CWApi
        let res = await fetch("url-string/refresh", {
            method: "POST",
            headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*"},
            body: JSON.stringify({ token: this.session.token }),
        })

        // Update authtoken or log error
        // TODO: find actual res structure
        let jsonRes: { code: number, body: any } = await res.json()
        if ( jsonRes.body === null || jsonRes.code !== 200) {
            console.log("Failed to refresh authtoken")
        } else {
            this.session.token = jsonRes.body.token
        }
    }

    private waitFor(milliseconds: number): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, milliseconds));
    }
}

export type CWAuthSession = {
    token: string
    expiration: string
}
