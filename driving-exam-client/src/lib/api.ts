// src/lib/api.ts
import { ApiError } from '@/lib/ApiError';
import { getSession } from 'next-auth/react';

export async function fetcher<T>(
    url: string,
    init: RequestInit = {}
): Promise<T> {
    // 1. Get session and merge headers
    const session = await getSession();
    const headers = new Headers(init.headers);

    if (session?.accessToken) {
        headers.set('Authorization', `Bearer ${session.accessToken}`);
    }

    // 2. Make the request
    const res = await fetch(`http://localhost:5080${url}`, {
        ...init,
        headers,
    });
    const ctype = res.headers.get('content-type') ?? '';

    // 3. Error handling (unchanged)
    if (!res.ok) {
        if (ctype.includes('application/json')) {
            const data = await res.json();
            throw new ApiError(
                data.status ?? res.status,
                data.title ?? 'Fehler',
                data.detail ?? 'Unbekannter Fehler'
            );
        }
        throw new ApiError(res.status, res.statusText, await res.text());
    }

    // 4. Success
    return ctype.includes('application/json')
        ? res.json()
        : (undefined as T);
}
