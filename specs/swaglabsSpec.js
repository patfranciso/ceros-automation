import { browser } from "protractor";
import * as Assert from "../framework/assertion.js";
import I from "../pages/AcceptanceTester.js";

describe ('Swag Labs tests', () => {
    beforeEach(async () => {
        await I.goto(browser.baseUrl);
    });

    it('should log in with standard user', async ()=> {
        I.login();

        Assert.currentUrlIs('/inventory.html');
    });

    it('should add an item to the cart', async () => {
        I.login();

        I.click('#add-to-cart-sauce-labs-bolt-t-shirt');
        I.click('#add-to-cart-sauce-labs-backpack');

        Assert.inDom('.shopping_cart_badge');
        Assert.hasText('.shopping_cart_badge', '2');
    });

    it('should have 6 items on the inventory page', async () => {
        I.login();

        Assert.itemCount('.inventory_item', 6);
    });

    it('should complete the purchase process of an item from the inventory', async () => {
        I.login();

        I.click('.btn_inventory 2');
        I.click('.btn_inventory 3');
        I.click('.btn_inventory 4');

        Assert.inDom('.shopping_cart_badge');
        Assert.hasText('.shopping_cart_badge', '3');

        I.click('.shopping_cart_link');
        Assert.currentUrlIs('/cart.html');

        I.click('#checkout');

        Assert.currentUrlIs('/checkout-step-one.html');


        I.typeIn('#first-name', 'standard');
        I.typeIn('#last-name', 'user');
        I.typeIn('#postal-code', '23401');

        I.click('#continue');
        Assert.currentUrlIs('/checkout-step-two.html');

        I.click('#finish');


        Assert.currentUrlIs('/checkout-complete.html');

        Assert.hasText('.complete-header','THANK YOU FOR YOUR ORDER');
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
