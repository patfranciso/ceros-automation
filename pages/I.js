import BasePage from './basePage';

const STANDARD_USER = 'standard_user';
const LOCKED_OUT_USER = 'locked_out_user';
const PROBLEM_USER = 'problem_user';
const PERFORMANCE_GLITCH_USER = 'performance_glitch_user';
const PASS = 'secret_sauce';

class SwaglabsLoginPage extends BasePage {
    constructor() {
        super();
        this.username = element(by.id('user-name'));
        this.password = element(by.id('password'));
        this.loginBtn = element(by.id('login-button'));
    }
    login(){
        this.username.sendKeys(STANDARD_USER);
        this.password.sendKeys(PASS);

        this.loginBtn.click();
    }

    getElement(target){
        const start = target.substr(0,1);
        const idOrClass = target.substr(1);
        
        if(start === '#' && target.indexOf(' ') === -1){
            return element(by.id(idOrClass));
        }
        else if(start === '.' && target.indexOf(' ') === -1 ){
            return element(by.class(idOrClass));
        }
        else{
            return element(by.tagName(target));
        }
    }
    
    click(target){
       const elem = this.getElement(target);
       elem.click();
    }
    
    typeIn(target, inputString){
        const elem = this.getElement(target);
        elem.sendKeys(inputString);
    }

    choose(target, option){
        element(by.cssContainingText(target, option)).click();
    }
}
export default new SwaglabsLoginPage();