// Importing selenium dependencies
import { Builder, By } from "selenium-webdriver";

// VAriables to store the addresses and the amounts
let Prices = [];
let From = [];

// At the time of writing my version of javascript does not have a top level await so this function is required
// The function enables us to use async, await
(async () => {

  // Building the driver we will use for and specifying the specific browser
  // in our case "Chrome"
 let driver = await new Builder().forBrowser("chrome").build();
  await driver.get(
    "https://algoexplorer.io/address/25S2YKMG2E3L5RTFI67NTSWFJJQHBTDULAIN7TQVXWB3E4E5Y6BPG3O44I"
  );
  // Creating a delay to enable the page load before extracting the elements
      driver.manage().setTimeouts({ implicit: 0.5 });

  // Getting all the elements we need to execute our task
  let button = await driver.findElement(By.className("styles_next__NxHpD"));
  let prices = await driver.findElements(By.xpath("//tbody/tr/td[4]"));
  let locations = await driver.findElements(By.xpath("//tbody/tr/td[5]"));
  let txID = await driver.findElements(By.xpath("//tbody/tr/td[1]"));
  console.log(await txID[0].getText())
  let returnedText = await driver
    .findElement(By.className("styles_pagination-container__i_fkI"))
    .getText();
  const num = returnedText.slice(3, returnedText.length);
  const addToArrays = () => {
    for (let price of prices) {
      Prices = [...Prices, price];
    }
    for (let location of locations) {
      From = [...From, location];
    }
  };
  // @ts-ignore
  let i = 0;
  const recursiveCheck = async () => {
    // @ts-ignore
    let tx = await driver.findElements(
      By.xpath("//tbody/tr/td[1]")
    );
    if(i>1000){
      driver.quit()
      i=0
      return 
    }
    console.log(await tx[0].getText())
    if (
      (await txID[0].getText()) ==
      (await tx[0].getText())
    ) {
      console.log(await txID[0].getText());
      button.click();
      i++
      return recursiveCheck();
    }
    
      console.log("Base case Reached");
     return txID = tx;
    
    console.log("recursion");
  };

  for (let i = 0; i < Number(num); i++) {
    try {
      addToArrays(prices, locations);
      // console.log(await locations[0].getText());
      await recursiveCheck();
      await button.click();
      if(i === Number(num)-1){
        driver.quit()
      }
      console.log("Helllo");
    } catch (error) {
      console.error(error)
    }
  }
})();
