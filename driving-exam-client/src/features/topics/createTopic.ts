
import { fetcher } from '@/lib/api';

export async function createTopic(name: string) {
    return fetcher<{ guid: string }>('/api/topics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
    });
}
