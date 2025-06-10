'use client';
import { useModules } from '@/features/modules/useModules';
import ModuleForm from '@/components/ModuleForm';

export default function AdminModules() {
    const { data, error } = useModules();

    return (
        <main className="p-4 space-y-4">
            <h1 className="text-2xl font-bold">Module verwalten</h1>

            <ModuleForm />

            <hr />

            {error && <p>Fehler beim Laden</p>}
            {!data && <p>Lade…</p>}
            {data && (
                <ul className="space-y-1">
                    {data.map(m => (
                        <li key={m.guid}>{m.number} – {m.name}</li>
                    ))}
                </ul>
            )}
        </main>
    );
}
