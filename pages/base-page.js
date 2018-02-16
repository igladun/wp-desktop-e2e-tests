import {until} from 'selenium-webdriver';
import config from 'config';

const waitTimeoutMS = config.get( 'explicitWaitMS' );

export default class BasePage {
	constructor( driver ) {
		this.driver = driver;
	}

	async waitUntilElementIsNotVisible( locator ) {
		await this.driver.wait( until.elementIsVisible(
			this.driver.findElement( locator ) ), waitTimeoutMS,
			`Timed out waiting for the element with ${locator.using} of '${locator.value}' to be visible` );
	}

	async clickWhenVisible( locator ) {
		await this.driver.wait( until.elementIsVisible(
			this.driver.findElement( locator ) ), waitTimeoutMS,
			`Timed out waiting for the element with ${locator.using} of '${locator.value}' to be visible` );
		await this.driver.findElement( locator ).click();
	}

	async setWhenVisible( locator, text ) {
		await this.driver.wait( until.elementIsVisible(
			this.driver.findElement( locator ) ), waitTimeoutMS,
			`Timed out waiting for the element with ${locator.using} of '${locator.value}' to be visible` );
		let element = await this.driver.findElement( locator );
		await element.clear();
		await element.sendKeys( text );
	}

	async clickThroughActions( locator ) {
		await this.waitUntilElementIsNotVisible( locator );

		let element = await this.driver.findElement( locator );
		await this.driver.actions().mouseMove( element ).click( element ).perform();

		await this.driver.sleep( 1000 );//todo remove this magic

	}

}
