'use client';

import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useIsAdmin } from '@/lib/useIsAdmin';

export default function NavBar() {
    const { status } = useSession();            // "authenticated" | "unauthenticated" | "loading"
    const isAdmin = useIsAdmin();

    return (
        <header className="bg-gray-100 dark:bg-gray-800 py-3 mb-8 shadow-sm">
            <nav className="max-w-4xl mx-auto px-4 flex items-center gap-6">
                {/* left — public links */}
                <Link href="/" className="font-semibold text-lg">
                    Führerschein Training
                </Link>
                <Link href="/modules" className="hover:underline">
                    Module üben
                </Link>

                {/* admin dropdown */}
                {isAdmin && (
                    <details className="relative">
                        <summary className="cursor-pointer hover:underline">
                            Admin
                        </summary>
                        <ul className="absolute left-0 mt-2 bg-white dark:bg-gray-900 border rounded shadow text-sm">
                            <li>
                                <Link href="/admin/modules" className="block px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700">
                                    Module
                                </Link>
                            </li>
                            <li>
                                <Link href="/admin/topics" className="block px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700">
                                    Topics
                                </Link>
                            </li>
                        </ul>
                    </details>
                )}

                {/* right — spacer + auth button */}
                <span className="flex-1" />
                {status === 'authenticated' ? (
                    <button
                        onClick={() => signOut({ callbackUrl: '/' })}
                        className="text-sm underline underline-offset-4"
                    >
                        Sign out
                    </button>
                ) : status === 'unauthenticated' ? (
                    <button
                        onClick={() => signIn('azure-ad')}
                        className="text-sm underline underline-offset-4"
                    >
                        Sign in
                    </button>
                ) : (
                    <span className="text-sm">…</span>
                    )}
            </nav>
        </header>
    );
}
