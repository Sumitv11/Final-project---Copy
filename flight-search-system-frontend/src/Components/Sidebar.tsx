import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '../styles/Sidebar.module.css';
import { useRouter } from 'next/router';

export const Sidebar = () => {

    const router = useRouter();
    const [selected, setSelected] = useState('');

    useEffect(() => {
        const path = router.pathname.split('/')[1]; 
        setSelected(path || 'city'); 
    }, [router.pathname]);

    const handleClick = (item: string) => {
        setSelected(item);
        router.push(`/${item}`);
    };


    return (
        <div className={styles.sidebar}>
            <div
                className={selected === 'city' ? styles.selected : ''}
                onClick={() => handleClick('city')}
            >
                <Link href="/city">City </Link>
            </div>
            <div
                className={selected === 'flight' ? styles.selected : ''}
                onClick={() => handleClick('flight')}
            >
                <Link href="/flight">Flight</Link>
            </div>
            <div
                className={selected === 'aircraft' ? styles.selected : ''}
                onClick={() => handleClick('aircraft')}
            >
                <Link href="/aircraft">Aircraft </Link>
            </div>
            <div
                className={selected === 'airport' ? styles.selected : ''}
                onClick={() => handleClick('airport')}
            >
                <Link href="/airport">Airport </Link>
            </div>
            <div
                className={selected === 'airline' ? styles.selected : ''}
                onClick={() => handleClick('airline')}
            >
                <Link href="/airline">Airline</Link>
            </div>
        </div>
    );
};

export default Sidebar;
