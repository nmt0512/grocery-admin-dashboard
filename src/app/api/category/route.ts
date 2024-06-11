import { HttpMethod, doFetch } from "../ApiFetcher";

export async function GET() {
    return await doFetch({
        uri: `/api/category/all`,
        httpMethod: HttpMethod.GET
    });
}

export async function DELETE(request: Request) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    return await doFetch({
        uri: `/api/category/${id}`,
        httpMethod: HttpMethod.DELETE
    });
}

export async function POST(request: Request) {
    const formData = await request.formData()
    return await doFetch({
        uri: `/api/category/create`,
        httpMethod: HttpMethod.POST,
        body: formData
    });
}

export async function PUT(request: Request) {
    const formData = await request.formData()
    return await doFetch({
        uri: `/api/category/update`,
        httpMethod: HttpMethod.PUT,
        body: formData
    });
}