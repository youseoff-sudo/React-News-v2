import { useEffect, useState } from "react";
import NewsCard from "./NewsCard";

function NewsGrid() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getFootballNews = async () => {
      try {
        const apiKey = import.meta.env.VITE_GNEWS_API_KEY;

        if (!apiKey) {
          throw new Error("API key is missing");
        }

        const params = new URLSearchParams({
          q: "football OR soccer",
          lang: "en",
          sortby: "publishedAt",
          max: "6",
          apikey: apiKey,
        });

        const response = await fetch(
          `https://gnews.io/api/v4/search?${params.toString()}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.errors?.[0] || "Failed to fetch football news"
          );
        }

        setNews(data.articles || []);
      } catch (error) {
        console.error("Football news error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getFootballNews();
  }, []);

  return (
    <section className="news-section" id="news">
      <div className="container">

        <div className="section-heading">
          <div>
            <p>أحدث الأخبار</p>

            <h2>
              Football <span>News</span>
            </h2>
          </div>

          <span className="news-count">
            LIVE FOOTBALL UPDATES
          </span>
        </div>

        {loading && (
          <div className="loading-message">
            Loading the latest football news...
          </div>
        )}

        {!loading && error && (
          <div className="error-message">
            <h3>Unable to load football news</h3>
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && news.length > 0 && (
          <div className="news-grid">
            {news.slice(0, 6).map((article, index) => (
              <NewsCard
                key={article.url || index}
                article={article}
                index={index}
              />
            ))}
          </div>
        )}

        {!loading && !error && news.length === 0 && (
          <div className="error-message">
            <h3>No football news found</h3>
            <p>Please try again later.</p>
          </div>
        )}

      </div>
    </section>
  );
}

export default NewsGrid;