export function currentUrlIs(url) {
    assertEquals(browser.getCurrentUrl(), browser.baseUrl + url);
}

export function assertEquals(x,y){
    expect(x).toEqual(y);
}