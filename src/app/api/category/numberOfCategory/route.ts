import { HttpMethod, doFetch } from "../../ApiFetcher";

export async function GET() {
    return await doFetch({
        uri: `/api/category/numberOfCategory`,
        httpMethod: HttpMethod.GET
    });
}