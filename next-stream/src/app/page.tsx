"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import "./fonts/fonts.css";

interface Team {
  name: string;
  badge: string;
}

interface Match {
  id: string;
  title: string;
  date: string;
  teams: {
    away: Team;
    home: Team;
  };
  poster?: string; // Optional poster field
}

// Hardcoded accounts
const accounts = [
  { name: "lp tha don", favoriteTeams: ["Dallas Cowboys", "Texas Longhorns", "Green Bay Packers", "Chicago Bears", "Wisconsin Badgers"] },
  { name: "Dad", favoriteTeams: ["Green Bay Packers", "Texas Longhorns", "Dallas Cowboys", "Wisconsin Badgers", "Arizona State Sun Devils"] },
  { name: "Mom", favoriteTeams: ["Dallas Cowboys", "Texas Longhorns", "Chicago Bears", "Green Bay Packers", "Arizona State Sun Devils", "Illinois Fighting Illini", "Colorado Buffaloes"] },
];

const HomePage = () => {
  const [baseballMatches, setBaseballMatches] = useState<Match[]>([]);
  const [footballMatches, setFootballMatches] = useState<Match[]>([]);
  const [basketballMatches, setBasketballMatches] = useState<Match[]>([]);
  const [fightsMatches, setFightsMatches] = useState<Match[]>([]);
  const [favorites, setFavorites] = useState<Match[]>([]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const responses = await Promise.all([
          fetch("https://streamed.su/api/matches/baseball/popular"),
          fetch("https://streamed.su/api/matches/american-football/popular"),
          fetch("https://streamed.su/api/matches/basketball/popular"),
          fetch("https://streamed.su/api/matches/fight/popular"),
        ]);

        const [
          baseballData,
          footballData,
          basketballData,
          fightsData,
        ] = await Promise.all(responses.map((res) => res.json()));

        setBaseballMatches(baseballData);
        setFootballMatches(footballData);
        setBasketballMatches(basketballData);
        setFightsMatches(fightsData);

        // Fetch account details (hardcoded for this example)
        const accountName = localStorage.getItem("accountName");
        const account = accounts.find(acc => acc.name === accountName);

        if (account) {
          const userFavorites = account.favoriteTeams;
          const allMatches = [
            ...footballData,
            ...basketballData,
            ...baseballData,
            ...fightsData,
          ];

          const favoriteMatches = allMatches.filter((match) => {
            if (match.teams && match.teams.home && match.teams.away) {
              return userFavorites.some((team) =>
                match.teams.home.name === team || match.teams.away.name === team
              );
            }
            return false;
          });

          setFavorites(favoriteMatches);
        } else {
          console.warn(`No account found for the name: ${accountName}`);
        }
      } catch (error) {
        console.error("Error fetching matches:", error);
      }
    };

    fetchMatches();
  }, []);

  const formatDate = (timestamp: string) => {
    const matchDate = new Date(parseInt(timestamp));

    if (isNaN(matchDate.getTime())) {
      return "";
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const formatTime = (date: Date) => {
      const optionsTime: Intl.DateTimeFormatOptions = {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      };
      return date.toLocaleTimeString(undefined, optionsTime).replace(/^0/, "");
    };

    if (matchDate.toDateString() === today.toDateString()) {
      return formatTime(matchDate);
    } else {
      const optionsDateTime: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      };
      return matchDate.toLocaleString(undefined, optionsDateTime).replace(
        /^0/,
        ""
      );
    }
  };

  const shouldShowFlashingGif = (matchDate: string) => {
    const currentTime = new Date().getTime();
    return currentTime >= new Date(matchDate).getTime();
  };

  return (
    <div className={styles.container}>
      {/* Favorites Section */}
      {favorites.length > 0 ? (
        <div>
          <h2 className={`${styles.sectionTitle} ${styles.categoryTitle}`}>
            Favorites
          </h2>
          <div className={styles.matchGrid}>
            {favorites.map((match) => {
              const homeBadge = match.teams?.home?.badge;
              const awayBadge = match.teams?.away?.badge;

              // Construct the poster URLs
              const constructedPoster = `https://streamed.su/api/images/poster/${awayBadge}/${homeBadge}.webp`;
              let poster = "";

              // Check the order of fallbacks
              if (match.poster) {
                // Use match.poster if it exists
                poster = `https://streamed.su/${match.poster}`;
              } else if (homeBadge && awayBadge) {
                // Use constructed poster if badges exist
                poster = constructedPoster;
              } else {
                // Fall back to the static GitHub URL
                poster = "https://github.com/lucaswyd/sports/blob/main/ssxbanner.png?raw=true";
              }

              return (
                <a className={styles.matchBox} key={match.id} href={`/watch/${match.id}`}>
                  <div className={styles.poster}>
                    <img src={poster} alt={match.title} className={styles.posterImage} />
                    <div className={styles.dateTime}>{formatDate(match.date)}</div>
                    {shouldShowFlashingGif(match.date) && (
                      <img
                        id="flashing-gif"
                        src="https://media3.giphy.com/media/cxSrNIbCgY6LESB4SA/giphy.gif"
                        alt="Flashing Indicator"
                        className={styles.flashingGif}
                        style={{
                          width: "40px",
                          height: "40px",
                          position: "absolute",
                          top: "5px",
                          left: "5px",
                          display: "block",
                        }}
                      />
                    )}
                  </div>
                  <div className={styles.teamNames}>
                    <div className={`bodyText ${styles.awayTeam}`}>
                      {match.teams.away?.name || "N/A"}
                    </div>
                    <div className={`bodyText ${styles.homeTeam}`}>
                      {match.teams.home?.name || "N/A"}
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      ) : (
        <div style={{ padding: '20px', fontSize: '16px', textAlign: 'center' }}>
          No favorite matches available.
        </div>
      )}

      {/* Other sections */}
      <h2 className={`${styles.sectionTitle} ${styles.categoryTitle}`}>
        24/7
      </h2>
      <div className={styles.matchGrid}>
        {[
          {
            name: "ESPN",
            url: "/watch/espn",
            poster: "https://github.com/lucaswyd/sports/blob/main/espnbanner.png?raw=true",
          },
          {
            name: "NFL Network",
            url: "/watch/nflnetwork",
            poster: "https://github.com/lucaswyd/sports/blob/main/networkbanner.png?raw=true",
          },
          {
            name: "NFL RedZone",
            url: "/watch/nflredzone",
            poster: "https://github.com/lucaswyd/sports/blob/main/redzonebanner.png?raw=true",
          },
          {
            name: "NBA TV",
            url: "/watch/nbatv",
            poster: "https://github.com/lucaswyd/sports/blob/main/nbatvbanner.png?raw=true",
          },
        ].map((channel) => (
          <a className={styles.matchBox} key={channel.url} href={channel.url}>
            <div className={styles.poster}>
              <img src={channel.poster} alt={channel.name} className={styles.posterImage} />
            </div>
            <div className={styles.teamNames}>
              <div className={`bodyText ${styles.homeTeam}`}>{channel.name}</div>
            </div>
          </a>
        ))}
      </div>

      <h2 className={`${styles.sectionTitle} ${styles.categoryTitle}`}>
        <a href="/sports/football">Football ➔</a>
      </h2>

      {[
        { title: "Popular Football", matches: footballMatches },
        { title: "Popular Basketball", matches: basketballMatches },
        { title: "Popular Baseball", matches: baseballMatches },
        { title: "Popular Fights", matches: fightsMatches },
      ].map(
        (section) =>
          section.matches.length > 0 && (
            <div key={section.title}>
              <h2 className={`${styles.sectionTitle} ${styles.categoryTitle}`}>
                {section.title}
              </h2>
              <div className={styles.matchGrid}>
                {section.matches.map((match) => {
                  const homeBadge = match.teams?.home?.badge;
                  const awayBadge = match.teams?.away?.badge;

                  // Construct the poster URLs correctly
                  const constructedPoster = `https://streamed.su/api/images/poster/${awayBadge}/${homeBadge}.webp`;
                  let poster = "";

                  // Check the order of fallbacks
                  if (match.poster) {
                    // Use match.poster if it exists
                    poster = `https://streamed.su/${match.poster}`;
                  } else if (homeBadge && awayBadge) {
                    // Use constructed poster if badges exist
                    poster = constructedPoster;
                  } else {
                    // Fall back to the static GitHub URL
                    poster = "https://github.com/lucaswyd/sports/blob/main/ssxbanner.png?raw=true";
                  }

                  return (
                    <a className={styles.matchBox} key={match.id} href={`/watch/${match.id}`}>
                      <div className={styles.poster}>
                        <img src={poster} alt={match.title} className={styles.posterImage} />
                        <div className={styles.dateTime}>{formatDate(match.date)}</div>
                      </div>
                      <div className={styles.teamNames}>
                        {match.teams ? (
                          <>
                            <div className={`bodyText ${styles.awayTeam}`}>
                              {match.teams.away?.name || "N/A"}
                            </div>
                            <div className={`bodyText ${styles.homeTeam}`}>
                              {match.teams.home?.name || "N/A"}
                            </div>
                          </>
                        ) : (
                          <div className={`bodyText ${styles.matchTitle}`}>{match.title}</div>
                        )}
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          )
      )}
    </div>
  );
};

export default HomePage;
