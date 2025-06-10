'use client';

import { SWRConfig } from 'swr';
import { fetcher } from '@/lib/api';

export function SWRProvider({ children }: { children: React.ReactNode }) {
    return (
        <SWRConfig value={{ fetcher, onError: console.error }}>
            {children}
        </SWRConfig>
    );
}
