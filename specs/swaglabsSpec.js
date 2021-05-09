import { browser } from "protractor";
import * as Assert from "../framework/assertion.js";
import I from "../pages/AcceptanceTester.js";

describe ('Swag Labs tests', () => {
    beforeAll(async () => {
        await I.goto(browser.baseUrl);
        I.login();
    });

    it('should log in with standard user', async ()=> {
        Assert.currentUrlIs('/inventory.html');
    });

    it('should add an item to the cart', async () => {
        I.click('#add-to-cart-sauce-labs-bolt-t-shirt');
        I.click('#add-to-cart-sauce-labs-backpack');

        Assert.inDom('.shopping_cart_badge');
        Assert.hasText('.shopping_cart_badge', '2');
    });

    it('should have 6 items on the inventory page', async () => {
        Assert.itemCount('.inventory_item', 6);
    });

    it('should complete the purchase process of an item from the inventory', async () => {
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
        I.goto('/inventory.html');
        const fn = text => Number(text.substr(1));
        const unorderedPrices = await I.map('.inventory_item_price', fn);
        const orderedPrices = unorderedPrices.sort((a,b) => b - a);
        I.choose('.product_sort_container', 'Price (high to low)');

        const sortedPrices = I.map('.inventory_item_price', fn);

        expect(orderedPrices).toEqual(sortedPrices);
    });

    it('sort the inventory items by name, Z-to-A', async () => {
        I.goto('/inventory.html');
        const fn = text => text ;
        const unorderedNames = await I.map('.inventory_item_name', fn);
        const orderedNames = unorderedNames.sort().reverse();

        I.choose('.product_sort_container', 'Name (Z to A)');

        const sortedNames = I.map('.inventory_item_name', fn);

        expect(orderedNames).toEqual(sortedNames);
    });


})
