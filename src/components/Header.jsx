function Header() {
  return (
    <header className="site-header">
      <div className="container header-content">
        <a href="/" className="logo">
          FOOTY<span>VERSE</span>
        </a>

        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#news">News</a>
          <a href="#about">About</a>
        </nav>

        <div className="live-badge">
          <span></span>
          LIVE
        </div>
      </div>
    </header>
  );
}

export default Header;