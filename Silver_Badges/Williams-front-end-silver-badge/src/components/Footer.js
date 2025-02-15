import "../footer.css";
import ScrollText from "./ScrollText";

const Footer = () => {
  <ScrollText />;

  return (
    <footer>
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
          <div className="ft_hfr_2">
            <p className="f_txty">Donate $choices to our dev team.</p>
            <div className="ft_add">
              <p>0xc351155C80aCD043BD5F8FE7ffc....</p>
              <button>
                <i className="uil uil-copy"></i>&nbsp;Copy Address
              </button>
            </div>
          </div>
        </div>

        <ScrollText word={"Join our Community"} />

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
                  <i className="fa fa-twitter"></i> <p>Twitter</p>
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://medium.com/@ChoiceCoin"
                >
                  <i className="fa fa-instagram"></i> <p>Instagram</p>
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://medium.com/@ChoiceCoin"
                >
                  <i className="fa fa-medium"></i> <p>Medium</p>
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
            <p>
              2021, All Rights Reserved <br /> Designed by thealphaknight
            </p>
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
