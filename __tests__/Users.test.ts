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
        const resData = await usersApi.searchUsers(100, 1);
        expect(resData.length).toBe(expectList.length);
        expect(resData[0].id).toBe(expectList[0].id);
        expect(resData[0].name).toBe(expectList[0].name);
        expect(resData[0].login).toBe(expectList[0].login);
        expect(resData[0].email).toBe(expectList[0].email);
        expect(resData[0].isAdmin).toBe(expectList[0].isAdmin);
        expect(resData[0].isDisabled).toBe(expectList[0].isDisabled);
        expect(resData[0].lastSeenAt).toBe(expectList[0].lastSeenAt);
        expect(resData[0].lastSeenAtAge).toBe(expectList[0].lastSeenAtAge);
        expect(resData[0].authLabels).toBe(expectList[0].authLabels);
        expect(resData[1].id).toBe(expectList[1].id);
        expect(resData[1].name).toBe(expectList[1].name);
        expect(resData[1].login).toBe(expectList[1].login);
        expect(resData[1].email).toBe(expectList[1].email);
        expect(resData[1].isAdmin).toBe(expectList[1].isAdmin);
        expect(resData[1].isDisabled).toBe(expectList[1].isDisabled);
        expect(resData[1].lastSeenAt).toBe(expectList[1].lastSeenAt);
        expect(resData[1].lastSeenAtAge).toBe(expectList[1].lastSeenAtAge);
        expect(resData[1].authLabels).toBe(expectList[1].authLabels);
    });

    it("searchUsersReturnFailStatus", () => {
        const res = { message: "Unauthorized" };
        myAxios.get.mockResolvedValue({
            data: res,
            status: 403,
            statusText: "Unauthorized",
        });
        const usersApi = new Users(myAxios);
        expect.assertions(2);
        return usersApi.searchUsers(100, 1).catch((e) => {
            expect(e.error.message).toBe("Unauthorized");
            expect(e.error.status).toBe(403);
        });
    });

    it("searchUsersFailed", () => {
        myAxios.get.mockRejectedValue({ message: "Connection error" });
        const usersApi = new Users(myAxios);
        expect.assertions(1);
        return usersApi.searchUsers(100, 1).catch((e) => {
            expect(e.error.message).toBe("Connection error");
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
        const resData = await usersApi.searchUsersWithPaging(10, 1, "sample");
        expect(resData.totalCount).toBe(2);
        expect(resData.perPage).toBe(10);
        expect(resData.page).toBe(1);
        expect(resData.users.length).toBe(expectUser.length);
        expect(resData.users[0].id).toBe(expectUser[0].id);
        expect(resData.users[0].name).toBe(expectUser[0].name);
        expect(resData.users[0].login).toBe(expectUser[0].login);
        expect(resData.users[0].email).toBe(expectUser[0].email);
        expect(resData.users[0].isAdmin).toBe(expectUser[0].isAdmin);
        expect(resData.users[0].isDisabled).toBe(expectUser[0].isDisabled);
        expect(resData.users[0].lastSeenAt).toBe(expectUser[0].lastSeenAt);
        expect(resData.users[0].lastSeenAtAge).toBe(
            expectUser[0].lastSeenAtAge
        );
        expect(resData.users[0].authLabels).toBe(expectUser[0].authLabels);
        expect(resData.users[1].id).toBe(expectUser[1].id);
        expect(resData.users[1].name).toBe(expectUser[1].name);
        expect(resData.users[1].login).toBe(expectUser[1].login);
        expect(resData.users[1].email).toBe(expectUser[1].email);
        expect(resData.users[1].isAdmin).toBe(expectUser[1].isAdmin);
        expect(resData.users[1].isDisabled).toBe(expectUser[1].isDisabled);
        expect(resData.users[1].lastSeenAt).toBe(expectUser[1].lastSeenAt);
        expect(resData.users[1].lastSeenAtAge).toBe(
            expectUser[1].lastSeenAtAge
        );
        expect(resData.users[1].authLabels).toBe(expectUser[1].authLabels);
    });

    it("searchUsersWithPagingReturnFailStatus", () => {
        const res = { message: "Unauthorized" };
        myAxios.get.mockResolvedValue({
            data: res,
            status: 403,
            statusText: "Unauthorized",
        });
        const usersApi = new Users(myAxios);
        expect.assertions(2);
        return usersApi.searchUsersWithPaging(100, 1, "sample").catch((e) => {
            expect(e.error.message).toBe("Unauthorized");
            expect(e.error.status).toBe(403);
        });
    });

    it("searchUsersWithPagingFailed", () => {
        myAxios.get.mockRejectedValue({ message: "Connection error" });
        const usersApi = new Users(myAxios);
        expect.assertions(1);
        return usersApi.searchUsersWithPaging(100, 1, "sample").catch((e) => {
            expect(e.error.message).toBe("Connection error");
        });
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
        myAxios.get.mockResolvedValue({
            status: 404,
            statusText: "Not found",
        });
        const usersApi = new Users(myAxios);
        await expect(usersApi.getTeamsForUser(1)).rejects.toEqual({
            error: { message: "Not found", status: 404 },
        });
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
});

function axiosGetRejectedValue(): void {
    myAxios.get.mockRejectedValue(responseFail);
}

function axiosPostRejectedValue(): UpdateResponse {
    myAxios.post.mockRejectedValue(responseFail);
    return responseFail;
}

function axiosPostResponseNotFound(): void {
    myAxios.post.mockResolvedValue(responseNotFound);
}

function axiosGetResponseNotFound(): void {
    myAxios.get.mockResolvedValue(responseNotFound);
}

const responseNotFound = { status: 404, statusText: "Not found" };
const responseError = { error: { message: "Not found", status: 404 } };
const responseFail = { message: "Connection failed" };
