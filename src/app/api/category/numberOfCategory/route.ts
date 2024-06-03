import { HttpMethod, doFetch } from "../../ApiFetcher";

export async function GET() {
    const response = await doFetch({
        uri: `/api/category/numberOfCategory`,
        httpMethod: HttpMethod.GET
    });
    const data = response.data;
    return Response.json({ data });
}