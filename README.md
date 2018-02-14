# WordPress.com desktop app End to End Tests

Automated end-to-end acceptance tests for the [wp-desktop](https://github.com/Automattic/wp-desktop) WordPress.com client. 


## Pre-requisites


### Install NodeJS

```
brew install node #MacOS

```

### Install dependencies
```
npm install
```

### Install wp-desktop app for macOS
[https://github.com/Automattic/wp-desktop/releases](https://github.com/Automattic/wp-desktop/releases)

### Confguration
In `config/default.json` change next :
* `pathToSettings` path to your WordPress.com folder under Application Support folder e.g. `/Users/igorgladun/Library/Application Support/WordPress.com`
* `username` your WordPress.com username
* `username` your WordPress.com password

## Running tests
`npm test`
