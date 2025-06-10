
import useSWR from 'swr';
import { fetcher } from '@/lib/api';
import type { Question } from './types';

export function useQuestions(moduleGuid?: string, topicGuid?: string) {
    const ready = moduleGuid && topicGuid;
    return useSWR<Question[]>(
        ready ? `/api/questions?moduleGuid=${moduleGuid}&topicGuid=${topicGuid}` : null,
        fetcher
    );
}
