#!/usr/bin/env node

import { ArgumentParser } from "argparse";
import figlet from 'figlet';
import gradient from "gradient-string";
import { createSpinner } from "nanospinner";
import { stringify } from "csv-stringify";

import { Builder, By, until } from "selenium-webdriver";

import fs from 'fs';
import { exit } from "process";

const BANNER =  `
ALGO WEB SCRAPER
`
// Parse Arguments
const parseArgs = () => {
    const parser = new ArgumentParser({
        description: "Webscraper",
        add_help: true
    })

    parser.add_argument("-a", "--address", {help: "Specify wallet address", default: "25S2YKMG2E3L5RTFI67NTSWFJJQHBTDULAIN7TQVXWB3E4E5Y6BPG3O44I"})
    parser.add_argument("-s","--algoscan", {help: "Switches from the default scraper which is algoexplorer to algoscan", action: 'store_true'})
    return parser.parse_args();
}


// Selenium scraper class
class Scraper {
    constructor (option){
        this.address = option.address;
        this.driver = new Builder().forBrowser('chrome').build();
        this.records = []
    }
    close_browser() {
        this.driver.close();
        this.driver.quit();
    }
}


// AlgoScanScraper class for AlgoScan
class AlgoScanScraper extends Scraper {
    constructor (option){
        super(option)
        this.url = "https://algoscan.app/address/" + this.address;
    }
    // Scrapes data from each rows
    async get_rows() { 
        const tableRows = await this.driver.findElements(By.css('#__next > main > section.mt-4 > section > table > tbody > tr'))
        for (let row of tableRows){
            const from = await row.findElement(By.xpath('.//td[5]/a')).getText();
            const to = await row.findElement(By.xpath('.//td[7]/a')).getText();
            const amount = await row.findElement(By.xpath('.//td[8]')).getText();
            this.records.push({from: from, to: to, amount: amount})
        }
    }
    // Opens algoscan url for scraping of data
    // Also handles swithcing of pages
    async get_url() {
        try{
            await this.driver.get(this.url)
            await this.driver.wait(until.elementLocated(By.xpath('//*[@id="__next"]/main/section[2]/section/table/tbody')), 10000)
            const nextPage = await this.driver.findElement(By.xpath('//*[@id="__next"]/main/section[2]/div/div/button[3]'))        
            await this.get_rows()
            while (! await nextPage.getAttribute('disabled')){
                await nextPage.click();
                let spinner = await this.driver.wait(until.elementLocated(By.css('#__next > main > section.mt-4 > div > div > svg.animate-spin')))
                await this.driver.wait(until.stalenessOf(spinner))
                await this.get_rows()
            }
        }
        catch (error) {
            throw error
        }
    }
    // Starts the AlgoScan Scraper
    async run() {
        try{
            const spinner = createSpinner("Scraping data on AlgoScan...").start()
            await this.get_url();
            spinner.success("Finished!");
            this.close_browser();
            return this.records;
        }
        catch (error) {
            console.log(error)
            this.close_browser();
            exit(1)
        }
    }
}


// ALgoExplorer Scraper
class AlgoExplorerScraper extends Scraper{
    constructor (option) {
        super(option)
        this.url = "https://algoexplorer.io/address/" + this.address
        this.total_pages = 0
    }
    // Identify the total number of pages
    async numPages() {
        const num_pages = await this.driver.findElement(By.xpath('//*[@id="__next"]/div/div[1]/div[1]/div/div[2]/div/div/div/div/div[1]/div[2]')).getText();
        this.total_pages = parseInt(num_pages.split(" ")[1]);
    }
    // Find if an element exists on a page
    async if_exists(row, xpath) {
        try{
            await row.findElement(By.xpath(xpath))
            return true;
        } catch(err) {
            return false;
        }
    }
    // Loop through the rows on a page and scrapes from, to and amount fron the rows
    async get_rows() {
        const tableRows = await this.driver.findElements(By.css('div.master > div.root > div > div:nth-child(3) > div > div > div > div > div.table-responsive > table > tbody > tr.row.styles_item__L_bVx'))
        for (let row of tableRows) {
            const from = await this.if_exists(row, './/td[5]/span') ? await row.findElement(By.xpath('.//td[5]/span')).getText() : await row.findElement(By.xpath('.//td[5]/a')).getText()
            const to = await this.if_exists(row, './/td[6]/span') ? await row.findElement(By.xpath('.//td[6]/span')).getText() : await row.findElement(By.xpath('.//td[6]/a')).getText()
            const amount = await this.if_exists(row, './/td[4]/span') ? await row.findElement(By.xpath('.//td[4]/span')).getText() : await row.findElement(By.xpath('.//td[4]/a')).getText()
            this.records.push({from: from, to: to, amount: amount})
        }
    }
    // Runs the algoexplorer Scraper
    async run() {
        try{
            const spinner = createSpinner("Scraping data on AlgoExplorer...").start()
            await this.driver.get(this.url)
            await this.driver.wait(until.elementLocated(By.xpath('//*[@id="__next"]/div/div[1]/div[1]/div/div[2]/div/div/div/div/div[2]/table/tbody')), 10000)
            await this.numPages()
            await this.get_rows()
            const next_page = await this.driver.findElement(By.xpath('//*[@id="__next"]/div/div[1]/div[1]/div/div[2]/div/div/div/div/div[1]/div[2]/button[3]'))
            for (let i = 0; i < this.total_pages; i++){
                await next_page.click()
                await this.driver.wait(until.elementLocated(By.xpath('//*[@id="__next"]/div/div[1]/div[1]/div/div[2]/div/div/div/div/div[2]/table/tbody')), 10000)
                await next_page.click()
                await this.get_rows()
            }
            spinner.success('Finished!!')
            this.close_browser()
            return this.records
        }
        catch (error) {
            console.log(error.message)
            this.close_browser()
        }
    }
}


// Writes data to a csv file and saves it to a file called my.csv
const writeCsv = (records) => {
    stringify(records, {header: true, columns: {from: 'From', to: 'To', amount: 'Amount'}}, (err, output) => {
        if (err) throw err;
        fs.writeFile('my.csv', output, (err) => {
            if (err) throw err;
            console.log('my.csv saved')
        })
    })
}


const main = async() => {
    try {
        console.clear()
        figlet(BANNER, (err, data) => {
            console.log(gradient.pastel.multiline(data))
        })
        const args = parseArgs()
        if (args.algoscan){
            const scraper = new AlgoScanScraper({address: args.address})
            const records = await scraper.run()
            writeCsv(records);
        }
        else {
            const scraper = new AlgoExplorerScraper({address: args.address})
            const records = await scraper.run()
            writeCsv(records);
        }
    } catch(error) {
        console.error(error.message)
    }
}

main()