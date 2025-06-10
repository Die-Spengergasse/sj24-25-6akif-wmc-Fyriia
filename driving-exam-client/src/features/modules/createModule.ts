import { fetcher } from '@/lib/api';

export async function createModule(number: number, name: string) {
    return fetcher<{ guid: string }>(
        '/api/modules',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ number, name }),
        }
    );
}
