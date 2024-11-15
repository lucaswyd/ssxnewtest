// src/app/api.ts

export const fetchPopularMatches = async () => {
    const response = await fetch('https://streamed.su/api/matches/all/popular');
    if (!response.ok) {
        throw new Error('Failed to fetch popular matches');
    }
    return response.json();
};
