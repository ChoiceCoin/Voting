import { React} from "react";
import { Container, } from "react-bootstrap";
  import { Chrono } from "react-chrono";
import styled from "styled-components"

const HeaderText = styled.div`
    color: var(--section-color);
    padding: 0 50px;
    font-family: 'Montserrat', sans-serif;
    font-family: 'Open Sans', sans-serif;
    font-family: 'Roboto', sans-serif; 
    font-family: 'Pacifico', cursive;
    // font-family: 'Rubik', sans-serif;
    font-size: 1.5em;
    text-decoration: overline;
`

function SectionFour(params) {
    const items = [{
      title: "Q4 2021",
      cardTitle: "Exchange Availablity and Listing",
      cardSubtitle:"The Choice Coin Network plans to attach a price to its native token, CHOICE, by the end of Q3 2021",
      cardDetailedText: "The Choice Coin Network plans to attach a price to its native token, CHOICE, by the end of Q3 2021. This will most likely be done through a decentralized exchange on the Algorand Blockchain such as Tinyman or AlgoDex. Choice Coin's inital liquidity pool will be with ALGO, allowing members of both communities to seamlessly trade between the two assets. With Tinyman launching by the end of Q3 2021, the Choice Coin Community is excited to have another aveneue to promote Choice, Decentralized Voting, and Democracy.",
      // media: {
      //   type: "IMAGE",
      //   source: {
      //     url: "http://someurl/image.jpg"
      //   }
      // }
    }, 
    {
        title: "Q1 2022",
        cardTitle: "Choice Charities",
        cardSubtitle:"The Choice Coin Network plans to launch Choice Charities, a charity hosted by Fortior Blockchain.",
        cardDetailedText: "The Choice Coin Network plans to launch Choice Charities, a charity hosted by Fortior Blockchain, for its native token. The goal of Choice Charities will be to identify charities and non-profit organizations that engage in democratic and equitable practices. Choice Coin holders will be able to use Choice to vote for Choice charitable contributions.",
        // media: {
        //   type: "IMAGE",
        //   source: {
        //     url: "http://someurl/image.jpg"
        //   }
        // }
      }, 
      {
        title: "Q2 2022",
        cardTitle: "Voting Application",
        cardSubtitle:"The Choice Coin Network plans to launch a full-stack voting application by the end of Q1 2022.",
        cardDetailedText: "The Choice Coin Network plans to launch a full-stack voting application by the end of Q1 2022. This application will be an update over the current Fortior Voting Protocol developed by Fortior Blockchain, and will be live. It will allow any organization across the world to vote using Choice Coin and the Choice Coin Network. The launch of this interactive platform will enable Choice Coin to be used more widely for its use-case and spread decentralized voting as a legitimate form of governance.",
        // media: {
        //   type: "IMAGE",
        //   source: {
        //     // url: "http://someurl/image.jpg"
        //   }
        // }
      }, 
      {
        title: "Ongoing",
        cardTitle: "Ongoing",
        cardSubtitle:"The Choice Coin Network plans to attach a price to its native token, CHOICE, by the end of Q3 2021",
        cardDetailedText: "TThe Choice Coin Network plans to continue allocating resources and assets to its rewards programs. These rewards programs have been extremely effective over the past two months, with the network growing at an exponential rate with regards to academic output, social media presence, and development. The Choice Coin Community remains keen on growing its membership in the months to come.",
        // media: {
        //   type: "IMAGE",
        //   source: {
        //     // url: "http://someurl/image.jpg"
        //   }
        // }
      }, 
];

    return(
        <div id="section-four">
                <Container>
                    <HeaderText>Roadmap</HeaderText>
                    <Chrono items={items} />
                </Container>
        </div>
    )
}

export default SectionFour