export enum CWUserType {
    Standard,
    Moderator,
    Admin
}

export class CWUser {
    username: string
    userType: CWUserType
    ddp: number
    session?: CWAuthSession


    constructor(username: string, userType = CWUserType.Standard) {
        this.username = username
        this.userType = userType
        this.ddp = 0
    }

    async grantDDP(quantity): boolean {
        let waitTime = 0
        let attempts = 1
        let res: any | undefined = undefined;

        while(attempts < 3) {
            await this.waitFor(waitTime)
            waitTime = 2 ** attempts * 100

            res = await fetch("url-string/ddp", {
                method: "POST",
                headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*"},
                body: JSON.stringify({ token: this.session?.token }),
            })
            res = await res.json()

            attempts++
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

    async refreshAuth() {
        let res = await fetch("url-string/refresh", {
            method: "POST",
            headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*"},
            body: JSON.stringify({ token: this.session?.token }),
        })
        res = await res.json()

        this.session?.token = res.body.authtoken
    }

    private waitFor(milliseconds) {
        return new Promise((resolve) => setTimeout(resolve, milliseconds));
    }
}

export interface CWAuthSession {
    token: string
    expiration: string
}
