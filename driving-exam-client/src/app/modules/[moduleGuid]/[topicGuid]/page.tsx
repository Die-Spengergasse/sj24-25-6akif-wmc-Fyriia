
'use client';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useQuestions } from '@/features/questions/useQuestions';
import QuestionCard from '@/components/QuestionCard';
import { checkAnswers } from '@/features/questions/checkAnswers';

export default function QuestionsPage() {
    const { moduleGuid, topicGuid } =
        useParams<{ moduleGuid: string; topicGuid: string }>();
    const router = useRouter();
    const { data, error } = useQuestions(moduleGuid, topicGuid);

    const [index, setIndex] = useState(0);
    const [checks, setChecks] = useState<Record<string, boolean>>({});
    const [evaluation, setEvaluation] =
        useState<Record<string, boolean> | null>(null);

    if (error) return <p>Failed to load</p>;
    if (!data)  return <p>Loading…</p>;

    const q = data[index];

    const toggle = (guid: string) =>
        setChecks(prev => ({ ...prev, [guid]: !prev[guid] }));


    async function handleSubmit() {
        try {
            const res = await checkAnswers(q.guid, q.answers, checks);
            setEvaluation(res.checkResult);
        } catch (err) {
            console.error(err);
            // TODO: replace with toast later
            alert('Antwort konnte nicht geprüft werden.');
        }
    }


    function nextQuestion() {
        setIndex(i => i + 1);
        setChecks({});
        setEvaluation(null);
    }

    return (
        <main className="p-4 space-y-6">
            <button onClick={() => router.back()} className="text-sm underline">
                ← Back
            </button>

            <QuestionCard
                question={q}
                checked={checks}
                onToggle={toggle}
                evaluation={evaluation ?? undefined}
                disabled={evaluation !== null}
            />

            {evaluation === null ? (
                <button
                    onClick={handleSubmit}
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                    disabled={Object.keys(checks).length === 0}
                >
                    Antwort prüfen
                </button>
            ) : (
                <button
                    onClick={nextQuestion}
                    className="px-4 py-2 bg-green-600 text-white rounded"
                    disabled={index === data.length - 1}
                >
                    Nächste Frage
                </button>
            )}
        </main>
    );
}
