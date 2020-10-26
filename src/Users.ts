import { APIBase } from "./ApiBase";

export interface SearchUsersWithPagingResponse {
    totalCount: number;
    users: Array<UserInfo>;
    page: number;
    perPage: number;
}

export interface UserInfo {
    id: number;
    name: string;
    login: string;
    email: string;
    isAdmin: boolean;
    isDisabled: boolean;
    lastSeenAt: Date;
    lastSeenAtAge: string;
    authLabels: Array<string>;
}

export class Users extends APIBase {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    searchUsers(perpage = 1000, page = 1): Promise<Array<UserInfo>> {
        const promise = new Promise((resolve, reject) => {
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
        throw new Error("Not implemented");
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getUserById(id: number): Promise<any> {
        throw new Error("Not implemented");
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    lookupUserByUserNameOrEmail(userName: string): Promise<any> {
        throw new Error("Not implemented");
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updateUser(id: number): Promise<any> {
        throw new Error("Not implemented");
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getOrganizationsForUser(id: number): Promise<any> {
        throw new Error("Not implemented");
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
