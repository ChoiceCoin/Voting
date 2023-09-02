import { useState } from "react";
import "./Voting.css";

const Voting = () => {
  const he = 150;

  const [page, setpage] = useState(1.9);

  const [items, setitems] = useState([]);

  const [itemInp, setItemInp] = useState("");

  const addItem = () => {
    if (itemInp.trim().length > 2 && !items.includes(itemInp)) {
      setitems((prev) => [...prev, itemInp]);
      setItemInp("");
    }
    return;
  };

  const removeItem = (item) => {
    setitems(items?.filter((it) => it !== item));
  };

  return (
    <>
      <div className="voting_cont">
        {/*  */}

        <div className="voting_inn">
          <div className="vtg v1">
            <div className="v1_inn" style={{ height: `${he}px` }}>
              <div className="line_wrapper">
                <div
                  className="actual_line"
                  style={{ marginTop: `${(-he / 2) * page}px` }}
                ></div>
              </div>

              <ul className="anchor_list">
                <li className="" onClick={() => setpage(1.9)}>
                  <span className="ball"></span>
                  <p className="anc_capt">Create Election form</p>
                </li>
                <li className="" onClick={() => setpage(1)}>
                  <span className="ball"></span>
                  <p className="anc_capt">Manage Voting process</p>
                </li>
                <li className="" onClick={() => setpage(0)}>
                  <span className="ball"></span>
                  <p className="anc_capt">Particpate in voting process</p>
                </li>
              </ul>
            </div>
          </div>

          <div className="vtg v2">
            <div
              className="vot_scroll"
              style={{
                marginLeft: `${page === 1.9 ? 0 : page === 1 ? -150 : -300}%`,
              }}
            >
              <div className="vot_scroll_sect">
                <div className="hd_sect">
                  <p className="hd_txt">Create Election Form</p>
                  <p className="hd_sub">
                    Here you can create an election form to start a new voting
                    process
                  </p>
                </div>
                <div className="vot_sect">
                  <div className="for_r1">
                    <div className="inpCont">
                      <p className="ttl">Title</p>
                      <input type="text" placeholder="Best cryptocurrency" />
                    </div>
                    <div className="inpCont">
                      <p className="ttl">
                        <i className="uil uil-keyhole-circle"></i>{" "}
                        Administrative key
                      </p>
                      <input
                        type="text"
                        placeholder="Your administrative key here..."
                      />
                    </div>
                  </div>

                  <div className="inpCont inpCont_cand">
                    <p className="ttl">Candidates</p>
                    <div className="add_item_sect">
                      <input
                        type="text"
                        placeholder="Choice Coin"
                        value={itemInp}
                        onChange={(e) => setItemInp(e.target.value)}
                      />
                      <div className="add_butt" onClick={() => addItem()}>
                        <div>
                          <i className="uil uil-plus"></i>
                        </div>
                        <p>Add</p>
                      </div>
                    </div>
                    <p className="ensure_txt">
                      Entries must be of minimum length of three(3)
                    </p>
                  </div>

                  {items?.map((item) => (
                    <div className="item_list">
                      <p>{item}</p>
                      <div className="rm_butt" onClick={() => removeItem(item)}>
                        Remove Item
                      </div>
                    </div>
                  ))}

                  <div className="inpCont inpCont_full">
                    <p className="ttl">Escrow Address</p>
                    <input
                      type="text"
                      placeholder="GHUHJJc351155C80aCD043BD5F8FE7ffc8536af1fF9375"
                    />
                    <p className="ensure_txt">
                      Please ensure you're already opted in to Choice Coin.
                      Minimum of 800 CHOICE
                    </p>
                  </div>

                  <div className="inpCont inpCont_full">
                    <p className="ttl">Escrow Mnemonics</p>
                    <input
                      type="text"
                      placeholder="fire water make glue hunter"
                    />
                  </div>

                  <div className="buttCont">
                    <button>Create Election</button>
                    <p className="safety">
                      <span>Safety disclaimer :</span> We never store your data.
                      Everything is encrypted.
                    </p>
                  </div>
                </div>
              </div>

              <div className="vot_scroll_sect">
                <div className="hd_sect">
                  <p className="hd_txt">Manage Your Elections</p>
                  <p className="hd_sub">
                    A list of elections processes you initiated
                  </p>
                </div>

                <div className="vot_sect">
                  <div className="list_elect_hd">
                    <div>Title</div>
                    <div>Actions</div>
                  </div>
                  <ul className="list_elect">
                    {[
                      "Best Cryptocurrency",
                      "US Elections",
                      "Tech University",
                      "Most Useful Fruit",
                    ].map((item, index) => {
                      return (
                        <li key={`${index}`}>
                          <p style={{ flex: 1 }}>{item}</p>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              minWidth: "35%",
                            }}
                          >
                            <div className="act_butt">
                              <p>Start election</p>
                            </div>
                            <div className="act_butt act_butt_2">
                              <p>End</p>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>

                  <div className="buttCont">
                    <button>Create New Election</button>
                  </div>
                </div>
              </div>

              <div className="vot_scroll_sect">
                <div className="hd_sect">
                  <p className="hd_txt">Currently Open Elections</p>
                  <p className="hd_sub">
                    A list of active election processes you can participate in
                  </p>
                </div>

                <div className="vot_sect">
                  <div className="list_elect_hd">
                    <div>Title</div>
                    <div>Actions</div>
                  </div>
                  <ul className="list_elect">
                    {[
                      "Best Cryptocurrency",
                      "US Elections",
                      "Tech University",
                      "Most Useful Fruit",
                    ].map((item, index) => {
                      return (
                        <li key={`${index}`}>
                          <p style={{ flex: 1 }}>{item}</p>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              minWidth: "35%",
                            }}
                          >
                            <div className="act_butt">
                              <p>Vote</p>
                            </div>
                            <div className="act_butt act_butt_2">
                              <p>View Result</p>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>

            <ul className="anchor_2">
              <li
                className=""
                onClick={() => setpage(1.9)}
                style={{ display: `${page === 1.9 ? "none" : "flex"}` }}
              >
                Create Election form
              </li>
              <li
                className=""
                onClick={() => setpage(1)}
                style={{ display: `${page === 1 ? "none" : "flex"}` }}
              >
                Manage Voting
              </li>
              <li
                className=""
                onClick={() => setpage(0)}
                style={{ display: `${page === 0 ? "none" : "flex"}` }}
              >
                Particpate
              </li>
            </ul>
          </div>

          {/*  */}
        </div>
      </div>
    </>
  );
};

export default Voting;
