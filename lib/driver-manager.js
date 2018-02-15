import config from 'config';

import webdriver from 'selenium-webdriver';
import chromedriver from 'chromedriver';
import rimraf from 'rimraf';
import ps from 'ps-node';

const procKilStartWaitMs = config.get( 'processKillStartWait' );

function killProcess( processName ) {
	ps.lookup( {
		command: processName,
	}, function( err, resultList ) {
		resultList.forEach( function( process ) {
			if (process) {

				console.log( 'PID: %s, COMMAND: %s, ARGUMENTS: %s', process.pid, process.command, process.arguments );
				ps.kill( process.pid );
			}
		} );
	} );
}

function timeout( ms ) {
	//console.log('sleeping');
	return new Promise( resolve => setTimeout( resolve, ms ) );
}

export async function cleanUp() {
	killProcess( 'WordPress.com' );
	await timeout( procKilStartWaitMs );
	rimraf( config.get( 'pathToSettings' ), function() {
	} );
	await timeout( 1000 );
}

export async function createDriver() {
	await cleanUp();
	await chromedriver.start();
	await timeout( procKilStartWaitMs );

	let driver = await new webdriver.Builder()
		.usingServer( 'http://localhost:9515' )
		.withCapabilities( {
			chromeOptions: {
				binary: config.get( 'path' ),
				'args': ['auto-open-devtools-for-tabs']
			}
		} )
		.forBrowser( 'electron' )
		.build();

	await driver.manage().setTimeouts( {implicit: config.get( 'explicitWaitMS' )} );
	return driver;

}




