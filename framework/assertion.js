export function currentUrlIs(url) {
    assertEquals(browser.getCurrentUrl(), browser.baseUrl + url);
}

export function assertEquals(x,y){
    expect(x).toEqual(y);
}

export function inDom(target) {
    return expect($(target).isPresent()).toBeTruthy();
}

export function isVisible(locator) {
    return protractor.ExpectedConditions.visibilityOf(locator);
}

export function isNotVisible(locator) {
    return protractor.ExpectedConditions.invisibilityOf(locator);
}
export function notInDom(locator) {
    return protractor.ExpectedConditions.stalenessOf(locator);
}

export function isClickable(locator) {
    return protractor.ExpectedConditions.elementToBeClickable(locator);
}

export function hasText(locator, text) {
    const element = $(locator);
    expect(element.getText()).toEqual(text);
}

export function and(arrayOfFunctions) {
    return protractor.ExpectedConditions.and(arrayOfFunctions);
}

export function titleIs(title) {
    return protractor.ExpectedConditions.titleIs(title);
}

/**
 * test if an element has a class
 * @param  {elementFinder} locator - eg. $('div#myId')
 * @param  {string}  klass  - class name
 * @return {Boolean} - does the element have the class?
 */
export function hasClass(locator, klass) {
    return locator.getAttribute('class').then(classes => {
        return classes.split(' ').indexOf(klass) !== -1;
    });
}
