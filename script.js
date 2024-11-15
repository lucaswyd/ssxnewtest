<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Popular American Football Matches</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f8f9fa;
            margin: 0;
            padding: 20px;
        }
        h1 {
            text-align: center;
        }
        .match-container {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
        }
        .match-card {
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            margin: 15px;
            padding: 15px;
            width: 300px;
            text-align: center;
        }
        .badge {
            width: 50px;
            height: 50px;
        }
        .date {
            color: #6c757d;
            font-size: 0.9em;
        }
    </style>
</head>
<body>
    <h1>Popular American Football Matches</h1>
    <div class="match-container" id="matchContainer"></div>

    <script>
        document.addEventListener("DOMContentLoaded", function () {
            const matchContainer = document.getElementById('matchContainer');

            // Fetch popular American Football matches from the Streamed API
            fetch('https://streamed.su/api/matches/american-football/popular')  // Use the correct endpoint for popular matches
                .then(response => response.json())
                .then(data => {
                    // Check if there are matches returned
                    if (data.length === 0) {
                        matchContainer.innerHTML = '<p>No popular matches found.</p>';
                        return;
                    }

                    data.forEach(match => renderMatch(match));
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    matchContainer.innerHTML = '<p>Failed to load matches.</p>';
                });

            function renderMatch(match) {
                const matchCard = document.createElement('div');
                matchCard.classList.add('match-card');

                const teams = match.teams;

                // Add logos for home and away teams
                const homeTeamBadge = teams?.home?.badge ? `<img src="${teams.home.badge}" alt="${teams.home.name}" class="badge">` : '';
                const awayTeamBadge = teams?.away?.badge ? `<img src="${teams.away.badge}" alt="${teams.away.name}" class="badge">` : '';

                matchCard.innerHTML = `
                    <h2>${match.title}</h2>
                    <div class="date">${new Date(match.date).toLocaleString()}</div>
                    <div>${homeTeamBadge} <strong>${teams.home?.name}</strong> vs <strong>${teams.away?.name}</strong> ${awayTeamBadge}</div>
                    <p>Poster: <img src="${match.poster || 'https://via.placeholder.com/150'}" alt="Poster" style="width: 100%; border-radius: 5px;"/></p>
                `;

                matchContainer.appendChild(matchCard);
            }
        });
    </script>
</body>
</html>