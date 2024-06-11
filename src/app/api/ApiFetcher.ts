import { cookies } from "next/headers";

export const BASE_URI = 'http://localhost:8080';

interface ApiRequest {
    uri: string,
    httpMethod: string,
    body?: any
}

export const HttpMethod = Object.freeze({
    POST: 'POST' as 'POST',
    PUT: 'PUT' as 'PUT',
    GET: 'GET' as 'GET',
    DELETE: 'DELETE' as 'DELETE'
})

export const doFetch = async (apiRequest: ApiRequest) => {
    const token = cookies().get('token')?.value
    console.log(`REQUEST to Uri [${apiRequest.uri}] with Body [${JSON.stringify(apiRequest.body)}]`)
    const response = apiRequest.body instanceof FormData
        ?
        await fetch(
            `${BASE_URI}${apiRequest.uri}`,
            {
                method: apiRequest.httpMethod,
                body: apiRequest.body,
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            }
        )
        :
        await fetch(
            `${BASE_URI}${apiRequest.uri}`,
            {
                method: apiRequest.httpMethod,
                body: JSON.stringify(apiRequest.body),
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': `application/json`
                }
            }
        )
    const data = (await response.json()).data;
    if (response.ok) {
        return Response.json({ data });
    }
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
}
