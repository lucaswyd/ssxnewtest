// Import necessary modules
import React from 'react';
import styles from './page.module.css';

// Define the interfaces for the Match and Team
interface Team {
    name: string;
}

interface Source {
    source: string;
    id: string;
}

interface Match {
    id: string; // or number based on your API
    category: string; // Assuming this is a property in your match data
    teams: {
        home: Team;
        away: Team;
    };
    sources: Source[]; // Add sources to the Match interface
}

interface MatchStreamPageProps {
    params: {
        matchId: string; // Use the matchId parameter from the URL
    };
}

const MatchStreamPage: React.FC<MatchStreamPageProps> = async ({ params }) => {
    const { matchId } = params;

    // Fetch match details
    const fetchMatchDetails = async (): Promise<Match | undefined> => {
        const response = await fetch(`https://streamed.su/api/matches/all`);
        const matches: Match[] = await response.json();
        
        // Log the fetched matches for debugging
        console.log('Fetched Matches:', matches);
        
        // Find the match based on matchId
        const currentMatch = matches.find((match) => match.id.toString() === matchId);
        
        return currentMatch;
    };

    const matchDetails = await fetchMatchDetails();

    // Log matchDetails for debugging
    console.log('Match Details:', matchDetails);
    
    // Defensive checks to ensure matchDetails and teams exist
    if (!matchDetails) {
        return <div>Match not found</div>; // Handle not found case
    }
    
    if (!matchDetails.teams || !matchDetails.teams.home || !matchDetails.teams.away) {
        return <div>Error: Invalid match data</div>; // Handle case where teams structure is incorrect
    }

    // Extract the alpha source ID
    const alphaSource = matchDetails.sources.find(source => source.source === 'alpha');
    if (!alphaSource) {
        return <div>Error: Alpha source not found</div>; // Handle case where alpha source is missing
    }

    // Construct the stream URL using the alpha source ID
    const streamUrl = `https://embedme.top/embed/alpha/${alphaSource.id}/1`;

    // Construct the breadcrumb components
    const sport = matchDetails.category; // Using the category as sport
    const sportPlaceholder = "/#"; // Placeholder link

    return (
        <div className={styles.container}>
            <div className={styles.breadcrumb}>
                <a href="/">Home</a> &gt; <a href={sportPlaceholder}>{sport}</a> &gt; {matchDetails.teams.away.name} vs {matchDetails.teams.home.name}
            </div>
            <div className={styles.streamContainer}>
                <h1 className={styles.matchTitle}>
                    {matchDetails.teams.away.name} vs {matchDetails.teams.home.name}
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
            </div>
        </div>
    );
};

// This function will generate static params for each match
export async function generateStaticParams() {
    const response = await fetch(`https://streamed.su/api/matches/all`); // Fetch all matches
    const matches: Match[] = await response.json();

    return matches.map((match) => ({
        matchId: match.id.toString(),
    }));
}

export default MatchStreamPage;