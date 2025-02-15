import { React } from "react";
import styled from "styled-components"
import blob1 from "../../assets/blob/blob.svg"
import blob2 from "../../assets/blob/blob(20).svg"
import blob3 from "../../assets/blob/blob(14).svg"
import blob4 from "../../assets/blob/blob(15).svg"
import blob5 from "../../assets/blob/blob(16).svg"
import blob6 from "../../assets/blob/blob(19).svg"
import blob7 from "../../assets/blob/blob(21).svg"
import blob8 from "../../assets/blob/blob(2).svg"



function BackgroundBlob(params) {
    return( (
        <div>
            <div>
            <img src={blob1} alt="Header Blob"
                style={{
                    width:"5%",
                    position:"fixed",
                    top:"5vw",
                    left:"5vw",
                    zIndex:"10",
                    opacity:"0.5"
                }}
                />
                <img src={blob2} alt="Header Blob"
                style={{
                    width:"5%",
                    position:"fixed",
                    top:"5vw",
                    left:"5vw",
                    zIndex:"10",
                    opacity:"0.5"
                }}
                />
                <img src={blob3} alt="Header Blob"
                style={{
                    width:"10%",
                    position:"fixed",
                    top:"6vw",
                    left:"54vw",
                    zIndex:"10",
                    opacity:"0.1"
                }}
                />
                <img src={blob4} alt="Header Blob"
                style={{
                    width:"5%",
                    position:"fixed",
                    top:"15vw",
                    left:"90vw",
                    zIndex:"10",
                    opacity:"0.5"
                }}
                />

                <img src={blob6} alt="Header Blob"
                style={{
                    width:"5%",
                    position:"fixed",
                    top:"40vw",
                    left:"40vw",
                    zIndex:"10",
                    opacity:"1"
                }}
                />
            </div>
        </div>
    ))
}

 export default BackgroundBlob