import { HttpMethod, doFetch } from "../../ApiFetcher";

export async function GET() {
    const response = await doFetch({
        uri: `/api/statistic/year/all`,
        httpMethod: HttpMethod.GET
    });
    const data = response.data;
    return Response.json({ data });
}