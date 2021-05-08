import { browser } from "protractor";
import { currentUrlIs } from "../framework/assertion.js";
import I from "../pages/I.js";

describe ('Swag Labs tests', () => {
    beforeEach(async () => {
        await I.goto(browser.baseUrl);
    });

    it('should log in with standard user', async ()=> {
        I.login();

        currentUrlIs('/inventory.html');
    });

    it('should add an item to the cart', async () => {
        I.login();

        I.click('#add-to-cart-sauce-labs-bolt-t-shirt');
        I.click('#add-to-cart-sauce-labs-backpack');

        expect($('.shopping_cart_badge').isPresent()).toBeTruthy();
        var badge = element(by.css('.shopping_cart_badge'));
        expect(badge.getText()).toEqual('2');
    });

    it('should have 6 items on the inventory page', async () => {
        I.login();

        let count = element.all(by.css('.inventory_item')).count();
        expect(count).toEqual(6);
    });

    it('should complete the purchase process of an item from the inventory', async () => {
        I.login();


        element.all(by.css('.btn_inventory')).get(2).click();
        element.all(by.css('.btn_inventory')).get(3).click();
        element.all(by.css('.btn_inventory')).get(4).click();

        expect($('.shopping_cart_badge').isPresent()).toBeTruthy();
        var badge = element(by.css('.shopping_cart_badge'));
        expect(badge.getText()).toEqual('3');

        element(by.css('.shopping_cart_link')).click();
        currentUrlIs('/cart.html');

        element(by.id('checkout')).click();

        currentUrlIs('/checkout-step-one.html');

        element(by.id('first-name')).sendKeys('standard');
        element(by.id('last-name')).sendKeys('user');
        element(by.id('postal-code')).sendKeys('23401');

        element(by.id('continue')).click();
        currentUrlIs('/checkout-step-two.html');

        // $I->see('Payment Information:');
        // $I->see('Shipping Information:');
        element(by.id('finish')).click();


        currentUrlIs('/checkout-complete.html');

        var header_message = element(by.css('.complete-header'));
        expect(header_message.getText()).toEqual('THANK YOU FOR YOUR ORDER');
    });

    // BONUS tests! Not required for the automation challenge, but do these if you can.
    it('sort the inventory items by price, high-to-low', async () => {
        I.login();

        element(by.cssContainingText('option', 'Price (high to low)')).click();

        const prices = element.all(by.css('.inventory_item_price'))
            .map((item, _index) => {
                return item.getText().then(function (text) {
                    return Number(text.substr(1));
                });
            });

        expect([49.99, 29.99, 15.99, 15.99, 9.99, 7.99]).toEqual(prices);
    });

    it('sort the inventory items by name, Z-to-A', async () => {
        I.login();

        element(by.cssContainingText('option', 'Name (Z to A)')).click();

        const names = element.all(by.css('.inventory_item_name'))
            .map((item, _index) => {
                return item.getText().then(function (text) {
                    return text;
                });
            });

        const expected = ["Test.allTheThings() T-Shirt (Red)", "Sauce Labs Onesie", 
        "Sauce Labs Fleece Jacket",
        "Sauce Labs Bolt T-Shirt", "Sauce Labs Bike Light", "Sauce Labs Backpack"
    ];

        expect(expected).toEqual(names);
    });


})
