
export default class BasePage {
    constructor() {
        /**
         * wrap this.timeout. (ms) in t-shirt sizes
         */
        this.timeout = {
            'xs': 420,
            's' : 1000,
            'm' : 2000,
            'l' : 5000,
            'xl': 9000,
            'xxl': 15000
        };

        /**
         * get an element's width
         * extends protractor's ElementFinder
         * @return {int} - the width of the element
         */
        protractor.ElementFinder.prototype.getWidth = async function() {
            return await this.getSize().then(size => {
                return size.width;
            });
        };
        browser.ignoreSynchronization = true;
    }

    /**
     * navigate to a page via it's `url` var
     * and verify/wait via loaded()
     * @requires page have both `url` and `pageLoaded` properties
     */
    async goto(url) {
        await browser.get(url, this.timeout.xl);
    }

    /**
     * Webdriver equivalent to hitting Enter/Return key.
     */
    async hitEnter() {
        await browser.actions().sendKeys(protractor.Key.ENTER).perform();
    }

    /**
     * switches focus to a new (last) window
     */
    async switchToNewWindow() {
        await browser.getAllWindowHandles().then(handles => {
            browser.switchTo().window(handles[handles.length - 1]);
        });
    }

    /**
     * close the current window and switch to its parent window
     * @param {obj} parentPage - the parent page object we want to load
     */
    async closeNewWindow() {
        await browser.getAllWindowHandles().then(handles => {
            browser.close();
            // the parent should be 2 less than the length of all found window handlers
            browser.switchTo().window(handles.length - 2);
        });
    }

    getElement(target){
        const start = target.substr(0,1);
        if(start === '#' && target.indexOf(' ') === -1){
            return element(by.id(target));
        }
        else if(start === '.'  && target.indexOf(' ') === -1){
            return element(by.class(target));
        }
        else{
            return element(by.tagName(target));
        }
    }

    click(target){
        getElement(target).click();
    }

    typeIn(target, inputString){
        getElement(target).sendKeys(inputString);
    }

    choose(target, option){
        element(by.cssContainingText(target, option)).click();
    }
}