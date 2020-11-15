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
    it("getByUidAsyncEmptyUid", async () => {
        const dashboardApi = new Dashboard(myAxios);
        await expect(dashboardApi.getByUidAsync("")).rejects.toEqual({
            error: "uid is empty",
        });
    });

    it("getByUidAsyncSucceed", async () => {
        myAxios.get.mockResolvedValue({ data: "", status: 200 });
        const dashboardApi = new Dashboard(myAxios);
        await expect(dashboardApi.getByUidAsync("sample")).resolves.toEqual("");
    });

    it("getByUidAsyncCommunicationFailed", async () => {
        myAxios.get.mockRejectedValue({ message: "error" });
        expect.assertions(1);
        const dashboardApi = new Dashboard(myAxios);
        await expect(dashboardApi.getByUidAsync("sample")).rejects.toEqual({
            error: { message: "error" },
        });
    });

    it("getByUidAsyncFailedIfResponseErrorStatus", async () => {
        myAxios.get.mockResolvedValue({
            data: "",
            status: 404,
            statusText: "Not Found.",
        });
        const dashboardApi = new Dashboard(myAxios);
        await expect(dashboardApi.getByUidAsync("sample")).rejects.toEqual({
            error: { message: "Not Found.", status: 404 },
        });
    });

    it("deleteDashboardEmptyUid", async () => {
        const dashboardApi = new Dashboard(myAxios);
        await expect(
            dashboardApi.deleteDashboardByUidAsync("")
        ).rejects.toEqual({
            error: "uid is empty",
        });
    });

    it("deleteDashboardByUidAsyncFailedIfReturnError", async () => {
        myAxios.delete.mockRejectedValue({ message: "error" });
        const dashboardApi = new Dashboard(myAxios);
        await expect(
            dashboardApi.deleteDashboardByUidAsync("sample")
        ).rejects.toEqual({ error: { message: "error" } });
    });

    it("deleteDashboardByUidFailedIfReturnErrorStatus", async () => {
        myAxios.delete.mockResolvedValue({
            status: 404,
            statusText: "Not Found.",
        });
        const dashboardApi = new Dashboard(myAxios);
        await expect(
            dashboardApi.deleteDashboardByUidAsync("sample")
        ).rejects.toEqual({ error: { message: "Not Found.", status: 404 } });
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
        await expect(
            dashboardApi.deleteDashboardByUidAsync("sample")
        ).resolves.toEqual({
            title: "sample",
            message: "Dashboard sample deleted",
            id: 2,
        });
    });

    it("createOrUpdateEmptySourceFile", async () => {
        const dashboardApi = new Dashboard(myAxios);
        await expect(dashboardApi.createOrUpdate("")).rejects.toEqual({
            error: "source file is null or empty",
        });
    });

    it("createOrUpdateFileNotFound", async () => {
        const dashboardApi = new Dashboard(myAxios);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        mocked(fs.existsSync).mockImplementation((_) => false);
        await expect(
            dashboardApi.createOrUpdate("missing-sample.json")
        ).rejects.toEqual({ error: "Source file not found." });
    });

    it("createOrUpdateFileEmpty", async () => {
        const dashboardApi = new Dashboard(myAxios);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        mocked(fs.existsSync).mockImplementation((_) => true);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        mocked(fs.readFileSync).mockImplementation((_, __) => "");
        await expect(
            dashboardApi.createOrUpdate("empty-sample.json")
        ).rejects.toEqual({ error: "Source file content is empty." });
    });

    it("createOrUpdateFailedIfReturnError", async () => {
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
        await expect(
            dashboardApi.createOrUpdate("sample.json")
        ).rejects.toEqual({ error: { message: "error" } });
    });

    it("createOrUpdateFailedIfReturnFailedStatus", async () => {
        const dashboardApi = new Dashboard(myAxios);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        mocked(fs.existsSync).mockImplementation((_) => true);
        mocked(fs.readFileSync).mockImplementation(
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            (_, __) =>
                `{ "id": null, "uid": null, "title": "sample", "schemaVersion": 16, "version": 0}`
        );
        myAxios.post.mockResolvedValue({ status: 400, statusText: "Errors" });
        await expect(
            dashboardApi.createOrUpdate("sample.json")
        ).rejects.toEqual({ error: { message: "Errors", status: 400 } });
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
        await expect(
            dashboardApi.createOrUpdate("sample.json", 3)
        ).resolves.toEqual(mockResponseData);
    });
});
