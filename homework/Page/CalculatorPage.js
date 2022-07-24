const { test, expect } = require('@playwright/test');

exports.CalculatorPage = class CalculatorPage {

    constructor(page) {
        this.page = page;
    }

    async loadHomePage() {
        await this.page.goto('https://testsheepnz.github.io/BasicCalculator');
    }

    async selectBuildVersion(version) {
        await this.page.selectOption('#selectBuild', { label: version });
    }

    async enterFirstNumber(number) {
        await this.page.locator('#number1Field').type(number);
    }

    async enterSecondNumber(number) {
        await this.page.locator('#number2Field').type(number);
    }

    async getElementById(id) {
        return await this.page.locator(id);
    }

    async selectOperation(operation) {
        await this.page.selectOption('#selectOperationDropdown', { label: operation });
    }

    async clickCalculate() {
        await this.page.locator('#calculateButton').click();
    }

    async getAnswer() {
        return this.page.locator('#numberAnswerField');
    }

    async getIntegersOnlyCheckBoxLabel() {
        return this.page.locator('#intSelectionLabel');
    }

    async getErrorMessage() {
        const errorForm = this.page.locator('#errorForm');
        return await errorForm.innerText('#errorMsgField');
    }
}

