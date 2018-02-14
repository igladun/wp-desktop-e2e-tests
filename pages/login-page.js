import {By, until} from 'selenium-webdriver';
import BasePage from './base-page.js';
import config from 'config';

const userNameSelector = By.css( 'input[name="login"]' );
const passwordSelector = By.css( 'input[name="password"]' );
const submitSelector = By.css( '.button.form-button.is-primary' );

export default class LoginPage extends BasePage {

	constructor( driver ) {
		super( driver );
	}

	async get() {
		await this.driver.wait( until.elementIsVisible(
			this.driver.findElement( userNameSelector ) ), config.get( 'explicitWaitMS' ) );
	}

	async login() {
		let username = config.get( 'username' );
		let password = config.get( 'password' );

		await this.setWhenVisible( userNameSelector, username );
		await this.setWhenVisible( passwordSelector, password );

		await this.clickThroughActions( submitSelector );
	}
}
