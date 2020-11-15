import * as fs from "fs";
import { ApiBase } from "./ApiBase";

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

export class Dashboard extends ApiBase {
    async getByUidAsync(uid: string): Promise<unknown> {
        const promise = new Promise<unknown>((resolve, reject) => {
            if (!uid || uid === "") {
                reject({ error: "uid is empty" });
            } else {
                this.apiInstance
                    .get<unknown>(`/api/dashboards/uid/${uid}`)
                    .then(
                        (res) => {
                            this.statusOkResult(resolve, reject, res);
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
                    this.apiInstance
                        .delete<DeleteDashboardResponse>(
                            `/api/dashboards/uid/${uid}`
                        )
                        .then(
                            (res) => {
                                this.statusOkResult(resolve, reject, res);
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
            (resolve, reject) => {
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
                        const requestData = `{"dashboard": ${content}, "folderId": ${folderId}, "overwrite": true}`;
                        this.apiInstance
                            .post<CreateOrUpdateDashboardResponse>(
                                "/api/dashboard/db",
                                requestData
                            )
                            .then(
                                (res) => {
                                    this.statusOkResult(resolve, reject, res);
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
