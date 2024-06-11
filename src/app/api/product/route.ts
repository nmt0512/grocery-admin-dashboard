import { HttpMethod, doFetch } from "../ApiFetcher";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('categoryId');
    return await doFetch({
        uri: `/api/product/category?categoryId=${categoryId}`,
        httpMethod: HttpMethod.GET
    });
}

export async function DELETE(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    return await doFetch({
        uri: `/api/product/${id}`,
        httpMethod: HttpMethod.DELETE
    });
}

export async function POST(request: Request) {
    const formData = await request.formData();
    return await doFetch({
        uri: `/api/product/create`,
        httpMethod: HttpMethod.POST,
        body: formData
    });
}

export async function PUT(request: Request) {
    const formData = await request.formData();
    return await doFetch({
        uri: `/api/product/update`,
        httpMethod: HttpMethod.PUT,
        body: formData
    });
}