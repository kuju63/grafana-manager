import { AxiosInstance } from "axios";

export abstract class ApiBase {
    protected apiInstance: AxiosInstance;
    /**
     * Initialize new instance for dashboard class.
     * @param apiInstance Axios instance.
     */
    constructor(apiInstance: AxiosInstance) {
        this.apiInstance = apiInstance;
    }
}
