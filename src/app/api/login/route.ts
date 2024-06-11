import { cookies } from "next/headers";
import { BASE_URI } from "../ApiFetcher";

export async function POST(request: Request) {

    const requestBody = await request.json()

    const response = await fetch(`${BASE_URI}/api/auth/adminLogin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
    });

    const loginResponse = await response.json();

    if (loginResponse.success) {
        cookies().set('token', loginResponse.data.accessToken, {
            maxAge: 60 * 60 * 5,
        })
        const data = loginResponse.data
        return Response.json({ data })
    } else {
        return Response.json({ error: 'Internal Server Error' }, { status: 500 });
    }

}