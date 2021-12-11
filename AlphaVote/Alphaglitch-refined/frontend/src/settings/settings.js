import "../styles/settings.css";
import Toggle from "../components/Toggle";
import { useSelector } from "react-redux";

const Participate = () => {
  const darkTheme = useSelector((state) => state.status.darkTheme);

  return (
    <>
      <div className="settings">
        <div className="settings_inn">
          <div className="settings_hd">
            <p>Settings</p>
          </div>
          {/*  */}

          <ul className="mn_l1">
            <li>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://github.com/ChoiceCoin/White_Paper"
              >
                <i className="uil uil-newspaper"></i> White Paper
              </a>
            </li>
            <li>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://choice-coin.gitbook.io/choice-coin-docs/getting-started/introduction"
              >
                <i className="uil uil-book-alt"></i> Docs
              </a>
            </li>
            <li>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://medium.com/@ChoiceCoin"
              >
                <i className="uil uil-document-layout-center"></i>Our Blog
              </a>
            </li>
          </ul>

          <ul className="mn_l2">
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

          <div className="toggleDarkTheme">
            <div className="togglyButt">
              <p>{darkTheme ? "Light Theme" : "Dark Theme"}</p>
              <div className="theme_tog">
                <Toggle darkTheme={darkTheme} />
              </div>
            </div>
          </div>

          {/*  */}
        </div>
      </div>
    </>
  );
};

export default Participate;
