import { Dashboard } from "../src/Dashboard";
import axios, { AxiosInstance } from "axios";

jest.mock("axios");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const myAxios: jest.Mocked<AxiosInstance> = axios as any;

it("Initialize", () => {
    expect.assertions(0);
    new Dashboard(myAxios);
});
it("getByUidAsyncEmptyUid", () => {
    const dashboardApi = new Dashboard(myAxios);
    expect.assertions(1);
    return dashboardApi.getByUidAsync("").catch((e) =>
        expect(e).toEqual({
            error: "uid is empty",
        })
    );
});

it("getByUidAsyncSucceed", async () => {
    myAxios.get.mockClear();
    myAxios.get.mockResolvedValue({ data: "", status: 200 });
    const dashboardApi = new Dashboard(myAxios);
    const actual = await dashboardApi.getByUidAsync("sample");
    expect(actual).toBe("");
});

it("getByUidAsyncCommunicationFailed", () => {
    myAxios.get.mockClear();
    myAxios.get.mockRejectedValue({ message: "error" });
    expect.assertions(1);
    const dashboardApi = new Dashboard(myAxios);
    dashboardApi.getByUidAsync("sample").catch((error) => {
        expect(error.message).toBe("error");
    });
});

it("getByUidAsyncFailedIfResponseErrorStatus", () => {
    myAxios.get.mockClear();
    myAxios.get.mockResolvedValue({
        data: "",
        status: 404,
        statusText: "Not Found.",
    });
    expect.assertions(2);
    const dashboardApi = new Dashboard(myAxios);
    return dashboardApi.getByUidAsync("sample").catch((e) => {
        expect(e.error.message).toBe("Not Found.");
        expect(e.error.status).toBe(404);
    });
});

it("deleteDashboardEmptyUid", () => {
    const dashboardApi = new Dashboard(myAxios);
    dashboardApi.deleteDashboardByUidAsync("").catch((e) => {
        expect(e.error).toBe("uid is empty");
    });
});

it("deleteDashboardByUidAsyncFailedIfReturnError", () => {
    myAxios.delete.mockRejectedValue({ message: "error" });
    const dashboardApi = new Dashboard(myAxios);
    expect.assertions(1);
    return dashboardApi
        .deleteDashboardByUidAsync("sample")
        .catch((e) => expect(e.error.message).toBe("error"));
});

it("deleteDashboardByUidFailedIfReturnErrorStatus", () => {
    myAxios.delete.mockClear();
    myAxios.delete.mockResolvedValue({ status: 404, statusText: "Not Found." });
    const dashboardApi = new Dashboard(myAxios);
    expect.assertions(2);
    return dashboardApi.deleteDashboardByUidAsync("sample").catch((e) => {
        expect(e.error.status).toBe(404);
        expect(e.error.message).toBe("Not Found.");
    });
});

it("deleteDashboardByUidSuccess", async () => {
    myAxios.delete.mockClear();
    myAxios.delete.mockResolvedValue({
        status: 200,
        statusText: "Deleted",
        data: {
            title: "sample",
            message: "Dashboard sample deleted",
            id: 2,
        },
    });
    const dashboardApi = new Dashboard(myAxios);
    const actual = await dashboardApi.deleteDashboardByUidAsync("sample");
    expect(actual.title).toBe("sample");
    expect(actual.message).toBe("Dashboard sample deleted");
    expect(actual.id).toBe(2);
});
