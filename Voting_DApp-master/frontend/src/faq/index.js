import $ from "jquery";
import "../styles/faq.css";

const Faq = () => {
  return (
    <div className="faq_cont">
    <div className="faq_cont_inn">
      <div className="faq_hd">
        <p>
          <i class="uil uil-question-circle"></i> Frequently Asked Questions
        </p>
      </div>

      {[
        {
          que: "What is Choice Coin?",
          ans: "Choice Coin is the governance token for the Choice Coin DAO. Holders of Choice Coin can vote on various issues within the Choice Coin DAO by committing their Choice Coin during Goverance.",
        },
        {
          que: "What is the Choice Coin DAO?",
          ans: "The Choice Coin DAO is a Decentralized Autonomous Organization working to make decentralized voting a reality. The Choice Coin DAO hopes to bring voting to the Algorand Blockchain by allocating the Choice Coin asset to open-source software development, awareness campaigns, and more. Join the Choice Coin Discord to learn more.",
        },
        {
          que: "Where can I buy Choice Coin?",
          ans: "Choice Coin is currently available on TinyMan, an automatic market maker (AMM) on Algorand.",
        },
        {
          que: "What is Algorand?",
          ans: "Algorand is a blockchain-based cryptocurrency platform that aims to be secure, scalable, and decentralized. The Algorand platform supports smart contract functionality, and its consensus algorithm is based on proof-of-stake principles and a Byzantine Agreement protocol. Algorand's native cryptocurrency is called Algo.",
        },
      ].map((item) => (
        <div className="collap_cov">
          <button
            className="collapsible"
            onClick={(e) => {
              $(e.target).toggleClass("colap_active");

              var content = $(e.target)
                .closest(".collap_cov")
                .find(".collap_cont");

              if (!!content.height()) {
                content.css({
                  maxHeight: "0px",
                });
              } else {
                content.css({
                  maxHeight: content.get(0).scrollHeight + "px",
                });
              }
            }}
          >
            <p>{item.que}</p>
          </button>
          <div className="collap_cont">
            <p>{item.ans}</p>
          </div>
        </div>
      ))}

      <div className="ask_q_sect">
        <button className="ask_que">
          <p>
            <a href = "https://discord.gg/YNAbfB4WEy">Ask a question or contribute by joining our Discord</a>{" "}
            <i class="uil uil-arrow-up-right"></i>
          </p>
        </button>
      </div>
    </div>
  </div>
);
};

export default Faq;
