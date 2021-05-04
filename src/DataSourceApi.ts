import { ApiBase } from "./ApiBase";

export interface DataSource {
    id: number;
    orgId: number;
    name: string;
    type: string;
    typeLogonUrl: string;
    access: string;
    url: string;
    password: string;
    user: string;
    database: string;
    basicAuth: boolean;
    isDefault: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    jsonData: any;
    readOnly: boolean;
}

export class DataSourceApi extends ApiBase {
    /**
     * Get all data sources
     */
    getAllDataSources(): Promise<Array<DataSource>> {
        const promise = new Promise<Array<DataSource>>((resolve, reject) => {
            const url = "/api/datasources";
            this.apiInstance
                .get<Array<DataSource>>(url)
                .then((res) => this.statusOkResult(resolve, reject, res))
                .catch((e) => reject({ error: e }));
        });
        return promise;
    }

    getDataSourceById(datasourceId: number): Promise<DataSource> {
        const promise = new Promise<DataSource>((resolve, reject) => {
            const url = `/api/datasources/${datasourceId}`;
            this.apiInstance
                .get<DataSource>(url)
                .then((res) => this.statusOkResult(resolve, reject, res))
                .catch((e) => reject({ error: e }));
        });

        return promise;
    }
}
