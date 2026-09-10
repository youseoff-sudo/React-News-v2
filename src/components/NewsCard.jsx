function NewsCard({ article, index }) {
  const publishedTime = new Date(article.publishedAt).toLocaleString("ar-EG", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <article className={`news-card news-card-${index + 1}`}>
      <div className="news-image-wrapper">
        <img
          src={article.image}
          alt={article.title}
          className="news-image"
        />

        <span className="news-category">FOOTBALL</span>
      </div>

      <div className="news-content">
        <p className="news-source">
          {article.source?.name || "Football News"}
        </p>

        <h2>{article.title}</h2>

        <p className="news-description">
          {article.description || "Latest football news and updates."}
        </p>

        <div className="news-footer">
          <span>{publishedTime}</span>

          <a href={article.url} target="_blank" rel="noreferrer">
            Read More →
          </a>
        </div>
      </div>
    </article>
  );
}

export default NewsCard;