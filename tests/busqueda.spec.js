//const {test,expect} = require('@playwright/test')
import {test,expect} from '@playwright/test'

test('busqueda', async({page})=>{

    await page.goto("https://www.mercadolibre.com/")

    //click on MX country button
    await page.locator('id=MX').click()

    //provide the item
    await page.locator('id=cb1-edit').fill("playstation 5")

    //Click search 
    await page.locator('//div/div[2]/form/button/div').click()
    
    //Filter by conditions
    await page.locator('//div[2]/aside/section/div[7]/ul/li[1]/a/span[1]').click()

    //Filter by location
    await page.locator('//ul/li/a/span[text()="Distrito Federal"]').click()

    //Order by price
    await page.click('//*[@id=":Raokpp:-trigger"]')
    await page.click('//*[@id=":Raokpp:-menu-list-option-price_desc"]/div/div/span')
    

    //completo
    const enlaces = await page.evaluate(() => {
        const elements = document.querySelectorAll('div.ui-search-item__group--title a.ui-search-item__group__element') 
        const links = [];

        for (let element of elements){
            links.push(element.href)
        }
        return links
    })

    const iItem = [];
    for (var i=0 ; i<5 ; i++){
        await page.goto(enlaces[i])
        await page.waitForSelector('//div[contains(@class, "ui-pdp-header__title")]')

        const ITEM = await page.evaluate(() => {
            const tmp = {}
            tmp.itemName = document.querySelector('h1').innerText
            tmp.itemPrice = document.querySelector('div.ui-pdp-price__second-line span span.andes-money-amount__fraction').innerText
            return tmp
        })
        iItem.push(ITEM);
    }
    //Para extraer el titulo
    //const items = await page.$$("//h2[contains(@class, "item")]")
    //para extraer el precio
    //const prices = await page.$$("//span[contains(@class, 'price__part--medium')]/span[contains(@class,'amount__fraction')]")

    console.log(iItem)
})