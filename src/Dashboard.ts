import { AxiosInstance } from "axios";
import * as fs from "fs";

export interface DeleteDashboardResponse {
    title: string;
    message: string;
    id: number;
}

export interface CreateOrUpdateDashboardResponse {
    id: number;
    uid: string;
    url: string;
    status: string;
    version: number;
    /**
     * Deprecated in Grafana v5.0
     */
    slug?: string;
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

    async createOrUpdate(
        sourceFile: string,
        folderId = 0
    ): Promise<CreateOrUpdateDashboardResponse> {
        const promise = new Promise<CreateOrUpdateDashboardResponse>(
            (resole, reject) => {
                if (!sourceFile || sourceFile === "") {
                    reject({ error: "source file is null or empty" });
                }
                if (!fs.existsSync(sourceFile)) {
                    reject({ error: "Source file not found." });
                } else {
                    const content = fs.readFileSync(sourceFile, {
                        encoding: "utf8",
                    });
                    if (content && content !== "") {
                        // TODO Request for create or update dashboard.
                        const requestData = `{"dashboard": ${content}, "folderId": ${folderId}, "overwrite": true}`;
                        this.apiInstance
                            .post("/api/dashboard/db", requestData)
                            .then(
                                (res) => {
                                    if (res.status === 200) {
                                        const responseData: CreateOrUpdateDashboardResponse =
                                            res.data;
                                        resole(responseData);
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
                    } else {
                        reject({ error: "Source file content is empty." });
                    }
                }
            }
        );
        return promise;
    }
}
