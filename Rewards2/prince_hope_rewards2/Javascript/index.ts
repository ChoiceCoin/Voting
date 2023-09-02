import { Builder, Button, By, WebDriver } from "selenium-webdriver";
import { Driver } from "selenium-webdriver/chrome";

let amounts: Array<string> = [];
let addresses: Array<string> = [];
let driver;

(async () => {
  driver = await new Builder().forBrowser("chrome").build();
  await driver.get(
    "https://algoexplorer.io/address/EJNUC2EMTEZTPWJH6ZYOGQKHJBKHAZGSDEJZO4QHRO26RQWHW2ZTYHX4A4"
  );
  // @ts-ignore
  let button = await driver.findElement(By.className("styles_next__NxHpD"));
  let prices = await driver.findElements(By.xpath("//tbody/tr/td[4]"));
  let locations = await driver.findElements(By.xpath("//tbody/tr/td[5]"));
//   @-ts-ignore
  let returnedText: string = await driver.findElement( By.className("styles_pagination-container__i_fkI")).text;
  const num = returnedText.slice(3, returnedText.length - 1);
  console.log(num);

//   console.log(prices);
})();
  // @ts-ignore
const addToArrays = (_prices, _locations) => {
  for (let price of _prices) {
    amounts = [...amounts, price];
  }
  for (let location of _locations) {
    addresses = [...addresses, location];
  }
};
  // @ts-ignore
const recursiveCheck = async (addresses, driver: WebDriver, Button) => {
  // @ts-ignore
  let addressValue = await driver.findElements(By.xpath("//tbody/tr/td[5]"))[0];
  if (addresses[0].text === addressValue) {
    Button.click();
    recursiveCheck(addresses, driver, Button);
  } else {
    console.log("Base case Reached");
    addresses = addressValue;
  }
};
