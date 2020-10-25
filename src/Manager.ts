import Axios, { AxiosInstance } from "axios";

export class Manager {
    _token: string;
    apiInstance: AxiosInstance;
    constructor(token: string) {
        this._token = token;
        this.apiInstance = Axios.create({
            baseURL: `http://localhost:3000`,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer token",
            },
        });
    }
}
