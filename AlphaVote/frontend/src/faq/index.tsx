import "./faq.css";
import QuestionItem from "./QuestionItem";

const Faq = () => {
  const faqList = [
    {
      que: "What was $CHOICE built for?",
      ans: "Choice Coin is a governance token and open source software for decentralized voting. The Choice Coin Network is prioritizing democracy, and will incentivize its participants to help it fundamentally change how decisions are made on a large scale. Choice Coin solves the decentralized voting problem by introducing a digital asset for voting on a distributed ledger.",
    },
    {
      que: "How can I get $CHOICE?",
      ans: "Choice Coin is now available on TinyMan! TinyMan is a Decentralized Exchange and Automated Market Maker operating on the Algorand Blockchain. It allows individuals to swap various ASAs for one another.  Get Choice Coin on https://tinyman.org/ today! ",
    },
    {
      que: " What's Choice Coin Liquidity Program?",
      ans: "As a way to incentivize additional participation within the ecosystem, the Choice Coin Network is glad to announce its a Liquidity Rewards Program. This program will help grow Choice Coin on the TinyMan DEX. Specifc insturctions follow. Add liquidity for Choice Coin with either ALGO or any of the top 10 ASAs on https://app.tinyman.org/#/pool. ",
    },
    {
      que: " About Algorand",
      ans: "Algorand is a blockchain-based cryptocurrency platform that aims to be secure, scalable, and decentralized. The Algorand platform supports smart contract functionality, and its consensus algorithm is based on proof-of-stake principles and a Byzantine Agreement protocol. Algorand's native cryptocurrency is called Algo.",
    },
  ];

  return (
    <div className="faq_cont">
      <div className="faq_cont_inn">
        <div className="faq_hd">
          <p>
            <i className="uil uil-question-circle"></i> Frequently Asked
            Questions
          </p>
        </div>

        {faqList.map((item) => (
          <QuestionItem item={item} key={item.que} />
        ))}

        <div className="ask_q_sect">
          <button className="ask_que">
            <p>
              Ask a question or contribute{" "}
              <i className="uil uil-arrow-up-right"></i>
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Faq;
