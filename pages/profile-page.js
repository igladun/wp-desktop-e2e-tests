import {By, until} from 'selenium-webdriver';
import BasePage from './base-page.js';
import config from 'config';

const signOutButtonSelector = By.css( '.button.me-sidebar__signout-button.is-compact' );

export default class ProfilePage extends BasePage {

	constructor( driver ) {
		super( driver );
	}

	async get() {
		await this.driver.wait( until.elementIsVisible(
			this.driver.findElement( signOutButtonSelector ) ), config.get( 'explicitWaitMS' ) );

	}

	async signOut() {
		await this.clickThroughActions( signOutButtonSelector );
	}

}
