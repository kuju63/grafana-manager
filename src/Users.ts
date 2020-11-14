import { ApiBase } from "./ApiBase";

export interface SearchUsersWithPagingResponse {
    totalCount: number;
    users: Array<UserInfo>;
    page: number;
    perPage: number;
}

export interface UserInfo {
    id?: number;
    name: string;
    login: string;
    email: string;
    isAdmin?: boolean;
    isDisabled?: boolean;
    lastSeenAt?: Date;
    lastSeenAtAge?: string;
    authLabels?: Array<string>;
    theme?: string;
    orgId?: number;
    isGrafanaAdmin?: boolean;
    isExternal?: boolean;
    updatedAt?: Date;
    createdAt?: Date;
    avatarUrl?: string;
}

export interface UpdateResponse {
    message: string;
}

export interface Organization {
    orgId: number;
    name: string;
    role: string;
}

export interface Team {
    id: number;
    orgId: number;
    name: string;
    email: string;
    avatarUrl: string;
    memberCount: number;
}

export class Users extends ApiBase {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    searchUsers(perpage = 1000, page = 1): Promise<Array<UserInfo>> {
        const promise = new Promise<Array<UserInfo>>((resolve, reject) => {
            this.apiInstance
                .get<Array<UserInfo>>(
                    `/api/users?perpage=${perpage}&page=${page}`
                )
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
                    (e) => {
                        reject({ error: e });
                    }
                );
        });
        return promise;
    }
    searchUsersWithPaging(
        perpage = 1000,
        page = 1,
        query?: string
    ): Promise<SearchUsersWithPagingResponse> {
        const promise = new Promise<SearchUsersWithPagingResponse>(
            (resolve, reject) => {
                let uri = `/api/users?perpage=${perpage}&page=${page}`;
                if (query) {
                    uri += `&query=${query}`;
                }
                this.apiInstance.get<SearchUsersWithPagingResponse>(uri).then(
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
                    (e) => {
                        reject({ error: e });
                    }
                );
            }
        );
        return promise;
    }

    getUserById(id: number): Promise<UserInfo> {
        const promise = new Promise<UserInfo>((resolve, reject) => {
            const uri = `/api/users/${id}`;
            this.apiInstance.get<UserInfo>(uri).then(
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
                (e) => {
                    reject({ error: e });
                }
            );
        });
        return promise;
    }

    lookupUserByUserNameOrEmail(userName: string): Promise<UserInfo> {
        const promise = new Promise<UserInfo>((resolve, reject) => {
            if (userName && userName !== "") {
                const uri = `/api/users/lookup?loginOrEmail=${userName}`;
                this.apiInstance.get<UserInfo>(uri).then(
                    (res) => {
                        if (res.status == 200) {
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
                    (e) => {
                        reject({ error: e });
                    }
                );
            } else {
                reject({
                    error: {
                        message: "Argument invalid",
                    },
                });
            }
        });
        return promise;
    }

    updateUser(id: number, userInfo: UserInfo): Promise<UpdateResponse> {
        const promise = new Promise<UpdateResponse>((resolve, reject) => {
            const uri = `/api/users/${id}`;
            this.apiInstance.put<UpdateResponse>(uri, userInfo).then(
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
                (e) => {
                    reject({ error: e });
                }
            );
        });
        return promise;
    }

    getOrganizationsForUser(id: number): Promise<Organization[]> {
        const promise = new Promise<Array<Organization>>((resolve, reject) => {
            const uri = `/api/users/${id}/orgs`;
            this.apiInstance.get<Array<Organization>>(uri).then(
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
                (e) => {
                    reject({ error: e });
                }
            );
        });
        return promise;
    }

    getTeamsForUser(id: number): Promise<Array<Team>> {
        const promise = new Promise<Array<Team>>((resolve, reject) => {
            const uri = `/api/users/${id}/teams`;
            this.apiInstance.get<Array<Team>>(uri).then(
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
                (e) => {
                    reject({ error: e });
                }
            );
        });
        return promise;
    }

    getActualUser(): Promise<UserInfo> {
        const promise = new Promise<UserInfo>((resolve, reject) => {
            const uri = "/api/user";
            this.apiInstance.get<UserInfo>(uri).then(
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
                (e) => {
                    reject({ error: e });
                }
            );
        });
        return promise;
    }

    changePassword(
        oldPassword: string,
        newPassword: string
    ): Promise<UpdateResponse> {
        const promise = new Promise<UpdateResponse>((resolve, reject) => {
            const uri = "/api/user/password";
            this.apiInstance
                .put<UpdateResponse>(uri, {
                    oldPassword: oldPassword,
                    newPassword: newPassword,
                })
                .then(
                    (res) => {
                        if (res.status === 200) {
                            resolve(res.data);
                        } else {
                            reject({
                                error: {
                                    status: res.status,
                                    message: res.statusText,
                                },
                            });
                        }
                    },
                    (e) => {
                        reject({
                            error: e,
                        });
                    }
                );
        });
        return promise;
    }

    switchOrganization(
        id: number,
        organizationId: number
    ): Promise<UpdateResponse> {
        const promise = new Promise<UpdateResponse>((resolve, reject) => {
            const uri = `/api/users/${id}/using/${organizationId}`;
            this.apiInstance.post(uri).then(
                (res) => {
                    if (res.status === 200) {
                        resolve(res.data);
                    } else {
                        reject({
                            error: {
                                status: res.status,
                                message: res.statusText,
                            },
                        });
                    }
                },
                (e) => {
                    reject({ error: e });
                }
            );
        });
        return promise;
    }

    switchOrganizationForSignedUser(
        organizationId: number
    ): Promise<UpdateResponse> {
        const promise = new Promise<UpdateResponse>((resolve, reject) => {
            const uri = `/api/user/using/${organizationId}`;
            this.apiInstance
                .post<UpdateResponse>(uri)
                .then((res) => {
                    if (res.status === 200) {
                        resolve(res.data);
                    } else {
                        reject({
                            error: {
                                status: res.status,
                                message: res.statusText,
                            },
                        });
                    }
                })
                .catch((e) => {
                    reject({ error: e });
                });
        });
        return promise;
    }

    getOrganizationsOfActualUser(): Promise<Array<Organization>> {
        const promise = new Promise<Array<Organization>>((resolve, reject) => {
            const uri = "/api/user/orgs";
            this.apiInstance
                .get<Array<Organization>>(uri)
                .then((res) => {
                    if (res.status === 200) {
                        resolve(res.data);
                    } else {
                        reject({
                            error: {
                                status: res.status,
                                message: res.statusText,
                            },
                        });
                    }
                })
                .catch((e) => reject({ error: e }));
        });
        return promise;
    }

    getTeamsOfActualUser(): Promise<Array<Team>> {
        const promise = new Promise<Array<Team>>((resolve, reject) => {
            const uri = "/api/user/teams";
            this.apiInstance
                .get<Array<Team>>(uri)
                .then((res) => {
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
                })
                .catch((e) => reject({ error: e }));
        });
        return promise;
    }

    starDashboard(dashboardId: number): Promise<UpdateResponse> {
        const promise = new Promise<UpdateResponse>((resolve, reject) => {
            const uri = `/api/user/stars/dashboard/${dashboardId}`;
            this.apiInstance
                .post<UpdateResponse>(uri)
                .then((res) => {
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
                })
                .catch((e) => reject({ error: e }));
        });
        return promise;
    }

    unstarDashboard(dashboardId: number): Promise<UpdateResponse> {
        const promise = new Promise<UpdateResponse>((resolve, reject) => {
            const uri = `/api/user/stars/dashboard/${dashboardId}`;
            this.apiInstance
                .delete(uri)
                .then((res) => {
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
                })
                .catch((e) => reject({ error: e }));
        });
        return promise;
    }

    getAuthTokenOfActualUser(): Promise<any> {
        throw new Error("Not implemented");
    }

    revokeAuthTokenOfActualUser(tokenId: number): Promise<any> {
        throw new Error("Not implemented");
    }
}
