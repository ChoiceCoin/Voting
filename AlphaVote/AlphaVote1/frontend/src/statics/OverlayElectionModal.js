import { useSelector, useDispatch } from "react-redux";
import { URL } from "../constants";
import axios from "axios";

const OverlayElectionModal = () => {
  const dispatch = useDispatch();

  const walletAddress = localStorage.getItem("address");

  const { openElectModal, modalData } = useSelector(
    (state) => state.status.electModal
  );

  const startElection = () => {
    const headers = {
      "X-Wallet-Address": walletAddress,
    };

    axios
      .post(`${URL}/elections/${modalData.slug}/start`, null, { headers })
      .then((response) => alert(response.data.message))
      .catch((err) => {
        console.log(err);
        alert("An error occured while starting election");
      });
  };

  const endElection = () => {
    const headers = {
      "X-Wallet-Address": walletAddress,
    };

    axios
      .post(`${URL}/elections/${modalData.slug}/end`, null, { headers })
      .then((response) => alert(response.data.message))
      .catch((err) => {
        console.log(err);
        alert("An error occured while ending election");
      });
  };

  return (
    modalData && (
      <div
        className="modal_cov"
        style={{ display: `${!!openElectModal ? "flex" : "none"}` }}
      >
        <div className="modal_cont">
          <div className="modal_r1">
            <div className="modal_elt_img">
              <img src={modalData.process_image} alt="" />
            </div>
            <div className="modal_elt_tit">{modalData.title}</div>
          </div>

          <div className="modal_elt_desc">{modalData.description}</div>

          {/*  */}

          <div className="modal_cand">
            <div className="modal_cand_hd">Candidates</div>

            <ul className="modal_cand_list">
              {modalData.candidates?.map((item) => (
                <li className="cand_item">
                  <div className="cand_img_cont">
                    {!!item.image ? (
                      <img src={item.image} alt="" />
                    ) : (
                      <i
                        className="uil uil-asterisk"
                        style={{ fontSize: "16px" }}
                      ></i>
                    )}
                  </div>
                  <p className="cand_det">{item.name}</p>
                </li>
              ))}
            </ul>

            <div className="modal_butts">
              <button onClick={startElection}>Start Election</button>
              <button onClick={endElection}>End Election</button>
            </div>
          </div>
        </div>

        <div
          className="close_modal"
          onClick={() => dispatch({ type: "closePopupElection" })}
        >
          Go Back
        </div>
      </div>
    )
  );
};

export default OverlayElectionModal;
