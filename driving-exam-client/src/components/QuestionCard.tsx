'use client';

import { useState } from 'react';
import type { Question } from '@/features/questions/types';

type Props = {
    question: Question;
    checked: Record<string, boolean>;
    onToggle: (answerGuid: string) => void;
    evaluation?: Record<string, boolean>;
    disabled?: boolean;
};

export default function QuestionCard({
                                         question,
                                         checked,
                                         onToggle,
                                         evaluation,
                                         disabled = false,                          // 👉 default
                                     }: Props) {
    console.log('evaluation prop', evaluation);
    // noinspection PointlessBooleanExpressionJS
    return (
        <section className="border p-4 rounded space-y-2">
            <h2 className="font-semibold">{question.text}</h2>
            {question.imageUrl && (
                <img src={question.imageUrl} alt="" className="max-h-52 object-contain" />
            )}

            {question.answers.map(a => {

                const wrong = evaluation ? evaluation[a.guid] === false : false;
                const correct = evaluation ? evaluation[a.guid] === true  : false;

                return (
                    <label
                        key={a.guid}
                        className={`block ${
                            wrong ? 'text-red-600' :
                                correct ? 'text-green-600' :
                                    ''
                        }`}
                    >
                        <input
                            type="checkbox"
                            className="mr-2"
                            checked={!!checked[a.guid]}
                            onChange={() => onToggle(a.guid)}
                            disabled={disabled}
                        />
                        {a.text}
                    </label>
                );
            })}
        </section>
    );
}
