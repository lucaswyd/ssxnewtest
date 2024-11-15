"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAccountByAccessKey } from "../account";

const LoginPage = () => {
    const [accessKey, setAccessKey] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    useEffect(() => {
        const accountName = localStorage.getItem('accountName');

        // Check if the user is logged in and skip redirect if on the login page
        if (accountName && window.location.pathname !== "/login") {
            console.log("User is already logged in. Redirecting to home."); // Debug log
            router.push('/'); // Redirect to home page 
        }
    }, [router]);

    // Corrected: Updated to FormEvent<HTMLFormElement>
    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent default form submission
        const account = getAccountByAccessKey(accessKey);
        if (account) {
            localStorage.setItem('accountName', account.name); // Save account name in local storage
            router.push('/'); // Redirect to the home page
        } else {
            setError("Invalid access key");
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Enter access key"
                    value={accessKey}
                    onChange={(e) => setAccessKey(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};

export default LoginPage;