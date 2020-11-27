import { DataSourceApi } from "../src/DataSourceApi";
import axios, { AxiosInstance } from "axios";

jest.mock("axios");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const myAxios: jest.Mocked<AxiosInstance> = axios as any;

describe("DataSouce API Test", () => {
    beforeEach(() => {
        myAxios.get.mockClear();
        myAxios.delete.mockClear();
        myAxios.post.mockClear();
    });

    it("Initialize", () => {
        expect.assertions(0);
        new DataSourceApi(myAxios);
    });

    it("getAllDataSourcesSucceed", async () => {
        myAxios.get.mockResolvedValue({
            status: 200,
            data: [
                {
                    id: 1,
                    orgId: 1,
                    name: "datasource_elastic",
                    type: "elasticsearch",
                    typeLogoUrl:
                        "public/app/plugins/datasource/elasticsearch/img/elasticsearch.svg",
                    access: "proxy",
                    url: "http://mydatasource.com",
                    password: "",
                    user: "",
                    database: "grafana-dash",
                    basicAuth: false,
                    isDefault: false,
                    jsonData: {
                        esVersion: 5,
                        logLevelField: "",
                        logMessageField: "",
                        maxConcurrentShardRequests: 256,
                        timeField: "@timestamp",
                    },
                    readOnly: false,
                },
            ],
        });
        const datastore = new DataSourceApi(myAxios);
        await expect(datastore.getAllDataSources()).resolves.toEqual([
            {
                id: 1,
                orgId: 1,
                name: "datasource_elastic",
                type: "elasticsearch",
                typeLogoUrl:
                    "public/app/plugins/datasource/elasticsearch/img/elasticsearch.svg",
                access: "proxy",
                url: "http://mydatasource.com",
                password: "",
                user: "",
                database: "grafana-dash",
                basicAuth: false,
                isDefault: false,
                jsonData: {
                    esVersion: 5,
                    logLevelField: "",
                    logMessageField: "",
                    maxConcurrentShardRequests: 256,
                    timeField: "@timestamp",
                },
                readOnly: false,
            },
        ]);
    });

    it("getDataSourceByIdSuccess", async () => {
        myAxios.get.mockResolvedValue({
            status: 200,
            data: {
                id: 1,
                orgId: 1,
                name: "test_datasource",
                type: "graphite",
                typeLogoUrl: "",
                access: "proxy",
                url: "http://mydatasource.com",
                password: "",
                user: "",
                database: "",
                basicAuth: false,
                basicAuthUser: "",
                basicAuthPassword: "",
                withCredentials: false,
                isDefault: false,
                jsonData: {
                    graphiteType: "default",
                    graphiteVersion: "1.1",
                },
                secureJsonFields: {},
                version: 1,
                readOnly: false,
            },
        });

        const api = new DataSourceApi(myAxios);
        await expect(api.getDataSourceById(1)).resolves.toEqual({
            id: 1,
            orgId: 1,
            name: "test_datasource",
            type: "graphite",
            typeLogoUrl: "",
            access: "proxy",
            url: "http://mydatasource.com",
            password: "",
            user: "",
            database: "",
            basicAuth: false,
            basicAuthUser: "",
            basicAuthPassword: "",
            withCredentials: false,
            isDefault: false,
            jsonData: {
                graphiteType: "default",
                graphiteVersion: "1.1",
            },
            secureJsonFields: {},
            version: 1,
            readOnly: false,
        });
    });
});
