import Donate from '../../components/feature/Feature';

const Donation = () => {
    return (
    <div className=" section__margin">
       <div className="gpt3__blog-heading">
      <h1 className="gradient__text">Want to donate ?</h1>
    </div> 
        <div className="gpt3__whatgpt3">

        <div className="gpt3__whatgpt3-feature">
            <Donate title='Want to donate?' text='As a community based project, Choice Coin runs thanks to its amazing volunteers and generous donors.'/>
        </div>

        <div className="gpt3__whatgpt3-heading">
            <p>If you would like to pitch in, use the official ALGO donation wallet or the qrcode.</p>
        </div>

        <div className="gpt3__whatgpt3-container" >
            <Donate title='Wallet Address' text='ZWSQPM4Y4TNFOAUOQ4LIKX23MGBUBNVWXBXPWNIMIHIRF2BSBTFTZZCDNQ'/>
            <Donate title='Qrcode' />
        </div>
        </div>

    </div>
)
}
    
export default Donation