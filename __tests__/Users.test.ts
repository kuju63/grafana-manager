import axios, { AxiosInstance } from "axios";
import {
    SearchUsersWithPagingResponse,
    UpdateResponse,
    UserInfo,
    Users,
} from "../src/Users";

jest.mock("axios");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const myAxios: jest.Mocked<AxiosInstance> = axios as any;

describe("Users API Test", () => {
    beforeEach(() => {
        myAxios.get.mockClear();
        myAxios.put.mockClear();
        myAxios.post.mockClear();
        myAxios.delete.mockClear();
    });
    it("initialize", () => {
        expect.assertions(0);
        new Users(myAxios);
    });

    it("searchUsersSuccess", async () => {
        const expectList = [
            {
                id: 1,
                name: "Admin",
                login: "admin",
                email: "admin@mygraf.com",
                isAdmin: true,
                isDisabled: false,
                lastSeenAt: "2020-04-10T20:29:27+03:00",
                lastSeenAtAge: "2m",
                authLabels: ["OAuth"],
            },
            {
                id: 2,
                name: "User",
                login: "user",
                email: "user@mygraf.com",
                isAdmin: false,
                isDisabled: false,
                lastSeenAt: "2020-01-24T12:38:47+02:00",
                lastSeenAtAge: "2m",
                authLabels: [],
            },
        ];
        myAxios.get.mockResolvedValue({
            data: expectList,
            status: 200,
        });
        const usersApi = new Users(myAxios);
        await expect(usersApi.searchUsers(100, 1)).resolves.toEqual(expectList);
    });

    it("searchUsersReturnFailStatus", async () => {
        const res = { message: "Unauthorized" };
        myAxios.get.mockResolvedValue({
            data: res,
            status: 403,
            statusText: "Unauthorized",
        });
        const usersApi = new Users(myAxios);
        await expect(usersApi.searchUsers(100, 1)).rejects.toEqual({
            error: { message: "Unauthorized", status: 403 },
        });
    });

    it("searchUsersFailed", async () => {
        myAxios.get.mockRejectedValue({ message: "Connection error" });
        const usersApi = new Users(myAxios);
        await expect(usersApi.searchUsers(100, 1)).rejects.toEqual({
            error: { message: "Connection error" },
        });
    });

    it("searchUsersPagingSuccess", async () => {
        const expectUser: Array<UserInfo> = [
            {
                id: 1,
                name: "Admin",
                login: "admin",
                email: "admin@mygraf.com",
                isAdmin: true,
                isDisabled: false,
                lastSeenAt: new Date("2020-04-10T20:29:27+03:00"),
                lastSeenAtAge: "2m",
                authLabels: ["OAuth"],
            },
            {
                id: 2,
                name: "User",
                login: "user",
                email: "user@mygraf.com",
                isAdmin: false,
                isDisabled: false,
                lastSeenAt: new Date("2020-01-24T12:38:47+02:00"),
                lastSeenAtAge: "2m",
                authLabels: [],
            },
        ];
        const expectResponse: SearchUsersWithPagingResponse = {
            totalCount: 2,
            users: expectUser,
            page: 1,
            perPage: 10,
        };
        myAxios.get.mockResolvedValue({
            data: expectResponse,
            status: 200,
        });
        const usersApi = new Users(myAxios);
        await expect(
            usersApi.searchUsersWithPaging(10, 1, "sample")
        ).resolves.toEqual(expectResponse);
    });

    it("searchUsersWithPagingReturnFailStatus", async () => {
        const res = { message: "Unauthorized" };
        myAxios.get.mockResolvedValue({
            data: res,
            status: 403,
            statusText: "Unauthorized",
        });
        const usersApi = new Users(myAxios);
        await expect(
            usersApi.searchUsersWithPaging(100, 1, "sample")
        ).rejects.toEqual({ error: { message: "Unauthorized", status: 403 } });
    });

    it("searchUsersWithPagingFailed", async () => {
        myAxios.get.mockRejectedValue({ message: "Connection error" });
        const usersApi = new Users(myAxios);
        await expect(
            usersApi.searchUsersWithPaging(100, 1, "sample")
        ).rejects.toEqual({ error: { message: "Connection error" } });
    });

    it("getUserByIdFailed", async () => {
        myAxios.get.mockRejectedValue({ message: "Connection error" });
        const usersApi = new Users(myAxios);
        expect.assertions(1);
        await expect(usersApi.getUserById(1)).rejects.toEqual({
            error: {
                message: "Connection error",
            },
        });
    });

    it("getUserByIdNotFound", async () => {
        myAxios.get.mockResolvedValue({
            status: 404,
            statusText: "Not found",
        });
        const usersApi = new Users(myAxios);
        expect.assertions(1);
        await expect(usersApi.getUserById(1)).rejects.toEqual({
            error: {
                message: "Not found",
                status: 404,
            },
        });
    });

    it("getUserByIdSuccess", async () => {
        myAxios.get.mockResolvedValue({
            status: 200,
            statusText: "ok",
            data: {
                id: "1",
                email: "user@mygraf.com",
                name: "admin",
                login: "admin",
                theme: "light",
                orgId: 1,
                isGrafanaAdmin: true,
                isDisabled: true,
                isExternal: false,
                authLabels: [],
                updatedAt: new Date("2019-09-09T11:31:26+01:00"),
                createdAt: new Date("2019-09-09T11:31:26+01:00"),
                avatarUrl: "",
            },
        });
        const usersApi = new Users(myAxios);
        await expect(usersApi.getUserById(1)).resolves.toEqual({
            id: "1",
            email: "user@mygraf.com",
            name: "admin",
            login: "admin",
            theme: "light",
            orgId: 1,
            isGrafanaAdmin: true,
            isDisabled: true,
            isExternal: false,
            authLabels: [],
            updatedAt: new Date("2019-09-09T11:31:26+01:00"),
            createdAt: new Date("2019-09-09T11:31:26+01:00"),
            avatarUrl: "",
        });
    });

    it("lookupUserByUserNameOrEmailSucceed", async () => {
        myAxios.get.mockResolvedValue({
            status: 200,
            statusTest: "OK",
            data: {
                id: 1,
                email: "user@mygraf.com",
                name: "admin",
                login: "admin",
                theme: "light",
                orgId: 1,
                isGrafanaAdmin: true,
                isDisabled: false,
                isExternal: false,
                authLabels: null,
                updatedAt: new Date("2019-09-25T14:44:37+01:00"),
                createdAt: new Date("2019-09-25T14:44:37+01:00"),
                avatarUrl: "",
            },
        });

        const usersApi = new Users(myAxios);
        await expect(
            usersApi.lookupUserByUserNameOrEmail("sample@foo.com")
        ).resolves.toEqual({
            id: 1,
            email: "user@mygraf.com",
            name: "admin",
            login: "admin",
            theme: "light",
            orgId: 1,
            isGrafanaAdmin: true,
            isDisabled: false,
            isExternal: false,
            authLabels: null,
            updatedAt: new Date("2019-09-25T14:44:37+01:00"),
            createdAt: new Date("2019-09-25T14:44:37+01:00"),
            avatarUrl: "",
        });
    });

    it("lookupUserByUserNameOrEmailResponseNotFound", async () => {
        myAxios.get.mockResolvedValue({
            status: 404,
            statusText: "Not Found",
        });

        const usersApi = new Users(myAxios);
        await expect(
            usersApi.lookupUserByUserNameOrEmail("sample@foo.com")
        ).rejects.toEqual({
            error: {
                message: "Not Found",
                status: 404,
            },
        });
    });

    it("lookupUserByUserNameOrEmailArgumentEmpty", async () => {
        const usersApi = new Users(myAxios);
        await expect(usersApi.lookupUserByUserNameOrEmail("")).rejects.toEqual({
            error: {
                message: "Argument invalid",
            },
        });
    });

    it("lookupUserByUserNameOrEmailRejected", async () => {
        myAxios.get.mockRejectedValue({
            message: "Connection Failed",
        });

        const usersApi = new Users(myAxios);
        await expect(
            usersApi.lookupUserByUserNameOrEmail("sample@foo.com")
        ).rejects.toEqual({
            error: {
                message: "Connection Failed",
            },
        });
    });

    it("updateUserSucceed", async () => {
        myAxios.put.mockResolvedValue({
            status: 200,
            statusText: "ok",
            data: {
                message: "User updated",
            },
        });
        const usersApi = new Users(myAxios);
        await expect(
            usersApi.updateUser(2, {
                email: "foo@bar.com",
                name: "foo",
                login: "user",
                theme: "light",
            })
        ).resolves.toEqual({
            message: "User updated",
        });
    });

    it("updateUserFailed", async () => {
        myAxios.put.mockResolvedValue({
            status: 404,
            statusText: "not found",
        });
        const usersApi = new Users(myAxios);
        await expect(
            usersApi.updateUser(2, {
                email: "foo@bar.com",
                name: "foo",
                login: "user",
                theme: "light",
            })
        ).rejects.toEqual({
            error: {
                message: "not found",
                status: 404,
            },
        });
    });

    it("updateUserCommunicationFailed", async () => {
        myAxios.put.mockRejectedValue({ message: "Connection Failed" });
        const usersApi = new Users(myAxios);
        await expect(
            usersApi.updateUser(2, {
                email: "foo@bar.com",
                name: "foo",
                login: "user",
                theme: "light",
            })
        ).rejects.toEqual({
            error: {
                message: "Connection Failed",
            },
        });
    });

    it("getOrganizationForUserSuccess", async () => {
        myAxios.get.mockResolvedValue({
            status: 200,
            statusText: "ok",
            data: [
                {
                    orgId: 1,
                    name: "Main Org.",
                    role: "Admin",
                },
            ],
        });
        const usersApi = new Users(myAxios);
        await expect(usersApi.getOrganizationsForUser(1)).resolves.toEqual([
            {
                orgId: 1,
                name: "Main Org.",
                role: "Admin",
            },
        ]);
    });

    it("getOrganizationForUserResponseNotFound", async () => {
        myAxios.get.mockResolvedValue({
            status: 404,
            statusText: "Not found",
        });
        const usersApi = new Users(myAxios);
        await expect(usersApi.getOrganizationsForUser(1)).rejects.toEqual({
            error: { message: "Not found", status: 404 },
        });
    });

    it("getOrganizationForUserFailed", async () => {
        myAxios.get.mockRejectedValue({ message: "Connection failed" });
        const usersApi = new Users(myAxios);
        await expect(usersApi.getOrganizationsForUser(1)).rejects.toEqual({
            error: {
                message: "Connection failed",
            },
        });
    });

    it("getTeamsForUserSucceed", async () => {
        myAxios.get.mockResolvedValue({
            status: 200,
            statusText: "ok",
            data: [
                {
                    id: 1,
                    orgId: 1,
                    name: "team1",
                    email: "",
                    avatarUrl: "/avatar/3fcfe295eae3bcb67a49349377428a66",
                    memberCount: 1,
                },
            ],
        });
        const usersApi = new Users(myAxios);
        await expect(usersApi.getTeamsForUser(1)).resolves.toEqual([
            {
                id: 1,
                orgId: 1,
                name: "team1",
                email: "",
                avatarUrl: "/avatar/3fcfe295eae3bcb67a49349377428a66",
                memberCount: 1,
            },
        ]);
    });

    it("getTeamsForUserResponseNotFound", async () => {
        axiosGetResponseNotFound();
        const usersApi = new Users(myAxios);
        await expect(usersApi.getTeamsForUser(1)).rejects.toEqual(
            responseError
        );
    });

    it("getActualUserSucceed", async () => {
        myAxios.get.mockResolvedValue({
            status: 200,
            statusText: "ok",
            data: {
                id: 1,
                email: "admin@mygraf.com",
                name: "Admin",
                login: "admin",
                theme: "light",
                orgId: 1,
                isGrafanaAdmin: true,
                isDisabled: false,
                isExternal: false,
                authLabels: [],
                updatedAt: new Date("2019-09-09T11:31:26+01:00"),
                createdAt: new Date("2019-09-09T11:31:26+01:00"),
                avatarUrl: "",
            },
        });
        const usersApi = new Users(myAxios);
        await expect(usersApi.getActualUser()).resolves.toEqual({
            id: 1,
            email: "admin@mygraf.com",
            name: "Admin",
            login: "admin",
            theme: "light",
            orgId: 1,
            isGrafanaAdmin: true,
            isDisabled: false,
            isExternal: false,
            authLabels: [],
            updatedAt: new Date("2019-09-09T11:31:26+01:00"),
            createdAt: new Date("2019-09-09T11:31:26+01:00"),
            avatarUrl: "",
        });
    });
    it("getActualUserResponseNotFound", async () => {
        myAxios.get.mockResolvedValue({
            status: 404,
            statusText: "Not found",
        });
        const usersApi = new Users(myAxios);
        await expect(usersApi.getActualUser()).rejects.toEqual({
            error: {
                message: "Not found",
                status: 404,
            },
        });
    });

    it("getActualUserFailed", async () => {
        myAxios.get.mockRejectedValue({ message: "Connection error" });
        const usersApi = new Users(myAxios);
        await expect(usersApi.getActualUser()).rejects.toEqual({
            error: { message: "Connection error" },
        });
    });

    it("changePasswordSuccess", async () => {
        myAxios.put.mockResolvedValue({
            status: 200,
            statusText: "ok",
            data: {
                message: "User password changed",
            },
        });
        const usersApi = new Users(myAxios);
        await expect(
            usersApi.changePassword("OldPassword", "NewPassword")
        ).resolves.toEqual({ message: "User password changed" });
    });

    it("changePasswordResponseError", async () => {
        myAxios.put.mockResolvedValue({
            status: 404,
            statusText: "Not found",
        });
        const usersApi = new Users(myAxios);
        await expect(
            usersApi.changePassword("OldPassword", "NewPassword")
        ).rejects.toEqual({ error: { message: "Not found", status: 404 } });
    });

    it("changePasswordFailed", async () => {
        myAxios.put.mockRejectedValue({
            message: "Connection Error",
        });
        const usersApi = new Users(myAxios);
        await expect(
            usersApi.changePassword("OldPassword", "NewPassword")
        ).rejects.toEqual({ error: { message: "Connection Error" } });
    });

    it("switchOrganizationSucceed", async () => {
        myAxios.post.mockResolvedValue({
            status: 200,
            statusText: "ok",
            data: {
                message: "Active organization changed",
            },
        });
        const usersApi = new Users(myAxios);
        await expect(usersApi.switchOrganization(1, 2)).resolves.toEqual({
            message: "Active organization changed",
        });
    });

    it("switchOrganizationResponseError", async () => {
        myAxios.post.mockResolvedValue({
            status: 404,
            statusText: "Not found",
        });
        const usersApi = new Users(myAxios);
        await expect(usersApi.switchOrganization(1, 2)).rejects.toEqual({
            error: {
                status: 404,
                message: "Not found",
            },
        });
    });

    it("switchOrganizationFailed", async () => {
        const response = axiosPostRejectedValue();
        const usersApi = new Users(myAxios);
        await expect(usersApi.switchOrganization(1, 2)).rejects.toEqual({
            error: response,
        });
    });

    it("switchOrganizationForSignedUserSuccess", async () => {
        myAxios.post.mockResolvedValue({
            status: 200,
            statusText: "ok",
            data: {
                message: "Active organization changed",
            },
        });
        const usersApi = new Users(myAxios);
        await expect(
            usersApi.switchOrganizationForSignedUser(1)
        ).resolves.toEqual({
            message: "Active organization changed",
        });
    });

    it("switchOrganizationForSignedUserResponseError", async () => {
        axiosPostResponseNotFound();
        const usersApi = new Users(myAxios);
        await expect(
            usersApi.switchOrganizationForSignedUser(1)
        ).rejects.toEqual(responseError);
    });

    it("switchOrganizationForSignedUserFailed", async () => {
        const response = axiosPostRejectedValue();
        const usersApi = new Users(myAxios);
        await expect(
            usersApi.switchOrganizationForSignedUser(1)
        ).rejects.toEqual({ error: response });
    });

    it("getOrganizationsOfActualUserSucceed", async () => {
        myAxios.get.mockResolvedValue({
            status: 200,
            statusText: "ok",
            data: [
                {
                    orgId: 1,
                    name: "Main Org.",
                    role: "Admin",
                },
            ],
        });
        const usersApi = new Users(myAxios);
        await expect(usersApi.getOrganizationsOfActualUser()).resolves.toEqual([
            {
                orgId: 1,
                name: "Main Org.",
                role: "Admin",
            },
        ]);
    });

    it("getOrganizationsOfActualUserResponseError", async () => {
        axiosGetResponseNotFound();
        const users = new Users(myAxios);
        await expect(users.getOrganizationsOfActualUser()).rejects.toEqual(
            responseError
        );
    });

    it("getOrganizationsOfActualUserFailed", async () => {
        axiosGetRejectedValue();
        const users = new Users(myAxios);
        await expect(users.getOrganizationsOfActualUser()).rejects.toEqual({
            error: responseFail,
        });
    });

    it("getTeamsOfActualUserSucceed", async () => {
        myAxios.get.mockResolvedValue({
            status: 200,
            statusText: "ok",
            data: [
                {
                    id: 1,
                    orgId: 1,
                    name: "MyTestTeam",
                    email: "",
                    avatarUrl: "/avatar/3f49c15916554246daa714b9bd0ee398",
                    memberCount: 1,
                },
            ],
        });
        const users = new Users(myAxios);
        await expect(users.getTeamsOfActualUser()).resolves.toEqual([
            {
                id: 1,
                orgId: 1,
                name: "MyTestTeam",
                email: "",
                avatarUrl: "/avatar/3f49c15916554246daa714b9bd0ee398",
                memberCount: 1,
            },
        ]);
    });

    it("getTeamsOfActualUserResponseError", async () => {
        axiosGetResponseNotFound();
        const users = new Users(myAxios);
        await expect(users.getTeamsOfActualUser()).rejects.toEqual(
            responseError
        );
    });

    it("getTeamsOfActualUserFailed", async () => {
        axiosGetRejectedValue();
        const users = new Users(myAxios);
        await expect(users.getTeamsOfActualUser()).rejects.toEqual({
            error: responseFail,
        });
    });

    it("starDashboardSucceed", async () => {
        myAxios.post.mockResolvedValue({
            status: 200,
            statusText: "ok",
            data: { message: "Dashboard starred!" },
        });
        const users = new Users(myAxios);
        await expect(users.starDashboard(1)).resolves.toEqual({
            message: "Dashboard starred!",
        });
    });

    it("starDashboardResponseError", async () => {
        axiosPostResponseNotFound();
        const users = new Users(myAxios);
        await expect(users.starDashboard(1)).rejects.toEqual(responseError);
    });

    it("starDashboardFailed", async () => {
        axiosPostRejectedValue();
        const users = new Users(myAxios);
        await expect(users.starDashboard(1)).rejects.toEqual({
            error: responseFail,
        });
    });

    it("unstarDashboardSucceed", async () => {
        myAxios.delete.mockResolvedValue({
            status: 200,
            statusText: "ok",
            data: {
                message: "Dashboard unstarred",
            },
        });
        const users = new Users(myAxios);
        await expect(users.unstarDashboard(1)).resolves.toEqual({
            message: "Dashboard unstarred",
        });
    });

    it("unstarDashboardResponseError", async () => {
        axiosDeleteResponseNotFound();
        const users = new Users(myAxios);
        await expect(users.unstarDashboard(1)).rejects.toEqual(responseError);
    });

    it("unstarDashboardFailed", async () => {
        axiosDeleteRejectedValue();
        const users = new Users(myAxios);
        await expect(users.unstarDashboard(1)).rejects.toEqual({
            error: responseFail,
        });
    });

    it("getAuthTokenActualUserSucceed", async () => {
        myAxios.get.mockResolvedValue({
            status: 200,
            statusText: "ok",
            data: [
                {
                    id: 361,
                    isActive: true,
                    clientIp: "127.0.0.1",
                    browser: "Chrome",
                    browserVersion: "72.0",
                    os: "Linux",
                    osVersion: "",
                    device: "Other",
                    createdAt: new Date("2019-03-05T21:22:54+01:00"),
                    seenAt: new Date("2019-03-06T19:41:06+01:00"),
                },
                {
                    id: 364,
                    isActive: false,
                    clientIp: "127.0.0.1",
                    browser: "Mobile Safari",
                    browserVersion: "11.0",
                    os: "iOS",
                    osVersion: "11.0",
                    device: "iPhone",
                    createdAt: new Date("2019-03-06T19:41:19+01:00"),
                    seenAt: new Date("2019-03-06T19:41:21+01:00"),
                },
            ],
        });
        const users = new Users(myAxios);
        await expect(users.getAuthTokenOfActualUser()).resolves.toEqual([
            {
                id: 361,
                isActive: true,
                clientIp: "127.0.0.1",
                browser: "Chrome",
                browserVersion: "72.0",
                os: "Linux",
                osVersion: "",
                device: "Other",
                createdAt: new Date("2019-03-05T21:22:54+01:00"),
                seenAt: new Date("2019-03-06T19:41:06+01:00"),
            },
            {
                id: 364,
                isActive: false,
                clientIp: "127.0.0.1",
                browser: "Mobile Safari",
                browserVersion: "11.0",
                os: "iOS",
                osVersion: "11.0",
                device: "iPhone",
                createdAt: new Date("2019-03-06T19:41:19+01:00"),
                seenAt: new Date("2019-03-06T19:41:21+01:00"),
            },
        ]);
    });

    it("getAuthTokenOfActualUserResponseError", async () => {
        axiosGetResponseNotFound();
        const users = new Users(myAxios);
        await expect(users.getAuthTokenOfActualUser()).rejects.toEqual(
            responseError
        );
    });

    it("geAuthTokenOfActualUserFailed", async () => {
        axiosGetRejectedValue();
        const users = new Users(myAxios);
        await expect(users.getAuthTokenOfActualUser()).rejects.toEqual({
            error: responseFail,
        });
    });

    it("revokeAuthTokenOfActualUserSucceed", async () => {
        myAxios.post.mockResolvedValue({
            status: 200,
            statusText: "ok",
            data: { message: "User auth token revoked" },
        });
        const users = new Users(myAxios);
        await expect(users.revokeAuthTokenOfActualUser(1)).resolves.toEqual({
            message: "User auth token revoked",
        });
    });

    it("revokeAuthTokenOfActualUserResponseError", async () => {
        axiosPostResponseNotFound();
        const users = new Users(myAxios);
        await expect(users.revokeAuthTokenOfActualUser(1)).rejects.toEqual(
            responseError
        );
    });

    it("revokeAuthTokenOfActualUserFailed", async () => {
        axiosPostRejectedValue();
        const users = new Users(myAxios);
        await expect(users.revokeAuthTokenOfActualUser(1)).rejects.toEqual({
            error: responseFail,
        });
    });
});

function axiosGetRejectedValue(): void {
    myAxios.get.mockRejectedValue(responseFail);
}

function axiosPostRejectedValue(): UpdateResponse {
    myAxios.post.mockRejectedValue(responseFail);
    return responseFail;
}

function axiosDeleteRejectedValue(): void {
    myAxios.delete.mockRejectedValue(responseFail);
}

function axiosPostResponseNotFound(): void {
    myAxios.post.mockResolvedValue(responseNotFound);
}

function axiosGetResponseNotFound(): void {
    myAxios.get.mockResolvedValue(responseNotFound);
}

function axiosDeleteResponseNotFound(): void {
    myAxios.delete.mockResolvedValue(responseNotFound);
}

const responseNotFound = { status: 404, statusText: "Not found" };
const responseError = { error: { message: "Not found", status: 404 } };
const responseFail = { message: "Connection failed" };
