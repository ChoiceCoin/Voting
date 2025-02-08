import styles from "./styles/App.module.css"
import { Link } from "react-router-dom";
import Header from "./components/Header"
import { Footer } from "./components/footer";
import  Rewards from "./components/rewards";


function App() {
  return (
    <div className="App">
      <Header />
      <main className={` ${styles.main} space-y-6`}>
        <h1 className={`mt-8 text-4xl text-center`}>
          Welcome to <a>Choice Rewards Page </a>
        </h1>
        <div>
          <h2 className={`${styles.description}`}>
            Get Started Rewarding Members of the DAO
          </h2>
            <Link to={"/reward"}>
              <div className={styles.link}>Here</div>
          </Link>
        </div>
      </main>
      {/* <Rewards />
      <Footer /> */}
    </div>
  );
}

export default App;
