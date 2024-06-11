import { HttpMethod, doFetch } from "../../ApiFetcher";

export async function GET() {
    return await doFetch({
        uri: `/api/statistic/yearly`,
        httpMethod: HttpMethod.GET
    });
}