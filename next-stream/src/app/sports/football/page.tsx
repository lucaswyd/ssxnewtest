// src/app/sports/football/page.tsx
"use client";

import React, { useEffect, useState } from 'react';
import styles from "./page.module.css"; // Adjust path to go up one directory
import '../../fonts/fonts.css';

const fallbackPoster = "https://github.com/lucaswyd/sports/blob/main/ssxbanner.png?raw=true";

interface Team {
    name: string;
}

interface Match {
    id: string;
    title: string;
    date: string;
    teams: {
        away: Team;
        home: Team;
    };
    poster?: string;
}

const FootballPage = () => {
    const [matches, setMatches] = useState<Match[]>([]);

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const response = await fetch('https://streamed.su/api/matches/american-football'); // Adjusted API URL
                const data = await response.json();
                setMatches(data);
            } catch (error) {
                console.error("Error fetching football matches:", error);
            }
        };

        fetchMatches();
    }, []);

    const formatDate = (timestamp: string) => {
        const matchDate = new Date(timestamp);

        if (isNaN(matchDate.getTime())) {
            return '';
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const formatTime = (date: Date) => {
            const optionsTime: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: '2-digit', hour12: true };
            return date.toLocaleTimeString(undefined, optionsTime).replace(/^0/, '');
        };

        if (matchDate.toDateString() === today.toDateString()) {
            return formatTime(matchDate);
        } else {
            const optionsDateTime: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true };
            return matchDate.toLocaleString(undefined, optionsDateTime).replace(/^0/, '');
        }
    };

    return (
        <div className={styles.container}>
            <h1>All Football</h1>
            <div className={styles.matchGrid}>
                {matches.map((match) => (
                    <a
                        className={styles.matchBox}
                        key={match.id}
                        href={`/watch/${match.id}`}
                    >
                        <div className={styles.poster}>
                            <img
                                src={match.poster ? `https://streamed.su/${match.poster}` : fallbackPoster}
                                alt={match.title}
                                className={styles.posterImage}
                            />
                        </div>
                        <div className={styles.teamNames}>
                            {match.teams?.away?.name && match.teams?.home?.name ? (
                                <>
                                    <div className={`bodyText ${styles.awayTeam}`}>{match.teams?.away?.name || 'N/A'}</div>
                                    <div className={`bodyText ${styles.homeTeam}`}>{match.teams?.home?.name || 'N/A'}</div>
                                </>
                            ) : (
                                <div className={`bodyText ${styles.matchTitle}`}>{match.title}</div>
                            )}
                        </div>
                        <div className={styles.dateTime}>
                            {formatDate(match.date)}
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default FootballPage;