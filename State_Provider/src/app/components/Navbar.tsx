'use client'  // Da wir usePathname vom Router verwenden.

import styles from './Navbar.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {TodoAppContext, useTodoAppState} from '@/app/context/TodoAppContext'

export default function Navbar() {
    const pathname = usePathname(); // Aktuellen Pfad abrufen
    const { activeUser, actions: { setActiveUser } } = useTodoAppState();

    const handleLogout = () => {
        setActiveUser(null);
    };

    return (
        <nav className={styles.nav}>
            <Link
                href="/"
                className={pathname === '/' ? styles.active : ''}
            >
                Home
            </Link>
            <Link
                href="/categories"
                className={pathname === '/categories' ? styles.active : ''}
            >
                Categories
            </Link>
            <Link
                href="/todos"
                className={pathname === '/todos' ? styles.active : ''}
            >
                Todos
            </Link>
            <Link
                href="/about"
                className={pathname === '/about' ? styles.active : ''}
            >
                About
            </Link>
            {activeUser && activeUser !== '' && (
                <div className={styles.userInfo}>
                    <span>Hello, {activeUser}!</span>
                    <button onClick={handleLogout} className={styles.logoutButton}>
                        Log out
                    </button>
                </div>
            )}
        </nav>
    );
}
