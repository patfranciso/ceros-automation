## Setup:
* Install [Node](http://nodejs.org) (v14.x.x or later)
* `npm i` to install the project dependencies

## Run tests:
* run tests via plain Protractor `node_modules/.bin/protractor conf.js`
* run tests `npm test` (runs via flake, which re-runs failed tests)
* run with flake `./flake conf.js`

## Troubleshooting
* run `node -v` and make sure your node version is 14.x.x or greater
* `webdriver-manager` _should_ have updated on install, but if not, run `npm run update` to be sure

## Documents
In the `docs` folder are the files with answers provided for the first 2 questions.
* the 3 `docs\Test-Strategy-*.docx` files for the Test Strategy question while
* `docs\Bugs.xlsx` is for Manual Testing/Bug reporting question.

The `docs\Test-Strategy-Jump.docx` was completed first.
The `docs\Test-Strategy-Crash.docx` and `docs\Test-Strategy-Crash-Continue.docx` were chosen as the existing features for the Test Strategy because they are both the essence of the game implemented so far and their failure could affect the feasibility and continuity of the project.

## Completion Time
The Manual and Automated parts took roughly 2 weeks each for me to complete.

## Best Practices that are not being followed in the original source code
* Tests should `focus on the behavior` of the system but the source code provided encourages the testing of the API of the test framework.
* `basePage` is a mixture of Arrange, Act and Assert flows of testing which makes it quite vague.
* `swagLabsLoginPage` extends the basePage but does not implement the required `pageLoaded` behaviour described in `basePage`.
* There is a duplicate reference to the starting URL for the tests with one value being incorrect.
* In the `basePage.js` file `goto` is a bad name for a function or method with no input URL parameter.
* Tests should be `simple` which means that they are easy to read with understanding and easy to maintain. I achieved this by separating the actions performed in the tests into one file `AcceptanceTester.js` and all assertions with newer ones added to the `assertion.js` file. I followed syntax inspired by `Codeception` API for WebDriver.
