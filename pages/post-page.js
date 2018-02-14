import {By, until} from 'selenium-webdriver';
import BasePage from './base-page.js';
import config from 'config';

const editButtonSelector = By.css( '.button.web-preview__edit' );
const postTitleSelector = By.css( '.entry-title' );
const postBodySelector = By.css( '.entry-content > p' );
const closeButtonSelector = By.css( '.button.web-preview__close.is-borderless' );

export default class PostPage extends BasePage {

	constructor( driver ) {
		super( driver );
	}

	async get() {
		await this.driver.wait( until.elementIsVisible(
			this.driver.findElement( editButtonSelector ) ), config.get( 'explicitWaitMS' ) );

	}

	async checkPost( title, text ) {
		await  this.driver.switchTo().frame( 1 );
		await this.driver.wait( until.elementTextContains(
			this.driver.findElement( postTitleSelector ), title ), config.get( 'explicitWaitMS' ) );
		await this.driver.wait( until.elementTextContains(
			this.driver.findElement( postBodySelector ), text ), config.get( 'explicitWaitMS' ) );
		await this.driver.switchTo().defaultContent();
	}

	async closePage() {
		await this.driver.findElement( closeButtonSelector ).click();
	}
}
