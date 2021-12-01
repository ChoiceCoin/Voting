    import { React, } from "react";
    // import { Container, Row, Col } from "react-bootstrap";
    // import styled from "styled-components"
    import Footer from '../../components/footer';
    import Icon from '../../components/icons';
    import styled from "styled-components";
    import img from './twitter.svg'

    const SectionDiv = styled.div`


@keyframes reviewCardAnim1 {
  from {
    transform: translateX(-52%);
  }
  to {
    transform: translateX(0%);
  }
}

@keyframes reviewCardAnim2 {
  from {
    transform: translateX(0%);
  }
  to {
    transform: translateX(-52%);
  }
}
  
    .section-reviews__bg {
        background-color: #050810;
      }
      
      .section-reviews {
        grid-column: 1/15;
        display: grid;
        grid-template-columns: 1fr repeat(12, minmax(min-content, 10rem)) 1fr;
        padding: 8rem 0;
        transition: all 0.3s ease-in-out;
        .section-reviews__top {
          grid-column: 2/14;
          padding: 0 6rem;
      
          @media only screen and (max-width: 57em) {
            grid-column: 1/15;
          }
          @media only screen and (max-width: 45em) {
            padding: 0 4rem;
          }
      
          p {
            margin-top: 1.5rem;
            font-size: 20px;
            color: whitesmoke;

            span {
               color: #3EA39E;
               font-size: 30px;
               font-family: 'Pacifico',cursive;
            }
          }
        }
      
        .section-reviews__bottom {
          grid-column: 1/15;
          overflow-x: hidden;
          margin-top: 8rem;
          margin-bottom: 4rem;
          .section-reviews__bottom-wrapper {
            display: flex;
           justify-content: space-between;
          align-items: center;
            width: max-content;
            .review-card {
              background: #171e2f;
              border-radius: 2rem;
              padding: 3rem;
              margin: 1.5rem;
              /* @media screen and(max-width: 600px) and (min-width : 300px) {
                margin: 1em;
                height: 300px;
                width: 273px;
                } */

              .review-card__top {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 3rem;
              }
      
              
              .review-card__p {
                font-size: 0.8rem;
                text-transform: uppercase;
                line-height: 81.4%;
                letter-spacing: 0.25em;
                color: #585e6e;
              }
      
              .review-card__h3 {
                font-size: 1.9rem;
                line-height: 81.4%;
                letter-spacing: -0.01em;
                color: #585e6e;
                margin-top: 1.5rem;
                font-weight: 100;
              }
      
              .review-card__h2 {
                font-size: 2rem;
                line-height: 130.4%;
                color: whitesmoke;
                font-weight: 100;
              }
            }
          }
        }
      }
      
      .review-card__anim1 {
        animation: reviewCardAnim1 26s ease-in-out infinite alternate;
      
        &:hover {
          animation-play-state: paused;
        }
      }
      
      .review-card__anim2 {
        animation: reviewCardAnim2 26s ease-in-out infinite alternate;
        &:hover {
          animation-play-state: paused;
        } 
    }


 `


    function FooterSection(params) {
        const reviews = [
            {
              id: 0,
              name: "Green Rex",
              userName: "@GreenRex",
              reply: "Choice Coin is the Future..",
            },
            {
              id: 1,
              name: "Sieger ✨",
              userName: "@ichbinsieger",
              reply: "A decentralized voting platform 👍 💪",
            },
            {
              id: 2,
              name: "Oligbo Julie",
              userName: "@OligboJulie",
              reply: "Choose Choice Coin 🔥",
            },
            {
              id: 3,
              name: "Oluwatumise 🦍",
              userName: "@oluwatumise",
              reply: "The greater good👏",
            },
            {
              id: 4,
              name: "Aspirin",
              userName: "@aspirin",
              reply: "A governance token",
            },
            {
              id: 5,
              name: "Geraldine",
              userName: "@Geraldine",
              reply: "Open Source  🔥🔥",
            },
            {
              id: 6,
              name: "Flems ☘️",
              userName: "@Flems_aspirin",
              reply: "Up votes ❤️",
            },
            {
              id: 7,
              name: "John",
              userName: "@John",
              reply: "Decentralize 🚀🚀🚀...",
            },
            {
              id: 8,
              name: "🥷",
              userName: "@aladed",
              reply: "Whooooaaaaaaa,the future is here already",
            },
            {
              id: 9,
              name: "Green Rex🦅",
              userName: "@green_rex",
              reply: "It solves decentralized voting problem",
            },
            {
              id: 10,
              name: "Vicktoria🦄",
              userName: "@Victoria",
              reply: "🔥 Life is good with choice coin",
            },
            {
              id: 11,
              name: "Rex",
              userName: "@JohnRex",
              reply: "The future is now!",
            },
            {
              id: 12,
              name: "John shodipo",
              userName: "@shodipo",
              reply: "decentralized voting platform",
            },
          ]
        return (
            <div>
                 <Footer>
                <SectionDiv>
                 <div
                 className="section-reviews section-reviews__bg"
               >
                 <div className="section-reviews__top">
                   <p className="paragraph paragraph__sub">
                     What people are saying about <span> choice coin </span>
                   </p>
                 </div>
                 <div className="section-reviews__bottom">
                   <div className="section-reviews__bottom-wrapper review-card__anim1">
                     {reviews?.map((review) => (
                       <div key={review.id} className="review-card">
                         <div className="review-card__top">
                           <div className="review-card__top--left">
                             <p className="review-card__p">{review.name}</p>
                             <h3 className="review-card__h3">{review.userName}</h3>
                           </div>
                           <div className="review-card__top--right">
                             <img src={img} alt="twitter icon" />
                           </div>
                         </div>
                         <div className="review-card__bottom">
                           <h2 className="review-card__h2">{review.reply}</h2>
                         </div>
                       </div>
                     ))}
                   </div>
                   <div className="section-reviews__bottom-wrapper review-card__anim2">
                     {reviews?.sort().map((review) => (
                       <div key={review.id} className="review-card">
                         <div className="review-card__top">
                           <div className="review-card__top--left">
                             <p className="review-card__p">{review.name}</p>
                             <h3 className="review-card__h3">{review.userName}</h3>
                           </div>
                           <div className="review-card__top--right">
                             <img src={img} alt="twitter icon" />
                           </div>
                         </div>
                         <div className="review-card__bottom">
                           <h2 className="review-card__h2">{review.reply}</h2>
                         </div>
                       </div>
                     ))}
                   </div>
                   </div>
                   </div>
               </SectionDiv>
                    <Footer.Wrapper>
                    <Footer.Row>
                        <Footer.Column className="no-mobile">
                        <Footer.Title>About Us</Footer.Title>
                            <Footer.Link href="/about">About </Footer.Link>
                            <Footer.Link href="https://fortiorblockchain.com/">About Fortoir</Footer.Link>
                            <Footer.Link href="https://choice-coin.com/About.html">Choice Coin</Footer.Link>
                        </Footer.Column>
                        <Footer.Column className="mobile">
                        <Footer.Title>Development</Footer.Title>
                            {/* <Footer.Link href="https://choice-coin.com/participation.html">Participate</Footer.Link> */}
                            <Footer.Link href="https://choice-coin.com/documentation.html">Research</Footer.Link>
                            <Footer.Link href="https://choice-coin.gitbook.io/choice-coin-docs/">Docs</Footer.Link>
                        </Footer.Column>
                        <Footer.Column className="no-mobile">
                        <Footer.Title>See us at:</Footer.Title>
                            <Footer.Link href="https://medium.com/@ChoiceCoin">Blog</Footer.Link>
                            <Footer.Link href="https://choice-coin.com/">Website</Footer.Link>
                            <Footer.Link href="https://choice-coin.gitbook.io/choice-coin-docs/get-choice/tinyman">TinyMan</Footer.Link>
                        </Footer.Column>
                        <Footer.Column className="mobile">
                        <Footer.Title>Community</Footer.Title>
                            <Footer.Link href="https://discord.gg/7aenzkKzVt"><Icon className="fab fa-facebook-f" />Discord</Footer.Link>
                            {/* <Footer.Link href="https://github.com/ChoiceCoin/Choice-V1"><Icon className="fab fa-instagram" />Github</Footer.Link> */}
                            <Footer.Link href="https://medium.com/@ChoiceCoin"><Icon className="fab fa-youtube" />Medium</Footer.Link>
                            {/* <Footer.Link href="#"><Icon className="fab fa-twitter" />Reddit</Footer.Link> */}
                        </Footer.Column>
                    </Footer.Row>
                        <div style={{
                                color: "var(--paragraph)",
                                textAlign:"center",
                                width:"100%",
                                margin:"20px 0"
                            }}>
                                <h6>&copy; 2021 Choice Coin</h6><span style={{opacity:"0.75", fontSize:".9em"}}>All rights reserved.</span>
                            </div>
                    </Footer.Wrapper>
                </Footer>
            </div>
        )
    }

    export default FooterSection