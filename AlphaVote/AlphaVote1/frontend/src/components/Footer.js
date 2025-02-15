import "../styles/footer.css";
import loadable from "@loadable/component";
const ScrollText = loadable(() => import("./ScrollText"));

const Footer = () => {
  <ScrollText />;

  return (
    <footer className="hm_ft">
      <ScrollText word={"Join our Community"} />
      <div className="ft_cont">
        <div className="ft_hdr">
          <div className="ft_hfr_1">
            <p>
              Join our rapidly <br /> growing community
              {/* Become one <br /> of the lazy ones! */}
            </p>
            <p>
              The Choice Coin community is rapidly expanding thanks to our
              engagement and incentive programs. As this open-source project
              continues to grow, we look forward to building the new age of
              decentralized governance.
              <br />
              <br />
              Learn more about Choice Coin by checking out our Github Repos,
              social media handles, official blog, and documentation below.
            </p>
          </div>
        </div>

        <div className="ft_inn">
          <div className="ft_r1">
            <p className="get_inv">Get Involved</p>
            <ul>
              <li>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://mobile.twitter.com/ChoiceCoinNews"
                >
                  <i className="uil uil-twitter"></i> <p>Twitter</p>
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://t.me/choicecoin"
                >
                  <i className="uil uil-telegram"></i> <p>Telegram</p>
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://medium.com/@ChoiceCoin"
                >
                  <i className="uil uil-medium-m"></i> <p>Medium</p>
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://discord.gg/9WpzukzH"
                >
                  <i className="uil uil-discord"></i> <p>Discord</p>
                </a>
              </li>
            </ul>

            <ul>
              <li>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://github.com/ChoiceCoin/White_Paper"
                >
                  White Paper
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://choice-coin.gitbook.io/choice-coin-docs/getting-started/introduction"
                >
                  Docs
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://medium.com/@ChoiceCoin"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>

          <div className="ft_r2"></div>

          <div className="ft_r3">
            <p>2021, All Rights Reserved</p>
            <ul>
              <li>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://medium.com/@ChoiceCoin"
                >
                  Privacy
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://medium.com/@ChoiceCoin"
                >
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
