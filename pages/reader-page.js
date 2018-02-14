import {By} from 'selenium-webdriver';
import BasePage from './base-page.js';

const sideBarHeadingSelector = By.css( '.sidebar__heading' );

const writeButtonSelector = By.css( '.masterbar__item.masterbar__item-new' );
const profileButtonSelector = By.css( '.masterbar__item.masterbar__item-me' );

export default class ReaderPage extends BasePage {

	constructor( driver ) {
		super( driver );
	}

	async get() {
		await this.waitUntilElementIsNotVisible( sideBarHeadingSelector );
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
