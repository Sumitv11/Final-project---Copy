import { loginUser } from '@/redux/slice/loginSlice';
import React, { useState } from 'react';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from './api/hooks';

const Login = () => {
    const [password, setPassword] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    
    const dispatch = useAppDispatch();
    const reduxErrors = useAppSelector((state) => state.login.errors);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const validate = () => {
        const newErrors: { [key: string]: string } = {};
        
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Please enter a valid email address.";
        }
        
        if (!password || password.length < 6) {
            newErrors.password = "Password must be at least 6 characters long.";
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (validate()) {
            dispatch(loginUser({ email, password }));
        }
    }

    return (
        <>
            <img src="airport.jpg" alt="airport" className='logImage' />
            <div className='d-flex justify-content-center'>
                <form className='login' onSubmit={handleSubmit}>
                    <div className='d-flex justify-content-center mb-1'>
                        <h2 style={{ color: `navy` }}>Login here!</h2>
                    </div>

                    <div className="mb-3">
                        <input
                            type="email"
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            placeholder="Enter email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors && <div className="invalid-feedback">{errors.email}</div>}
                    </div>

                    <div className="mb-3">
                        <input
                            type="password"
                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                            placeholder="Enter password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                          {errors && <div className="invalid-feedback">{errors.password}</div>}
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        {reduxErrors && <div style={{ color: `red` }}>{reduxErrors}</div>}
                        <Link href="/register" className='flex mb-4 fst-normal' style={{ color: 'black' }}>
                            Create an Account!
                        </Link>
                    </div>

                    <div className="d-grid mt-4">
                        <button type="submit" className="btn btn-primary">Login</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Login;
