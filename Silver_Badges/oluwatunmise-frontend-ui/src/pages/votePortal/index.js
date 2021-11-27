import { React } from "react";
import NavBar from "../../components/Navbar";
import FooterSection from "../../sections/footerSection";
import VoteDashboard from "../../sections/voteDashboard";

function Vote(params) {
    return (
        <div style={{
            // backgroundColor:"#3b4c5e"
            backgroundColor:"#fafafa",
        }}>
            <NavBar style={{backgroundColor:"#1F2933",}}/>
            <VoteDashboard />
            <FooterSection />
        </div>
    )
}

export default Vote