
'use client';

import Link from 'next/link';
import { useIsAdmin } from '@/lib/useIsAdmin';

export default function HomePage() {
  const isAdmin = useIsAdmin();

  return (
      <main className="flex flex-col items-center gap-16 py-12 px-4 text-center">
        {/* hero */}
        <section className="space-y-4 max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight">
            Führerschein-Training&nbsp;AT
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Übe alle offiziellen Prüfungsfragen für die theoretische
            Führerscheinprüfung – jederzeit, kostenlos, auf jedem Gerät.
          </p>
          <Link
              href="/modules"
              className="inline-block mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Starten
          </Link>
        </section>

        {/* how-it-works */}
        <section className="grid sm:grid-cols-3 gap-8 max-w-4xl">
          {[
            ['Modul wählen', 'Grundwissen, A, B … – such dir dein Modul aus.'],
            ['Themen filtern', 'Fokussiere einzelne Themen oder mische alles.'],
            ['Fragen beantworten', 'Erhalte sofort Feedback und Punkte.'],
          ].map(([title, text]) => (
              <div key={title} className="space-y-2">
                <h3 className="font-semibold text-blue-600 dark:text-blue-400">
                  {title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{text}</p>
              </div>
          ))}
        </section>

        {/* admin shortcut */}
        {isAdmin && (
            <Link
                href="/admin/modules"
                className="text-sm underline underline-offset-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              › Adminbereich
            </Link>
        )}
      </main>
  );
}
