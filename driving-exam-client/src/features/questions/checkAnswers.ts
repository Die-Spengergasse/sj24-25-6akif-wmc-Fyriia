// src/features/questions/checkAnswers.ts
import { fetcher } from '@/lib/api';
import type { Answer } from './types';

export type CheckResult = {
    pointsReachable: number;
    pointsReached: number;
    checkResult: Record<string, boolean>;
};

/**
 * Sends every answer (checked or not) to the backend.
 */
export async function checkAnswers(
    questionGuid: string,
    answers: Answer[],
    checks: Record<string, boolean>
) {
    const payload = {
        checkedAnswers: answers.map(a => ({
            guid: a.guid,
            isChecked: !!checks[a.guid],      // unchecked defaults to false
        })),
    };

    return fetcher<CheckResult>(
        `/api/questions/${questionGuid}/checkanswers`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        }
    );
}
