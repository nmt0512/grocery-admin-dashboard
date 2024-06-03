import { HttpMethod, doFetch } from "../../ApiFetcher";

export async function GET() {
    const response = await doFetch({
        uri: `/api/statistic/yearly`,
        httpMethod: HttpMethod.GET
    });
    const data = response.data;
    return Response.json({ data });
}