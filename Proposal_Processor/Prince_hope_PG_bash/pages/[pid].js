import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import { useGlobalContext } from "../components/context";
import Vote from "../components/pages/vote";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";

const Post = () => {
  const [loading, setLoading] = useState(null);
  const { propsObj, setPropsObj } = useGlobalContext();
  const router = useRouter();
  const { pid } = router.query;
 

  useEffect(() => {
    let storage = localStorage.getItem("proposals");
    if (!storage) {
      localStorage.setItem("proposals", JSON.stringify(Obj));
      storage = localStorage.getItem("proposals");
    }
    if (!propsObj) {
      setPropsObj(JSON.parse(storage));
    }
    setLoading(true);
  }, [loading]);
  return (
    <div className={styles.container}>
      <Head>
        <title>Proposal {pid}</title>
        <meta
          name="description"
          content="This Page Contains a Proposal for Coin Voting Platform"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        {propsObj
          ?.filter(({ id }) => {
            return id == pid && id;
          })
          .map((item, index) => {
            if (!loading) {
              return (
                <div
                  key={index}
                  className="bg-indigo-500 text-gray-50 text-2xl flex align-center transition-all delay-150"
                >
                  <AiOutlineLoading3Quarters className="animate-spin text-gray-50" />
                  Loading...
                </div>
              );
            } else if (item) {
              return (
                <div key={index}>
                  {" "}
                  <Vote {...item}>
                    <Link href="/">
                      <a className="text-3xl animate-bounce absolute left-2 top-3 cursor-pointer">
                        &larr;
                      </a>
                    </Link>
                  </Vote>
                </div>
              );
            } else {
              return <>error</>;
            }
          })}
      </main>{" "}
    </div>
  );
};
export default Post;
