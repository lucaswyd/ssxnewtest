// src/app/watch/generateStaticParams.ts

export async function generateStaticParams() {
    const matchIds = await fetchMatchIds(); // Fetch match IDs
    return matchIds.map((id) => ({ matchId: id.toString() })); // Convert ID to string for params
}

// Fetch match IDs from your API or a static source
async function fetchMatchIds(): Promise<number[]> {
    try {
        const response = await fetch('https://streamed.su/api/matches'); // Replace with your API endpoint
        const data = await response.json();
        return data.map((match: { id: number }) => match.id); // Assuming the response has an id property
    } catch (error) {
        console.error("Error fetching match IDs:", error);
        return []; // Return an empty array on error
    }
}
