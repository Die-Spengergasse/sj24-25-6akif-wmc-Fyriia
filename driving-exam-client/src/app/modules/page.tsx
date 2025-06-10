'use client';

import { useModules } from '@/features/modules/useModules';
import Link from "next/link";

export default function ModulesPage() {
    const { data, error } = useModules();

    if (error) return <p>Failed to load</p>;
    if (!data)  return <p>Loading…</p>;

    return (
        <main className="p-4">
            <h1 className="text-2xl font-bold mb-4">Module</h1>
            <ul className="space-y-2">
                {data.map(m => (
                    <li key={m.guid} className="border p-3 rounded">
                        <Link href={`/modules/${m.guid}`} className="hover:underline">
                            {m.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </main>
    );
}
