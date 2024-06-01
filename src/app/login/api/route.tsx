'use server'

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const BASE_URI = 'http://localhost:8080'

export async function login(request: any) {
    const response = await fetch(`${BASE_URI}/api/auth/adminLogin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(request)
    });

    const loginResponse = await response.json();

    if (loginResponse.success) {
        cookies().set('token', loginResponse.data.accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7, // One week
            path: '/',
        })
        redirect('/dashboard');
    }
}