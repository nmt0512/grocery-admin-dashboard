import { HttpMethod, doFetch } from "../../ApiFetcher";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const year = searchParams.get('year')
    const response = await doFetch({
        uri: `/api/statistic/monthly/${year}`,
        httpMethod: HttpMethod.GET
    });
    const data = response.data;
    return Response.json({ data });
}