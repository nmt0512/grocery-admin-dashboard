import { HttpMethod, doFetch } from "../../ApiFetcher";

export async function GET() {
    return await doFetch({
        uri: `/api/product/numberOfProduct`,
        httpMethod: HttpMethod.GET
    });
}