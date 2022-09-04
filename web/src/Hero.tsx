export const Hero = () => (
  <section className="hero is-info is-small">
    <div className="hero-body columns">
      <div className="column">
        <p className="title">Emotter</p>
        <p className="subtitle">post and share your emoji!</p>
      </div>
      <div className="column is-one-quarter" style={{ textAlign: "right" }}>
        <a
          className="button is-info is-inverted"
          href="https://github.com/syumai/emotter"
        >
          <span className="icon is-large">
            <i className="fab fa-github fa-2x"></i>
          </span>
        </a>
      </div>
    </div>
  </section>
);
