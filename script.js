// News API
const newsApiKey = "pub_8fb474a5cea74dd1951ba5068d30351e";
const newsUrl = `https://newsdata.io/api/1/news?apikey=${newsApiKey}&q=football&language=en`;
const newsContainer = document.getElementById("news-container");

// Live Scores API
const footballApiKey = "8331c48c636d457c8ab2c16957b5b1c2";
const scoresUrl = "https://api.football-data.org/v4/matches";
const scoresContainer = document.getElementById("scores-container");

// Get Football News
async function getFootballNews() {
  try {
    const response = await fetch(newsUrl);
    const data = await response.json();
    newsContainer.innerHTML = "";

    if (!data.results || data.results.length === 0) {
      newsContainer.innerHTML = "<p>No news found.</p>";
      return;
    }

    data.results.forEach((article, index) => {
      const card = document.createElement("div");
      card.className = "news-card";
      card.innerHTML = `
        <img src="${article.image_url || 'https://via.placeholder.com/400x200?text=Football+News'}" alt="News image">
        <div class="news-card-content">
          <h3>${article.title}</h3>
          <p>${article.description || ''}</p>
          <a href="${article.link}" target="_blank" class="read-more">Read More</a>
        </div>
      `;
      newsContainer.appendChild(card);

      // Add Ad After Every 3 Posts
      if ((index + 1) % 3 === 0) {
        const adDiv = document.createElement("div");
        adDiv.className = "ad-banner";
        adDiv.innerHTML = `
          <script type="text/javascript">
            atOptions = {
              'key' : '2945840',
              'format' : 'iframe',
              'height' : 250,
              'width' : 300,
              'params' : {}
            };
            document.write('<scr' + 'ipt type="text/javascript" src="https://www.highperformanceformat.com/2945840/invoke.js"></scr' + 'ipt>');
          </script>
        `;
        newsContainer.appendChild(adDiv);
      }
    });
  } catch (error) {
    console.error(error);
    newsContainer.innerHTML = "<p>Failed to load news.</p>";
  }
}

// Get Live Scores
async function getLiveScores() {
  try {
    const response = await fetch(scoresUrl, {
      headers: { "X-Auth-Token": footballApiKey }
    });
    const data = await response.json();
    scoresContainer.innerHTML = "";

    const matches = data.matches.filter(m => m.status === "IN_PLAY");
    if (matches.length === 0) {
      scoresContainer.innerHTML = "<p>No live matches right now.</p>";
      return;
    }

    matches.forEach(match => {
      const card = document.createElement("div");
      card.className = "news-card";
      card.innerHTML = `
        <div class="news-card-content">
          <h3>${match.competition.name}</h3>
          <p><strong>${match.homeTeam.name}</strong> vs <strong>${match.awayTeam.name}</strong></p>
          <p>Score: ${match.score.fullTime.home ?? 0} - ${match.score.fullTime.away ?? 0}</p>
          <p>Status: ${match.status}</p>
        </div>
      `;
      scoresContainer.appendChild(card);
    });
  } catch (error) {
    console.error(error);
    scoresContainer.innerHTML = "<p>Failed to load scores.</p>";
  }
}

getFootballNews();
getLiveScores();
setInterval(getLiveScores, 60000);
