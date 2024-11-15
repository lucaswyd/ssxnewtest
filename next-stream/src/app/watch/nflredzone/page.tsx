// src/app/nflnetwork/page.tsx

import React from 'react';
import styles from './page.module.css';

const TVStreamPage: React.FC = () => {
    const sport = "24/7 TV"; // Using the category as sport
    const sportPlaceholder = "/#"; // Placeholder link

    // Construct the stream URL dynamically
    const streamUrl = `https://embedme.top/embed/alpha/nfl-redzone/1`;

    return (
        <div className={styles.container}>
            <div className={styles.breadcrumb}>
                <a href={sportPlaceholder}>{sport}</a> &gt; NFL RedZone{/* Escaped quotes */}
            </div>
            <div className={styles.streamContainer}>
                <h1 className={styles.matchTitle}>
                    NFL RedZone
                </h1>
                <h2 className={styles.enjoyStreams}>Enjoy the streams</h2>
                <iframe
                    src={streamUrl}
                    width="1366px"
                    height="768px"
                    frameBorder="0"
                    allowFullScreen
                    sandbox="allow-same-origin allow-scripts"
                    className={styles.iframe}
                ></iframe>
                {/* Include <img> tags without modifications */}
            </div>
        </div>
    );
};

export default TVStreamPage;