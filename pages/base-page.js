import {until} from 'selenium-webdriver';
import config from 'config';

export default class BasePage {
	constructor( driver ) {
		this.driver = driver;
	}

	async clickWhenVisible( locator ) {
		await this.driver.wait( until.elementIsVisible(
			this.driver.findElement( locator ) ), config.get( 'explicitWaitMS' ) );
		await this.driver.findElement( locator ).click();
	}

	async setWhenVisible( locator, text ) {
		await this.driver.wait( until.elementIsVisible(
			this.driver.findElement( locator ) ), config.get( 'explicitWaitMS' ) );
		let element = await this.driver.findElement( locator );
		await element.clear();
		await element.sendKeys( text );
	}

	async clickThroughActions( locator ) {
		await this.driver.wait( until.elementIsVisible(
			this.driver.findElement( locator ) ), config.get( 'explicitWaitMS' ) );

		let element = await this.driver.findElement( locator );
		await this.driver.actions().mouseMove( element ).click( element ).perform();

		await this.driver.sleep( 1000 );//todo remove this magic

	}

}
