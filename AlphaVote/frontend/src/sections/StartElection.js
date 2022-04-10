import axios from "axios";
import "../styles/startelect.css";
import { URL } from "../constants";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const StartElection = () => {
  // wallet-type & address
  const walletAddress = localStorage.getItem("address");

  const headers = { "X-Wallet-Address": walletAddress };
  const [myData, setMyData] = useState([]);

  const { isLoading, error } = useQuery("elections", () => {
    if (walletAddress) {
      axios.get(`${URL}/elections/mine`, { headers }).then((response) => {
        setMyData(response.data.data);
        return response.data;
      });
    } else {
      return null;
    }
  });

  const isWalletConnected =
    localStorage.getItem("wallet-type") === null ? false : true;
  const dispatch = useDispatch();

  if (isLoading) return <></>;

  if (error) return console.log("An error has occurred: " + error?.message);

  return (
    <div className="stt_elt">
      <div className="stt_elt_inn">
        <div className="stt_hd">Recently Created Elections</div>

        <ul className="on_elt">
          {!!(myData.length > 0) ? (
            myData?.map((item, index) => {
              return (
                <li
                  key={`${index}`}
                  className="elt_item"
                  onClick={() =>
                    dispatch({ type: "popupElection", payload: item })
                  }
                >
                  <div className="elt_img_cont">
                    <img src={item.process_image} alt="" />
                  </div>
                  <div className="elt_det">
                    <p className="e_det_main">{`${item.title}`}</p>
                    <p className="e_det_sub">{`${
                      !!item.description
                        ? item.description
                        : "No description provided"
                    }`}</p>
                  </div>
                  <div className="pop_butt">
                    <i className="uil uil-ellipsis-v"></i>
                  </div>
                </li>
              );
            })
          ) : (
            <>
              <div
                style={{
                  flex: 1,
                  opacity: 0.7,
                  width: "100%",
                  display: "flex",
                  fontSize: "14px",
                  color: "var(--wht)",
                  letterSpacing: "1px",
                  alignItems: "center",
                  padding: "10px 20px",
                  textAlign: "center",
                  justifyContent: "center",
                  textTransform: "uppercase",
                }}
              >
                <p style={{ lineHeight: "20px" }}>
                  Your Elections are displayed here once you connect your wallet
                </p>
              </div>
            </>
          )}
        </ul>

        <div
          style={{
            display: "flex",
            width: "100%",
            margin: "20px 0px 30px",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <i className="uil uil-arrow-break"></i>
        </div>

        <div className="stt_hd">do any of the following</div>
        <div className="create_elect">
          {
            // If Wallet is connected this would be true
            !!isWalletConnected ? (
              <NavLink
                style={{
                  width: "100%",
                  height: "100%",
                  textAlign: "center",
                  cursor: "pointer",
                }}
                to={`./create`}
                key={"create"}
              >
                Create New Election
              </NavLink>
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  textAlign: "center",
                  cursor: "pointer",
                }}
                onClick={() => {
                  dispatch({ type: "modal_connect" });
                }}
              >
                Create New Election
              </div>
            )
          }
        </div>
        <div className="participate_elt">
          <NavLink
            style={{ width: "100%", height: "100%", textAlign: "center" }}
            to={`../participate`}
            key={"participate"}
          >
            Participate In Election
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default StartElection;
