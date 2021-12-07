
import { useRouteMatch, Switch,Route } from "react-router-dom";
import { Code, Disclaimer, Features, RoadMap,Updated, Utility } from "../../containers";


import WhitepaperSidebar from "../../containers/Whitepaper/WhitepaperSidebar"




const Whitepaper = () => {
  const {path } = useRouteMatch()
  
    return (
      <div>
        <WhitepaperSidebar />
        <section className="home-section">
            <div className="text"> Dashboard </div>
        <Switch>
          <Route path={`${path}/code`} component={Code}/>
          <Route path={`${path}/utility`} component={Utility} />
          <Route path={`${path}/tokenomics`} component={Features} />
          <Route path={`${path}/roadMap`} component={RoadMap} />
          <Route path={`${path}/updated`} component={Updated} />
          <Route path={`${path}/disclaimer`} component={Disclaimer} />
        </Switch>
        </section>
      </div>
  )
}

export default Whitepaper


// {/* <Switch>
//   <Route path={`${path}/code`} component={Code} />
//   <Route path={`${path}/utility`} component={Utility} />
//   <Route path={`${path}/tokenomics`} component={Tokenomics} />
//   <Route path={`${path}/roadMap`} component={RoadMap} />
//   <Route path={`${path}/updated`} component={Updated} />
//   <Route path={`${path}/disclaimer`} component={Disclaimer} />
// </Switch> */}