# Angular Sim Wizard

## Overview

This application is a front-end of the wizard for creating different types of project categories and the wizard is stored and displayed on tables on the home page. One of the tables is a pivot format of the wizard data from the database.

## Development with `angular-sim-wizard`

The following steps describe how you can test and develop this application further.

### Installing Dependencies

The application relies upon various Node.js tools, such as [Bower](https://bower.io/). You can install these by running:

```
npm install
```

This will also run Bower, which will download the Angular files needed for the application.


### Running the Application during Development

- Run `npm start`.
- Navigate your browser to [http://localhost:8000/](http://localhost:8000/) to see the application 
  running.
- Make sure that the port number in the web api url on config.json matches with the one of `SimWizardApi` app when it's running on the browser for successful http requests.
