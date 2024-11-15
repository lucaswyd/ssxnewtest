// src/app/watch/[matchId]/MatchPageClient.tsx

"use client"; // This makes the component a Client Component

import React from 'react';
import Image from 'next/image'; // Import Image from next/image
import styles from './page.module.css'; // Import your CSS module

interface Match {
    poster: string;
    date: string;
    teams: {
        home: { name: string };
        away: { name: string };
    };
    title: string; // Include title in the Match interface if needed
    id: string; // Include id in the Match interface if needed
}

const MatchPageClient: React.FC<{ match: Match }> = ({ match }) => {
    const fallbackPoster = 'https://github.com/lucaswyd/sports/blob/main/ssxbanner.png?raw=true'; // Default fallback poster

    return (
        <div className={styles.container}>
            <Image
                src={match.poster ? `https://streamed.su/${match.poster}` : fallbackPoster}
                alt={match.title}
                width={500}
                height={300}
            />
            <p>Home Team: {match.teams.home.name}</p>
            <p>Away Team: {match.teams.away.name}</p>
            <p>Date: {new Date(match.date).toLocaleString()}</p>
            <a className={styles.watchButton} href={`/watch/${match.id}`}>Watch Stream</a>
        </div>
    );
};

export default MatchPageClient;
