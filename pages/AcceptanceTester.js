import BasePage from './basePage';

const STANDARD_USER = 'standard_user';
const LOCKED_OUT_USER = 'locked_out_user';
const PROBLEM_USER = 'problem_user';
const PERFORMANCE_GLITCH_USER = 'performance_glitch_user';
const PASS = 'secret_sauce';

class AcceptanceTester extends BasePage {
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
            return element(by.css(target));
        }
        else if(start === '.' && target.indexOf(' ') !== -1 ){
            const [klass, nn] = target.split(' ');
            return element.all(by.css(klass)).get(Number(nn));
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

    choose(target, choice){
        $(target).element(By.cssContainingText('option', choice)).click();
    }

    map(klass, fn){
        return element.all(by.css(klass))
            .map((item, _index) => {
                return item.getText().then(text => fn(text));
            });
    }
}
export default new AcceptanceTester();