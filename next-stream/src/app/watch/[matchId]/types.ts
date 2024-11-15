// src/app/watch/[matchId]/types.ts

export interface Match {
    id: string; // ID of the match
    title: string; // Title of the match
    poster: string; // URL of the match poster
    date: string; // Date of the match
    teams: {
        home: { name: string }; // Home team details
        away: { name: string }; // Away team details
    };
}
