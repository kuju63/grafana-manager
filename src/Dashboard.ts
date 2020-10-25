import { AxiosInstance } from "axios";

export interface DeleteDashboardResponse {
    title: string;
    message: string;
    id: number;
}

export class Dashboard {
    private apiInstance: AxiosInstance;
    /**
     * Initialize new instance for dashboard class.
     * @param apiInstance Axios instance.
     */
    constructor(apiInstance: AxiosInstance) {
        this.apiInstance = apiInstance;
    }

    async getByUidAsync(uid: string): Promise<unknown> {
        const promise = new Promise<unknown>((resolve, reject) => {
            if (!uid || uid === "") {
                reject({ error: "uid is empty" });
            } else {
                this.apiInstance
                    .get<unknown>(`/api/dashboards/uid/${uid}`)
                    .then(
                        (res) => {
                            if (res.status === 200) {
                                resolve(res.data);
                            } else {
                                reject({
                                    error: {
                                        message: res.statusText,
                                        status: res.status,
                                    },
                                });
                            }
                        },
                        (error) => {
                            reject({ error: error });
                        }
                    );
            }
        });
        return promise;
    }

    async deleteDashboardByUidAsync(
        uid: string
    ): Promise<DeleteDashboardResponse> {
        const promise = new Promise<DeleteDashboardResponse>(
            (resolve, reject) => {
                if (!uid || uid === "") {
                    reject({ error: "uid is empty" });
                } else {
                    this.apiInstance.delete(`/api/dashboards/uid/${uid}`).then(
                        (res) => {
                            if (res.status === 200) {
                                const responseData: DeleteDashboardResponse =
                                    res.data;
                                resolve(responseData);
                            } else {
                                reject({
                                    error: {
                                        message: res.statusText,
                                        status: res.status,
                                    },
                                });
                            }
                        },
                        (error) => {
                            reject({ error: error });
                        }
                    );
                }
            }
        );
        return promise;
    }
}
