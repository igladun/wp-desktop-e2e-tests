import {By, until} from 'selenium-webdriver';
import BasePage from './base-page.js';
import config from 'config';

const postTitleSelector = By.css( '.textarea-autosize.editor-title__input' );
const postBodySelector = By.css( '#tinymce' );
const publishButtonSelector = By.css( '.button.editor-publish-button.is-primary' );
const publishNowButtonSelector = By.xpath( '//button[text()="Publish!"]' );


export default class EditorPage extends BasePage {

	constructor( driver ) {
		super( driver );
	}

	async get() {
		await this.driver.wait( until.elementIsVisible(
			this.driver.findElement( postTitleSelector ) ), config.get( 'explicitWaitMS' ) );

	}

	async writePost( title, text ) {
		await this.setWhenVisible( postTitleSelector, title );

		await  this.driver.switchTo().frame( 0 );
		await this.setWhenVisible( postBodySelector, text );

		await this.driver.switchTo().defaultContent();

		await this.driver.sleep( 5000 );//todo fix this sleep
		await this.clickWhenVisible( publishButtonSelector );
		await this.clickWhenVisible( publishNowButtonSelector );

		}

}
