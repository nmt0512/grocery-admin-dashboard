import { HttpMethod, doFetch } from "../ApiFetcher";

export async function GET() {
    const response = await doFetch({
        uri: `/api/category/all`,
        httpMethod: HttpMethod.GET
    });
    const data = response.data;
    return Response.json({ data });
}

export async function DELETE(request: Request) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const response = await doFetch({
        uri: `/api/category/${id}`,
        httpMethod: HttpMethod.DELETE
    });
    const data = response.data;
    return Response.json({ data });
}

export async function POST(request: Request) {
    const formData = await request.formData()
    const response = await doFetch({
        uri: `/api/category/create`,
        httpMethod: HttpMethod.POST,
        body: formData
    });
    const data = response.data;
    return Response.json({ data });
}

export async function PUT(request: Request) {
    const formData = await request.formData()
    const response = await doFetch({
        uri: `/api/category/update`,
        httpMethod: HttpMethod.PUT,
        body: formData
    });
    const data = response.data;
    return Response.json({ data });
}