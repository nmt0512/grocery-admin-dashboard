import { HttpMethod, doFetch } from "../../ApiFetcher";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const month = searchParams.get('month')
    const response = await doFetch({
        uri: `/api/statistic/daily?month=${month}`,
        httpMethod: HttpMethod.GET
    });
    const data = response.data;
    return Response.json({ data });
}