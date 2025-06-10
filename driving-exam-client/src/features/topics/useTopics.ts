
import useSWR from 'swr';
import { fetcher } from '@/lib/api';
import type { Topic } from './types';

export function useTopics(moduleGuid?: string) {
    const url = moduleGuid
        ? `/api/topics?assignedModule=${moduleGuid}`
        : '/api/topics';

    return useSWR<Topic[]>(url, fetcher);
}
