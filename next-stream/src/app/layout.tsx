"use client";

import React, { ReactNode, useEffect, useState } from 'react';
import './globals.css'; // Ensure your global styles are applied
import styles from './layout.module.css'; // Adjust your layout module styles
import Image from 'next/image'; // Import Image from Next.js

interface RootLayoutProps {
    children: ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
    const [searchVisible, setSearchVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [accountName, setAccountName] = useState<string | null>(null);
    const [menuVisible, setMenuVisible] = useState(false);

    // Check if the user is logged in
    const checkLoginStatus = () => {
        const name = localStorage.getItem('accountName');
        setAccountName(name);

        // Redirect if not logged in and not on the login page
        if (!name && window.location.pathname !== '/login') {
            window.open('/login', '_self'); // Redirect to login page
        }
    };

    useEffect(() => {
        // Run the login status check every 500ms
        const intervalId = setInterval(checkLoginStatus, 500);
        
        return () => clearInterval(intervalId); // Cleanup on unmount
    }, []);

    const handleMenuToggle = () => {
        setMenuVisible((prev) => !prev);
    };

    const handleSignOut = () => {
        localStorage.removeItem('accountName'); // Clear account from local storage
        window.open('/login', '_self'); // Redirect to login page
    };

    return (
        <html lang="en">
            <body className={searchVisible ? styles.bodyBlur : ''}>
                <header className={styles.header}>
                    <div className={styles.leftContainer}>
                        <button 
                            className={styles.button}
                            onClick={() => window.open('/', '_self')} // Using window.open
                        >
                            <Image 
                                src="https://github.com/lucaswyd/sports/blob/main/ssx1tp.png?raw=true"
                                alt="Logo" 
                                className={styles.logo} 
                                width={30} 
                                height={30} 
                            />
                        </button>
                        <button
                            className={styles.scheduleButton}
                            onClick={() => {
                                // Implement Schedule button action here
                            }}
                        >
                            Schedule
                        </button>
                    </div>
                    <div className={styles.centerContainer}>
                        <button
                            onClick={() => setSearchVisible(true)}
                            className={styles.searchInput}
                        >
                            Search...
                        </button>
                    </div>
                    <button 
                        className={styles.menuButton}
                        onClick={handleMenuToggle}
                    >
                        <svg width="24" height="24" fill="white" xmlns="http://www.w3.org/2000/svg">
                            <rect width="24" height="24" fill="none" />
                            <path d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z" />
                        </svg>
                    </button>
                    {menuVisible && (
                      <div className={styles.menu}>
                          {accountName ? (
                              <div>
                                  Welcome, {accountName}!
                                  <button onClick={handleSignOut} className={styles.signOutButton}>Sign Out</button>
                              </div>
                          ) : (
                              <div>Please log in</div>
                          )}
                      </div>
                    )}
                </header>
                <main className={styles.mainPadding}>{children}</main>

                {searchVisible && (
                    <div className={styles.searchOverlay}>
                        <div className={styles.searchContainer} id="search-container">
                            <button 
                                className={styles.closeButton} 
                                onClick={() => setSearchVisible(false)}
                            >
                                ×
                            </button>
                            <input 
                                type="text" 
                                placeholder="Search for matches..." 
                                value={searchTerm} 
                                onChange={e => setSearchTerm(e.target.value)} 
                                className={styles.overlayInput}
                                autoFocus 
                            />
                            {/* Add your search results here */}
                        </div>
                    </div>
                )}
            </body>
        </html>
    );
};

export default RootLayout;