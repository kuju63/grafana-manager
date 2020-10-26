import axios, { AxiosInstance } from "axios";
import { Users } from "../src/Users";

jest.mock("axios");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const myAxios: jest.Mocked<AxiosInstance> = axios as any;

describe("Users API Test", () => {
    beforeEach(() => {
        myAxios.get.mockClear();
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
});
