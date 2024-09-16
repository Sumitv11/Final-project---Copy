import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

export const Header = () => {

    const [username, setUsername] = useState<string | null>(null);
    const [loginRole ,setLoginRole] =useState<string | null>(null);
    const route =useRouter();

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        const storedloginRole= localStorage.getItem('role');
        setLoginRole(storedloginRole);
        setUsername(storedUsername);
    }, []);

    function logout() {
        localStorage.removeItem('role');
        localStorage.removeItem('username');
        setUsername(null);
        setLoginRole(null);
    }

    return (
        <header className='header'>
            <div className='headerRight'>
                <div className='logo'>
                    <img src="/logo.png" alt="Flyfinder" />
                </div>
                <div className='navLinks' >
                    <Link href="/" >Home</Link>
                  
                    {username ? (
                        <Link href="/" onClick={logout}>Logout</Link>
                    ) : (
                        <div className='flex'>
                        <Link href="/login">SignIn</Link>
                        <Link href="/register">SignUp</Link>
                        </div>
                    )}
                    <Link href="/flightSearchForm">Search</Link>
                    {loginRole?.match('ADMIN') ? <Link href="/adminhome">Admin</Link> : ''}
                </div>
            </div>
        </header>
    )
}
