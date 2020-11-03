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

export interface UserUpdateResponse {
    message: string;
}

export interface Organization {
    orgId: number;
    name: string;
    role: string;
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

    updateUser(id: number, userInfo: UserInfo): Promise<UserUpdateResponse> {
        const promise = new Promise<UserUpdateResponse>((resolve, reject) => {
            const uri = `/api/users/${id}`;
            this.apiInstance.put<UserUpdateResponse>(uri, userInfo).then(
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getTeamsForUser(id: number): Promise<any> {
        throw new Error("Not implemented");
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getActualUser(): Promise<any> {
        throw new Error("Not implemented");
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    changePassword(oldPassword: string, newPassword: string): Promise<any> {
        throw new Error("Not implemented");
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    switchOrganization(id: number, organizationId: number): Promise<any> {
        throw new Error("Not implemented");
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    switchOrganizationForSignedUser(organizationId: number): Promise<any> {
        throw new Error("Not implemented");
    }

    getOrganizationsOfActualUser(): Promise<any> {
        throw new Error("Not implemented");
    }

    getTeamsOfActualUser(): Promise<any> {
        throw new Error("Not implemented");
    }

    starDashboard(dashboardId: number): Promise<any> {
        throw new Error("Not implemented");
    }

    unstarDashboard(dashboardId: number): Promise<any> {
        throw new Error("Not implemented");
    }

    getAuthTokenOfActualUser(): Promise<any> {
        throw new Error("Not implemented");
    }

    revokeAuthTokenOfActualUser(tokenId: number): Promise<any> {
        throw new Error("Not implemented");
    }
}
