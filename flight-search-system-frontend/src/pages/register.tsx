import React, { useState } from 'react';
import { useAppDispatch } from './api/hooks';
import Link from 'next/link';
import { registerUser } from '@/redux/slice/registerSlice';

const Register = () => {
    const dispatch = useAppDispatch();

    const [password, setPassword] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [fullName, setFullName] = useState<string>("");
    
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const validate = () => {
        const newErrors: { [key: string]: string } = {};
        
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Please enter a valid email address.";
        }
        
        if (!fullName) {
            newErrors.fullName = "Full name is required.";
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
            dispatch(registerUser({ fullName, email, password }));
        }
    }

    return (
        <>
            <img src="airport.jpg" alt="airport" className='logImage' />
            <div className='d-flex justify-content-center'>
                <form className='login' onSubmit={handleSubmit}>
                    <div className='d-flex justify-content-center mb-1'>
                        <h2 style={{ color: `navy` }}>Register here!</h2>
                    </div>
                    
                    <div className="mb-3">
                        <input
                            type="email"
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            placeholder="Enter email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>
                    
                    <div className="mb-3">
                        <input
                            type="text"
                            className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
                            placeholder="Enter Fullname"
                            onChange={(e) => setFullName(e.target.value)}
                        />
                        {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
                    </div>

                    <div className="mb-3">
                        <input
                            type="password"
                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                            placeholder="Create password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <Link href="/login" className='flex mb-4 fst-normal' style={{ color: 'black' }}>
                            Already have an account? Login here
                        </Link>
                    </div>

                    <div className="d-grid mt-4">
                        <button type="submit" className="btn btn-primary">Register</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Register;
