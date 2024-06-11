import { HttpMethod, doFetch } from "../../ApiFetcher";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const month = searchParams.get('month')
    return await doFetch({
        uri: `/api/statistic/daily?month=${month}`,
        httpMethod: HttpMethod.GET
    });
}