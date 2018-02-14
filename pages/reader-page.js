import {By, until} from 'selenium-webdriver';
import BasePage from './base-page.js';
import config from 'config';

const sideBarHeadingSelector = By.css( '.sidebar__heading' );

const writeButtonSelector = By.css( '.masterbar__item.masterbar__item-new' );
const profileButtonSelector = By.css( '.masterbar__item.masterbar__item-me' );

export default class ReaderPage extends BasePage {

	constructor( driver ) {
		super( driver );
	}

	async get() {
		await this.driver.wait( until.elementIsVisible(
			this.driver.findElement( sideBarHeadingSelector ) ), config.get( 'explicitWaitMS' ) );

	}

	async openProfile() {
		await this.driver.sleep( 3000 );//todo investigate
		await this.driver.findElement( profileButtonSelector ).click();
	}

	async clickWriteAndSelectFirstSite() {
		await this.driver.findElement( writeButtonSelector ).click();
		await this.driver.findElement( By.css( '.site__content' ) ).click();
	}
}
