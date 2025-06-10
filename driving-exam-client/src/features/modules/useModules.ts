import useSWR from 'swr';
import { fetcher } from '@/lib/api';
import type { Module } from './types';

export function useModules() {
    return useSWR<Module[]>('/api/modules', fetcher);
}
