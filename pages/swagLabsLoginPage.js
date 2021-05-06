import BasePage from './basePage';

class SwaglabsLoginPage extends BasePage {
    constructor() {
        super();
        this.username = element(by.id('user-name'));
        this.password = element(by.id('password'));
        this.loginBtn = element(by.id('login-button'));
    }
    login(){
        this.username.sendKeys('standard_user');
        this.password.sendKeys('secret_sauce');

        this.loginBtn.click();
    }
}
export default new SwaglabsLoginPage();