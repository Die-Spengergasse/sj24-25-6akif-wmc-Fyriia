'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createModule } from '@/features/modules/createModule';
import { useModules } from '@/features/modules/useModules';
import { nameRegex } from '@/lib/validators';
import { ApiError } from '@/lib/ApiError';

const schema = z.object({
    number: z.number().int().min(1).max(999_999),
    name: z
        .string()
        .min(1)
        .max(255)
        .regex(nameRegex, 'Nur Buchstaben, Ziffern, Leerzeichen, _, - und / sind erlaubt'),
});

type Inputs = z.infer<typeof schema>;

export default function ModuleForm() {
    const { mutate } = useModules();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
        setError,
    } = useForm<Inputs>({ resolver: zodResolver(schema) });

    async function onSubmit(values: Inputs) {
        try {
            await createModule(values.number, values.name);
            reset();
            mutate();
        } catch (err) {
            if (err instanceof ApiError) {
                const friendly =
                    /UNIQUE constraint failed: Modules.Number/i.test(err.detail)
                        ? 'Diese Modulnummer ist bereits vergeben'
                        : err.detail;

                setError('number', { type: 'server', message: friendly });
            } else {
                alert(err instanceof Error ? err.message : String(err));
            }
        }
    }   {/* ← this closing brace was missing */}

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            <input
                type="number"
                placeholder="Nummer"
                {...register('number', { valueAsNumber: true })}
                className="border p-2 w-full"
            />
            {errors.number && (
                <p className="text-red-600 text-sm">{errors.number.message}</p>
            )}

            <input
                type="text"
                placeholder="Name"
                {...register('name')}
                className="border p-2 w-full"
            />
            {errors.name && (
                <p className="text-red-600 text-sm">{errors.name.message}</p>
            )}

            <button
                disabled={isSubmitting}
                className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
            >
                Modul anlegen
            </button>
        </form>
    );
}
