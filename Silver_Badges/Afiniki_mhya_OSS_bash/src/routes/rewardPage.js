import { useEffect } from "react";
import Header from "../components/Header";
import { useContextObject } from "../context";
import defaultArray from "../helpers/defaultArray";
import { useNavigate } from "react-router-dom";
import styles from "../styles/rewards.module.css"

export default function Proposals() {
  const router = useNavigate();
  const {
    handleMessagePopup,
    setObjectProperties,
    objectProperties,
    walletAddress,
    setWalletAddress,
    name,
    setName,
    discordID,
    setDiscordID,
    githubURL,
    setGithubURL,
    twitterHandle,
    setTwitterHandle,
  } = useContextObject();

  useEffect(() => {
    if (objectProperties) {
      localStorage.setItem("rewardsList", JSON.stringify(objectProperties));
    }
    console.log(objectProperties);
  }, [objectProperties]);

  useEffect(() => {
    let storage = localStorage.getItem("rewardsList");
    if (!storage) {
      localStorage.setItem("rewardsList", JSON.stringify(defaultArray));
      storage = localStorage.getItem("rewardsList");
    }
     setObjectProperties(JSON.parse(storage));
  }, []);

  const updateStorage = (_value) => {
    const alikeArray = objectProperties.filter((item) => {
      const { name, wallet_Address } = _value;
      return name == item.name && wallet_Address == item.wallet_Address;
    });
    console.log("Alike array:", alikeArray);
    if (alikeArray.length === 0) {
      setObjectProperties([_value, ...objectProperties]);
      setTimeout(
        () =>{ handleMessagePopup(true, "Successfully Updated Reward List", false)},
        500
      );
    } else {
      setTimeout(
        () => handleMessagePopup(true, "Unable to add Participant to Database", true),
        500
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateStorage({ name, discordID, githubURL, twitterHandle, walletAddress });
    router("/");
  };

  return (
    <>
      <Header />

      <section className={`${styles.reward}`}>
        <h1 className="">
          Add to Reward List
        </h1>
        <form
          className=""
          onSubmit={handleSubmit}
        >
          <span className="">
            Full Name:
            <input
              required
              onChange={(e) => setName(e.target.value)}
              placeholder="Last-Name Middle-Name First-Name"
              className=""
              type="text"
            />
          </span>
          <span className="">
            Discord ID :
            <input
              required
              onChange={(e) => setDiscordID(e.target.value)}
              placeholder="DiscordName#1234"
              className=""
              type="text"
            />
          </span>
          <span className="">
            GitHub URL:
            <input
              required
              onChange={(e) => setGithubURL(e.target.value)}
              placeholder="https://github.com/github_username"
              className=""
              type="url"
            />
          </span>
          <span className="flex gap-3 justify-between">
            Twitter Handle :
            <input
              required
              onChange={(e) => setTwitterHandle(e.target.value)}
              placeholder="@twitter_handle(optional)"
              className="p-1 leading-3 outline-none border-2  border-gray-500"
              type="text"
            />
          </span>
          <span className="flex gap-3 justify-between">
            Wallet Address :
            <input
              required
              onChange={(e) => setWalletAddress(e.target.value)}
              placeholder="kdjf3uhuiajh938herib94h4998h89asdj"
              className="p-1 leading-3 outline-none border-2  border-gray-500"
              type="text"
            />
          </span>

          <span className=" mt-4 pt-6 flex items-center justify-center">
            <input
              type="submit"
              value="Add Participant"
              className="border-2 border-gray-500 p-2 hover:shadow-lg shadow-black transition-shadow duration-200 ease-in-out cursor-pointer "
            />
          </span>
        </form>
      </section>
    </>
  );
}
