import { HttpMethod, doFetch } from "../../ApiFetcher";

export async function GET() {
    return await doFetch({
        uri: `/api/statistic/year/all`,
        httpMethod: HttpMethod.GET
    });
}