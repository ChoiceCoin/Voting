import { React } from "react";
// import NavBar from "../../components/Navbar";
import SectionOne from "../../sections/sectionOne";
import SectionThree from "../../sections/sectionThree";
import SectionTwo from "../../sections/sectionTwo";
import FooterSection from "../../sections/footerSection";
import Headers from "../../sections/header";
import SectionFour from "../../sections/sectionFour";




function LandingPage(params) {
    return (
        <div>
            <div>
                <Headers />
                <SectionTwo />
                <SectionOne />
                <SectionThree />
                <SectionFour />
                <FooterSection />
            </div>
        </div>
    )    
}

export default LandingPage