import "../styles/founders.css";
import loadable from "@loadable/component";
const ScrollText = loadable(() => import("../components/ScrollText"));

const Founders = () => {
  return (
    <div className="founders">
      <ScrollText word={"Meet the Team"} />

      <div className="found_scr">
        <div className="founder_box">
          <div className="founder_img">
            <img src="./img/1.webp" alt="" />
          </div>
          <div className="founder_det">
            <p className="fo_name">Archie Chaudhury</p>
            <p className="fo_pos">Co Founder</p>
          </div>
        </div>
        <div className="founder_box">
          <div className="founder_img">
            <img src="./img/2.webp" alt="" />
          </div>
          <div className="founder_det">
            <p className="fo_name">Brian Haney</p>
            <p className="fo_pos">Co Founder</p>
          </div>
        </div>
        <div className="founder_box">
          <div className="founder_img">
            <img src="./img/3.webp" alt="" />
          </div>
          <div className="founder_det">
            <p className="fo_name">Oligbo Julie</p>
            <p className="fo_pos">Senior Dev</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Founders;
