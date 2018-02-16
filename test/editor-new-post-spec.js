import {createDriver} from '../lib/driver-manager';
import config from 'config';
import LoginPage from '../pages/login-page';
import ReaderPage from '../pages/reader-page';
import EditorPage from '../pages/editor-page';
import PostPage from '../pages/post-page';
import {randomPhrase} from '../lib/helper';

describe( 'Write a new post:', function() {
	let driver;
	this.timeout( config.get( 'mochaTimeoutMS' ) );
	this.bailSuite( true );

	before( async function() {
		this.timeout( config.get( 'mochaTimeoutMS' ) );
		driver = await createDriver();

	} );

	after( async function() {
		await driver.quit();
	} );

	it( 'Can log in', async function() {
		let loginPage = new LoginPage( driver );
		await loginPage.get();
		await loginPage.login();
	} );

	it( 'Can see Reader Page after logging in', async function() {
		let readerPage = new ReaderPage( driver );
		await readerPage.get();
	} );

	it( 'Can click on the write button', async function() {
		let readerPage = new ReaderPage( driver );
		await readerPage.clickWriteAndSelectFirstSite();
	} );

	it( 'Can see the Editor page', async function() {
		let editorPage = new EditorPage( driver );
		await editorPage.get();
	} );

	let postTitle = randomPhrase();
	let postBody = randomPhrase();
	it( 'Can write and publish a new post', async function() {
		let editorPage = new EditorPage( driver );
		await editorPage.writePost( postTitle, postBody );
	} );

	it( 'Can see the new post', async function() {
		let postPage = new PostPage( driver );
		await postPage.get();
		await postPage.checkPost( postTitle, postBody );

	} );

	it( 'Can close the new post and navigate back to Reader page', async function() {
		let postPage = new PostPage( driver );
		await postPage.closePage();
		let readerPage = new ReaderPage( driver );
		await readerPage.get();
	} );

} );
