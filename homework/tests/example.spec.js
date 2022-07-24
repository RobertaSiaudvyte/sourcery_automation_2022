// @ts-check
const { test, expect } = require('@playwright/test');
const { CalculatorPage } = require('../Page/CalculatorPage');

const data = [
  'Prototype',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9'
]

let calculatorPage;

test.describe('Test basic calculator', () => {
  data.forEach(version => {

    test.describe(version + ': Add', () => {
      test('Adding 2 and 3 results in 5', async ({ page }) => {
        calculatorPage = new CalculatorPage(page);
        await calculatorPage.loadHomePage();
        await calculatorPage.selectBuildVersion(version);

        await calculatorPage.enterFirstNumber('2');
        await calculatorPage.enterSecondNumber('3');

        await calculatorPage.selectOperation('Add');
        await calculatorPage.clickCalculate();

        const answer = await calculatorPage.getAnswer();
        await expect(answer).toHaveValue('5');
      });
    });

    test.describe(version + ': Subtract', () => {
      const num1 = '15';
      const num2 = '9';
      const result = '6';

      test(`Subtracting ${num2} out of ${num1} results in ${result} `, async ({ page }) => {
        calculatorPage = new CalculatorPage(page);
        await calculatorPage.loadHomePage();
        await calculatorPage.selectBuildVersion(version);

        await calculatorPage.enterFirstNumber(num1);
        await calculatorPage.enterSecondNumber(num2);

        await calculatorPage.selectOperation('Subtract');
        await calculatorPage.clickCalculate();

        const answer = await calculatorPage.getAnswer();
        await expect(answer).toHaveValue(result);
      });
    });

    test.describe(version + ': Multiply', () => {
      const num1 = '3';
      const num2 = '3';
      const result = '9';

      test(`Multiplying ${num2} with ${num1} results in ${result} `, async ({ page }) => {
        calculatorPage = new CalculatorPage(page);
        await calculatorPage.loadHomePage();
        await calculatorPage.selectBuildVersion(version);

        await calculatorPage.enterFirstNumber(num1);
        await calculatorPage.enterSecondNumber(num2);

        await calculatorPage.selectOperation('Multiply');
        await calculatorPage.clickCalculate();

        const answer = await calculatorPage.getAnswer();
        await expect(answer).toHaveValue(result);
      });
    });

    test.describe(version + ': Divide', () => {
      const num1 = '9';
      const num2 = '3';
      const result = '3';

      test(`Dividing ${num1} with ${num2} results in ${result} `, async ({ page }) => {
        calculatorPage = new CalculatorPage(page);
        await calculatorPage.loadHomePage();
        await calculatorPage.selectBuildVersion(version);

        await calculatorPage.enterFirstNumber(num1);
        await calculatorPage.enterSecondNumber(num2);

        await calculatorPage.selectOperation('Divide');
        await calculatorPage.clickCalculate();

        const answer = await calculatorPage.getAnswer();
        await expect(answer).toHaveValue(result);
      });
    });

    test.describe(version + ': Concatenate', () => {
      const num1 = '9';
      const num2 = '3';
      const result = '93';

      test(`Concatenating ${num1} and ${num2} results in ${result} `, async ({ page }) => {
        calculatorPage = new CalculatorPage(page);
        await calculatorPage.loadHomePage();
        await calculatorPage.selectBuildVersion(version);

        await calculatorPage.enterFirstNumber(num1);
        await calculatorPage.enterSecondNumber(num2);

        await calculatorPage.selectOperation('Concatenate');
        await calculatorPage.clickCalculate();

        const answer = await calculatorPage.getAnswer();
        await expect(answer).toHaveValue(result);
      });
    });

    test.describe(version + ': Item is visible', async () => {
      test('Calculate button', async ({ page }) => {
        calculatorPage = new CalculatorPage(page);
        await calculatorPage.loadHomePage();
        await calculatorPage.selectBuildVersion(version);

        const calculateButton = await page.locator('#calculateButton');
        await expect(calculateButton, "Calculate button is missing").toBeVisible();
      });

      test('Clear button', async ({ page }) => {
        calculatorPage = new CalculatorPage(page);
        await calculatorPage.loadHomePage();
        await calculatorPage.selectBuildVersion(version);

        const clearButton = await page.locator('#clearButton');
        await expect(clearButton, "Clear button is missing").toBeVisible();
      });

      test('Input fields', async ({ page }) => {
        calculatorPage = new CalculatorPage(page);
        await calculatorPage.loadHomePage();
        await calculatorPage.selectBuildVersion(version);

        await expect(await calculatorPage.getElementById('#number1Field'), "First number field is missing").toBeVisible();
        await expect(await calculatorPage.getElementById('#number2Field'), "Second number field is missing").toBeVisible();
        await expect(await calculatorPage.getElementById('#numberAnswerField'), "Answer field is missing").toBeVisible();
      });
    });

    test.describe(version + ' integers checkBox label', async () => {
      test('is hidden when operation is Concatenate', async ({ page }) => {
        calculatorPage = new CalculatorPage(page);
        await calculatorPage.loadHomePage();
        await calculatorPage.selectBuildVersion(version);
        await calculatorPage.selectOperation('Concatenate');

        const checkBox = await calculatorPage.getIntegersOnlyCheckBoxLabel();
        await expect(await checkBox.isVisible()).toBe(false);
      });
    });

    test.describe(version + ' integers checkBox label', async () => {
      test('is visible when operation is NOT Concatenate', async ({ page }) => {
        calculatorPage = new CalculatorPage(page);
        await calculatorPage.loadHomePage();
        await calculatorPage.selectBuildVersion(version);

        // Add
        await calculatorPage.selectOperation('Add');
        let checkBox = await calculatorPage.getIntegersOnlyCheckBoxLabel();
        await expect(await checkBox.isVisible(), "When operation = add checkbox should be visible").toBe(true);

        // Subtract
        await calculatorPage.selectOperation('Subtract');
        checkBox = await calculatorPage.getIntegersOnlyCheckBoxLabel();
        await expect(await checkBox.isVisible(), "When operation = Subtract checkbox should be visible").toBe(true);

        // Multiply
        await calculatorPage.selectOperation('Multiply');
        checkBox = await calculatorPage.getIntegersOnlyCheckBoxLabel();
        await expect(await checkBox.isVisible(), "When operation = Multiply checkbox should be visible").toBe(true);

        // Divide
        await calculatorPage.selectOperation('Divide');
        checkBox = await calculatorPage.getIntegersOnlyCheckBoxLabel();
        await expect(await checkBox.isVisible(), "When operation = Divide checkbox should be visible").toBe(true);
      });
    });

    test.describe(version + ' warning messages', async () => {
      test('when divided by zero displays error message', async ({ page }) => {
        calculatorPage = new CalculatorPage(page);
        await calculatorPage.loadHomePage();
        await calculatorPage.selectBuildVersion(version);
        await calculatorPage.selectOperation('Divide');
        await calculatorPage.enterFirstNumber('9');
        await calculatorPage.enterSecondNumber('0');
        await calculatorPage.clickCalculate();

        const error =  await calculatorPage.getErrorMessage();
        await expect(error).toEqual('Divide by zero error!');
      });

      test('when first number is not a number', async ({ page }) => {
        calculatorPage = new CalculatorPage(page);
        await calculatorPage.loadHomePage();
        await calculatorPage.selectBuildVersion(version);
        await calculatorPage.selectOperation('Divide');
        await calculatorPage.enterFirstNumber('number');
        await calculatorPage.enterSecondNumber('10');
        await calculatorPage.clickCalculate();

        const error =  await calculatorPage.getErrorMessage();
        await expect(error).toEqual('Number 1 is not a number');
      });

      test('when second number is not a number', async ({ page }) => {
        calculatorPage = new CalculatorPage(page);
        await calculatorPage.loadHomePage();
        await calculatorPage.selectBuildVersion(version);
        await calculatorPage.selectOperation('Divide');
        await calculatorPage.enterFirstNumber('10');
        await calculatorPage.enterSecondNumber('number');
        await calculatorPage.clickCalculate();

        const error =  await calculatorPage.getErrorMessage();
        await expect(error).toEqual('Number 2 is not a number');
      });
    });

  });
});

