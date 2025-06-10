'use client';

import TopicForm from '@/components/TopicForm';
import { useTopics } from '@/features/topics/useTopics';

export default function AdminTopics() {
    const { data, error } = useTopics(); // no moduleGuid → fetch all

    return (
        <main className="p-4 space-y-4">
            <h1 className="text-2xl font-bold">Themen verwalten</h1>

            {/* create */}
            <TopicForm />

            <hr />

            {/* list */}
            {error && <p>Fehler beim Laden</p>}
            {!data && <p>Lade…</p>}
            {data && (
                <ul className="space-y-1">
                    {data.map(t => (
                        <li key={t.guid}>{t.name}</li>
                    ))}
                </ul>
            )}
        </main>
    );
}
