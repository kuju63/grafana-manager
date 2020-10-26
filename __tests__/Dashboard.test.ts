import { Dashboard } from "../src/Dashboard";
import axios, { AxiosInstance } from "axios";
import { mocked } from "ts-jest/utils";

jest.mock("axios");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const myAxios: jest.Mocked<AxiosInstance> = axios as any;

jest.mock("fs");
import * as fs from "fs";

describe("Dashboard API Test", () => {
    beforeEach(() => {
        myAxios.get.mockClear();
        myAxios.delete.mockClear();
        myAxios.post.mockClear();
    });
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
        myAxios.get.mockResolvedValue({ data: "", status: 200 });
        const dashboardApi = new Dashboard(myAxios);
        const actual = await dashboardApi.getByUidAsync("sample");
        expect(actual).toBe("");
    });

    it("getByUidAsyncCommunicationFailed", () => {
        myAxios.get.mockRejectedValue({ message: "error" });
        expect.assertions(1);
        const dashboardApi = new Dashboard(myAxios);
        dashboardApi.getByUidAsync("sample").catch((error) => {
            expect(error.message).toBe("error");
        });
    });

    it("getByUidAsyncFailedIfResponseErrorStatus", () => {
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
        myAxios.delete.mockResolvedValue({
            status: 404,
            statusText: "Not Found.",
        });
        const dashboardApi = new Dashboard(myAxios);
        expect.assertions(2);
        return dashboardApi.deleteDashboardByUidAsync("sample").catch((e) => {
            expect(e.error.status).toBe(404);
            expect(e.error.message).toBe("Not Found.");
        });
    });

    it("deleteDashboardByUidSuccess", async () => {
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

    it("createOrUpdateEmptySourceFile", () => {
        const dashboardApi = new Dashboard(myAxios);
        expect.assertions(1);
        return dashboardApi
            .createOrUpdate("")
            .catch((e) => expect(e.error).toBe("source file is null or empty"));
    });

    it("createOrUpdateFileNotFound", () => {
        const dashboardApi = new Dashboard(myAxios);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        mocked(fs.existsSync).mockImplementation((_) => false);
        expect.assertions(1);
        return dashboardApi
            .createOrUpdate("missing-sample.json")
            .catch((e) => expect(e.error).toBe("Source file not found."));
    });

    it("createOrUpdateFileEmpty", () => {
        const dashboardApi = new Dashboard(myAxios);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        mocked(fs.existsSync).mockImplementation((_) => true);
        expect.assertions(1);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        mocked(fs.readFileSync).mockImplementation((_, __) => "");
        return dashboardApi
            .createOrUpdate("empty-sample.json")
            .catch((e) =>
                expect(e.error).toBe("Source file content is empty.")
            );
    });

    it("createOrUpdateFailedIfReturnError", () => {
        const dashboardApi = new Dashboard(myAxios);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        mocked(fs.existsSync).mockImplementation((_) => true);
        mocked(fs.readFileSync).mockImplementation(
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            (_, __) =>
                `{ "id": null, "uid": null, "title": "sample", "schemaVersion": 16, "version": 0}`
        );
        myAxios.post.mockRejectedValue({
            message: "error",
        });
        expect.assertions(1);
        return dashboardApi
            .createOrUpdate("sample.json")
            .catch((e) => expect(e.error.message).toBe("error"));
    });

    it("createOrUpdateFailedIfReturnFailedStatus", () => {
        const dashboardApi = new Dashboard(myAxios);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        mocked(fs.existsSync).mockImplementation((_) => true);
        mocked(fs.readFileSync).mockImplementation(
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            (_, __) =>
                `{ "id": null, "uid": null, "title": "sample", "schemaVersion": 16, "version": 0}`
        );
        myAxios.post.mockResolvedValue({ status: 400, statusText: "Errors" });
        expect.assertions(2);
        return dashboardApi.createOrUpdate("sample.json").catch((e) => {
            expect(e.error.status).toBe(400);
            expect(e.error.message).toBe("Errors");
        });
    });

    it("createOrUpdateSuccess", async () => {
        const dashboardApi = new Dashboard(myAxios);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        mocked(fs.existsSync).mockImplementation((_) => true);
        mocked(fs.readFileSync).mockImplementation(
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            (_, __) =>
                `{ "id": null, "uid": null, "title": "sample", "schemaVersion": 16, "version": 0}`
        );
        const mockResponseData = {
            id: 1,
            uid: "cIBgcSjkk",
            url: "/d/cIBgcSjkk/production-overview",
            status: "success",
            version: 1,
            slug: "production-overview",
        };
        myAxios.post.mockResolvedValue({
            status: 200,
            statusText: "Success",
            data: mockResponseData,
        });
        const data = await dashboardApi.createOrUpdate("sample.json", 3);
        expect(data.id).toBe(mockResponseData.id);
        expect(data.uid).toBe(mockResponseData.uid);
        expect(data.url).toBe(mockResponseData.url);
        expect(data.status).toBe(mockResponseData.status);
        expect(data.version).toBe(mockResponseData.version);
        expect(data.slug).toBe(mockResponseData.slug);
    });
});
