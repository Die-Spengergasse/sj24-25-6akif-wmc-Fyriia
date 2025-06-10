
'use client';
import { useIsAdmin } from '@/lib/useIsAdmin';
import { redirect } from 'next/navigation';
import React from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    if (!useIsAdmin()) redirect('/');
    return <>{children}</>;
}
