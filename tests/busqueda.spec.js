//const {test,expect} = require('@playwright/test')
import {test,expect} from '@playwright/test'

test('busqueda', async({page})=>{
    //dirige a la dirección URL
    await page.goto("https://www.mercadolibre.com/")

    //click on MX country button 
    await page.locator('id=MX').click()
    await page.screenshot({ path: 'test-results\Inicio.png'})

    //provide the item
    await page.locator('id=cb1-edit').fill("playstation 5")
    await page.screenshot({ path: 'test-results\Item-Search.png'})

    //Click search 
    await page.locator('//div/div[2]/form/button/div').click()
    
    //Filter by conditions
    await page.locator('//div[2]/aside/section/div[7]/ul/li[1]/a/span[1]').click()
    await page.screenshot({ path: 'test-results\Condicion.png'})

    //Filter by location
    await page.locator('//ul/li/a/span[text()="Distrito Federal"]').click()
    await page.screenshot({ path: 'test-results\FiltroUbicacion.png'})

    //Order by price
    await page.click('//*[@id=":Raokpp:-trigger"]')
    await page.click('//*[@id=":Raokpp:-menu-list-option-price_desc"]/div/div/span')
    await page.screenshot({ path: 'test-results\Mayor-menor.png'})

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
    
    console.log(iItem)

})