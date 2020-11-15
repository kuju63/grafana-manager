import { AxiosInstance, AxiosResponse } from "axios";

export abstract class ApiBase {
    protected apiInstance: AxiosInstance;
    /**
     * Initialize new instance for dashboard class.
     * @param apiInstance Axios instance.
     */
    constructor(apiInstance: AxiosInstance) {
        this.apiInstance = apiInstance;
    }

    protected statusOkResult<T>(
        resolve: (value: T | Promise<T>) => void,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        reject: (reason?: any) => void,
        response: AxiosResponse<T>
    ): void {
        if (response.status === 200) {
            resolve(response.data);
        } else {
            reject({
                error: {
                    message: response.statusText,
                    status: response.status,
                },
            });
        }
    }
}
