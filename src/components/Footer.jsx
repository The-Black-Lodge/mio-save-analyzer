const Footer = () => {
  return (
    <footer className="footer">
      <span className="footer-text">
        © {new Date().getFullYear()} &nbsp;{" "}
        <a
          href="https://southpawgeek.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          J. A. Guerra
        </a>
      </span>
      <span className="footer-separator">·</span>
      <a
        className="footer-icon-link"
        href="https://github.com/The-Black-Lodge/mio-save-analyzer"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
      >
        <i className="fa-brands fa-github" />
      </a>
      <span className="footer-separator">·</span>
      <span className="footer-text">
        <a
          href="https://diatomravine.com/games"
          target="_blank"
          rel="noopener noreferrer"
        >
          Diatom Ravine
        </a>
      </span>
    </footer>
  )
}

export default Footer
