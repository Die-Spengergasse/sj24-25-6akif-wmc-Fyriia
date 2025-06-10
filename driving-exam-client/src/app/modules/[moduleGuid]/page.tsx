
'use client';

import { useParams, useRouter } from 'next/navigation';
import { useTopics } from '@/features/topics/useTopics';
import Link from "next/link";

export default function TopicsPage() {
    const { moduleGuid } = useParams<{ moduleGuid: string }>();
    const router = useRouter();
    const { data, error } = useTopics(moduleGuid);

    if (error) return <p>Failed to load</p>;
    if (!data)  return <p>Loading…</p>;

    return (
        <main className="p-4">
            <button onClick={() => router.back()} className="mb-4 text-sm underline">
                ← Back
            </button>

            <h1 className="text-2xl font-bold mb-4">Topics</h1>
            <ul className="space-y-2">
                {data.map(t => (
                    <li key={t.guid} className="border p-3 rounded">
                        <Link href={`/modules/${moduleGuid}/${t.guid}`} className="hover:underline">
                            {t.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </main>
    );
}
