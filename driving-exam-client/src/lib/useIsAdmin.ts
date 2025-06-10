'use client';
import { useSession } from 'next-auth/react';
import {jwtDecode} from "jwt-decode";


export function useIsAdmin() {
    const { data } = useSession();
    if (!data?.accessToken) return false;

    type Payload = { preferred_username?: string; email?: string };
    const payload: Payload = jwtDecode(data.accessToken);
    const email = payload.preferred_username ?? payload.email;
    return email?.toLowerCase() === process.env.NEXT_PUBLIC_ADMIN_USER?.toLowerCase();
}
