import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
    RegisterRequest,
    LoginRequest,
    LoginResponse,
    RegisterResponse,
    ReportedRequest,
    ReportedResponse,
    GetScoreCardRequest,
    GetScoreCardResponse,
    GetIntrinsicValueRequest,
    GetIntrinsicValueResponse
} from './app-endpoint.constants';

@Injectable({ providedIn: 'root' })
export class AppEndpointService {
    private _dbUrl = 'http://localhost:3000/api/';

    constructor(private http: HttpClient) { }

    public getReported(reportedRequest: ReportedRequest): Promise<ReportedResponse> {
        return this.http.post<ReportedResponse>(`${this._dbUrl}security/getReportedTicker`, reportedRequest).toPromise();
    }

    public register(registerRequest: RegisterRequest): Promise<RegisterResponse>  {
        return this.http.post<RegisterResponse>(`${this._dbUrl}user/register`, registerRequest).toPromise();
    }

    public login(loginRequest: LoginRequest): Promise<LoginResponse> {
        return this.http.post<LoginResponse>(`${this._dbUrl}user/login`, loginRequest).toPromise();
    }

    public getWatchList(getWatchlistRequest) {
        return this.http.post(`${this._dbUrl}user/getWatchlist`, getWatchlistRequest).toPromise();
    }

    public addWatchlistTicker(addWatchlistTickerRequest) {
        return this.http.post(`${this._dbUrl}user/addWatchlistTicker`, addWatchlistTickerRequest).toPromise();
    }

    public removeWatchlistTicker(addWatchlistTickerRequest) {
        return this.http.post(`${this._dbUrl}user/removeWatchlistTicker`, addWatchlistTickerRequest).toPromise();
    }

    public getScoreCard(getScoreCardRequest: GetScoreCardRequest): Promise<GetScoreCardResponse> {
        return this.http.post<GetScoreCardResponse>(`${this._dbUrl}security/scorecard`, getScoreCardRequest).toPromise();
    }

    public getIntrinsicValue(getIntrinsicValueRequest: GetIntrinsicValueRequest): Promise<GetIntrinsicValueResponse> {
        return this.http.post<GetIntrinsicValueResponse>(`${this._dbUrl}security/getIntrinsicValue`, getIntrinsicValueRequest).toPromise();
    }
}
