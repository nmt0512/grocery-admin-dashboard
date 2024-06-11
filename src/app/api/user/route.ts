import { HttpMethod, doFetch } from "../ApiFetcher";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const role = searchParams.get('role');
    return await doFetch({
        uri: `/api/auth/admin/user?role=${role}`,
        httpMethod: HttpMethod.GET
    });
}

export async function DELETE(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    return await doFetch({
        uri: `/api/auth/admin/user/${id}`,
        httpMethod: HttpMethod.DELETE
    });
}

export async function POST(request: Request) {
    const body = await request.json();
    return await doFetch({
        uri: `/api/auth/admin/user`,
        httpMethod: HttpMethod.POST,
        body: body
    });
}

export async function PUT(request: Request) {
    const body = await request.json();
    return await doFetch({
        uri: `/api/auth/admin/user`,
        httpMethod: HttpMethod.PUT,
        body: body
    });
}