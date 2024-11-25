function Footer() {
  return (
    <div id="Footer" className="Footer">
      <span>© Nithin Subhash Nadella</span>
      <div className="social-container">
        <a
          href="https://www.linkedin.com/in/nithin-nadella"
          target="_blank"
          style={{ display: "flex" }}
        >
          <img src="assets/linkedin.png" className="social-icons" />
        </a>
        <a
          href="https://github.com/nadellanithin"
          target="_blank"
          style={{ display: "flex" }}
        >
          <img src="assets/github.png" className="social-icons" />
        </a>
        <a
          href="mailto:nithinsubhashnadella@gmail.com"
          target="_blank"
          style={{ display: "flex" }}
        >
          <img src="assets/gmail.png" className="social-icons" />
        </a>
        <a
          href="https://x.com/home"
          target="_blank"
          style={{ display: "flex" }}
        >
          <img src="assets/twitter.png" className="social-icons" />
        </a>
      </div>
    </div>
  );
}

export default Footer;
