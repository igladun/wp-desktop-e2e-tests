import {createDriver} from '../lib/driver-manager';
import config from 'config';
import LoginPage from '../pages/login-page';
import ReaderPage from '../pages/reader-page';
import ProfilePage from '../pages/profile-page';

describe( 'Logging In and Out:', function() {
	let driver;
	this.timeout( config.get( 'mochaTimeoutMS' ) );
	this.bail( true );

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

	it( 'Can open Profile page', async function() {
		let readerPage = new ReaderPage( driver );
		await readerPage.openProfile();
		let profilePage = new ProfilePage( driver );
		await profilePage.get();
	} );

	it( 'Can click on sign out button', async function() {
		let profilePage = new ProfilePage( driver );
		await profilePage.signOut();
	} );

	it( 'Can see the Login page', async function() {
		let loginPage = new LoginPage( driver );
		await loginPage.get();
	} );

} );
