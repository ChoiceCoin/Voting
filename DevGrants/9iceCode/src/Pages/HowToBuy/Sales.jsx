import Buy from "./Buy"

const Sales = () => {
    return (
        <>
  <div className="sales section__padding" id="features">
    <div className="sales__heading">
      <h1 className="gradient__text">Tokenomics</h1>
      <p>Kishu inu ASA is an Algorand Standard Asset built on the Algorand network November 7th,2021. </p>
    </div>
    <div className="sales__container">
      {steps.map(({title,text,image}, index) => (
        <Buy title={title} image={image} text={text} key={title + index} />
      ))}
    </div>
  </div>
  </>
    )
}

export default Sales

const steps =[
    {
        title:'Create an Algorand Wallet',
        text:'Kishu Asa is available on the Algorand. Buy ALGO on a centralised exchange ( Binance, FTX, Coinbase, Houbi, etc). You can also download to setup an Algorand wallet. Available are three options to get started.',
        image:'',
    },
    {
        title:'Send kishu Inu Asa to Algorand',
        text:'Acquire kishu Inu Asa through Algorand itself or transfer it to your Algorand wallet address from another wallet (e.g. Coinbase or Binance).',
        image:'',
    },
    
    {
        title:'Connect your wallet to tinyman',
        text:'You will need to opt-in Kishu Inu ASA in your Algorand wallet by adding the Asset ID 399288328 and also by opt-in directly from the tinyman app.',
        image:'',
    },
    {
        title:'Your now able to buy Kishu Inu ASA !!!',
        text:'Using Kishu Inu Asa Id:399288328.You can swap Kishu with algo or create your own liquidity pool!',
        image:''
    }
]

// const Note = "N.B turn off hide unverified on Tinyman and while searching for asset on the Algorand app wallet search in the unverified.And yeah we're working tirelessly to get verified."