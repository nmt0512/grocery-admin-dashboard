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

    const response = await fetch(
        `${BASE_URI}${apiRequest.uri}`,
        {
            method: apiRequest.httpMethod,
            body: apiRequest.body,
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }
    )
    return await response.json();
}
