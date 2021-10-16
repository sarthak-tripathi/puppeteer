let puppeteer = require("puppeteer");
//creates headless browser:

let browserStartPromise = puppeteer.launch({
    //visible
    headless: false,
    //type 1sec
    // slowMo: 1000,

    defaultViewport:null,

//maximize the window:-
    args: ["--start-maximized" , "--disable-notifications"]
});//browser ka promise mil rha hai.

let page , browser, rTab;

browserStartPromise.then(function(browserObj){
    //console.log("browser opened");
    //new tab open 
    browser = browserObj;//objects that are used to manipulate methods and properties of the Web page loaded in the browser window. 
    let browserTabOpenPromise = browserObj.newPage();
    return browserTabOpenPromise; // promise return karte ho or iss promise ka result niche wale then mei mil jata
    //create new tab

}).then(function(newTab){
    page = newTab;
    console.log("new tab opened");
    let gPageOpened =  newTab.goto("https://www.google.com/");//new page will go to the written browser:::
    return gPageOpened;
}).then(function(){
    console.log("google Page opened");
    //used in key board -> data entery
    let WaitingForTypingPromise = page.type("input[title = 'Search']","pepcoding");
    return WaitingForTypingPromise;

}).then(function(){
    //jo upar command diya search mei usko enter kiya 
    //keyBoard press specific key
    let enterWillBeDonePromise = page.keyboard.press('Enter');
    return enterWillBeDonePromise;
//wait
}).then(function(){
    //when yu go to the next page just wait
    //wait for element  to be visible on the page -> whenever yu go to the page
    console.log("wait for element not be visible");

    let waitForElementPromise = WaitAndClick(".LC20lb.DKV0Md", page);
    //visible tool thodha ruk ke click karo aisa
    return waitForElementPromise;
//then click

})
// .then(function(){
//     //cross ko cut karna
//     let waitForModelPromise = page.waitForSelector("#lp_modal_close",{visible: true});
//     return waitForModelPromise;
// }).then(function(){

//     let clickModal = page.click("#lp_modal_close", {delay : 100});
//     return clickModal;
//     //to go in resource:-

// })
.then(function(){
   let Wcpromise = handleIfNotPresent( "#lp_modal_close", page  );
   return Wcpromise;
})

.then(function () {
    // page element -> cheerio 
    let allLisPromise = page.$$(".site-nav-li");
    return allLisPromise;
})
.then(function (allElem) {
    //resource page click
    let elementWillBeclickedPromise = allElem[4].click({ delay: 100 });
    return elementWillBeclickedPromise;
})
//resource page is on next tab and next tab will take time to open
//niche wala code nihi likhoge to code fatega

.then(function(){
    let waitPromise = page.waitFor(2000);
    return waitPromise;
})

.then(function(){
    //get all open web page in an array
    let listofOpenTabPromise = browser.pages();
    return listofOpenTabPromise;

}).then(function(array){
    rTab = array[array.length - 1];
    let waitForLevel1Promise = WaitAndClick('h2[title="Data Structures and Algorithms in Java [Level 1 - Foundation]"]', rTab);
    return waitForLevel1Promise;
    
}).then(function(){
    console.log("opened level1");
})

function WaitAndClick(selector, cPage){
    return new Promise(function (resolve , reject){

       
            //cross ko cut karna
            let waitForModelPromise = 
            cPage.waitForSelector(selector,{visible: true});
             waitForModelPromise.then(function(){
        
            let clickModal = cPage.click(selector, {delay : 100});
            return clickModal;
            //to go in resource:-
        
        }).then(function(){
            resolve();
        }).catch(function(err){
            reject(err);
        })
    }
    )
}
//promise > banner is present  or not -> the code will run

function handleIfNotPresent(selector,cPage){
    return new Promise(function(resolve,reject){
        //wait and click
        let WaitAndClickPromises = WaitAndClick(selector, cPage);
        WaitAndClickPromises.then(function(){
            resolve();
        })
        WaitAndClickPromises.catch(function(err){
            resolve();
        })

    })
}
