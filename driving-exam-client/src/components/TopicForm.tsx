'use client';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { createTopic } from '@/features/topics/createTopic';
import { useTopics } from '@/features/topics/useTopics';
import {nameRegex} from "@/lib/validators";
import {ApiError} from "@/lib/ApiError";


const schema = z.object({
    name: z.string()
        .min(1)
        .max(255)
        .regex(nameRegex, 'Nur Buchstaben, Ziffern, Leerzeichen, _, - und / sind erlaubt'),
});

type Inputs = z.infer<typeof schema>;

export default function TopicForm() {
    const { mutate } = useTopics(undefined); // reuse list later if desired
    const {
        register, handleSubmit, reset,
        formState: { errors, isSubmitting },
        setError,                       // 👈 add
    } = useForm<Inputs>({ resolver: zodResolver(schema) });

    async function onSubmit(values: Inputs) {
        try {
            await createTopic(values.name);
            reset();
            mutate();}
        catch (err) {
                if (err instanceof ApiError) {
                    const friendly =
                        /UNIQUE constraint failed: Topics.Name/i.test(err.detail)
                            ? 'Dieser Themenname ist bereits vergeben'
                            : err.detail;

                    setError('name', { type: 'server', message: friendly });
                } else {
                    alert(err instanceof Error ? err.message : String(err));
                }
            }}


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            <input
                type="text"
                placeholder="Themenname"
                {...register('name')}
                className="border p-2 w-full"
            />
            {errors.name && (
                <p className="text-red-600 text-sm">{errors.name.message}</p>
            )}
            <button className="px-4 py-2 bg-blue-600 text-white rounded">
                Thema anlegen
            </button>
        </form>
    );
}
