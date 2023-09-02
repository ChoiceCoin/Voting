import Voting from "./Voting";
import Landing from "./Landing";
import Roadmap from "./Roadmap";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Faq from "./Faq";
import $ from "jquery";

function App() {
  return (
    <>
      <menu>
        <div
          class="menu_logo"
          onClick={() => {
            $("menu").css({ "-webkit-transform": "translate(100%,0px)" });
            $("body").css({ overflowY: "scroll" });
            $("#main_main").css({ "-webkit-filter": "blur(0px)" });
          }}
        >
          <img src="./choice2.png" alt="" />
        </div>
        <div
          class="menu_close"
          onClick={() => {
            $("menu").css({ "-webkit-transform": "translate(100%,0px)" });
            $("body").css({ overflowY: "scroll" });
            $("#main_main").css({ "-webkit-filter": "blur(0px)" });
          }}
        >
          <i class="uil uil-times"></i>
        </div>
        <ul class="menu_hor">
          <li>
            <i className="uil uil-asterisk"></i> Participate
          </li>
          <li>
            <i className="uil uil-asterisk"></i> Manage voting
          </li>
          <li>
            <i className="uil uil-asterisk"></i> Login | Sign up
          </li>
          <li>
            <i className="uil uil-asterisk"></i> About Choice coin
          </li>
          <li>
            <i className="uil uil-asterisk"></i> About Fortior
          </li>
        </ul>

        <ul className="menu_soc">
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
      </menu>

      <main id="main_main">
        <Navbar />

        <div className="content">
          <Landing />
          <Voting />
          <Roadmap />
          <Faq />
        </div>
        <Footer />
      </main>
    </>
  );
}

export default App;
