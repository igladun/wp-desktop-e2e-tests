import {By} from 'selenium-webdriver';
import BasePage from './base-page.js';

const signOutButtonSelector = By.css( '.button.me-sidebar__signout-button.is-compact' );

export default class ProfilePage extends BasePage {

	constructor( driver ) {
		super( driver );
	}

	async get() {
		await this.waitUntilElementIsNotVisible( signOutButtonSelector );
	}

	async signOut() {
		await this.clickThroughActions( signOutButtonSelector );
	}

}
