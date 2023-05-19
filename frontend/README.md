# Front end interactive web app
A front end application built on reactjs that provides access to back-end functionalities by calling back-end APIs. The web application holds functionality to both module 1 and 2's backend service.

## Software Requirements:
- React 17.0.1 (64-bit)
#### The following required packages and their respective versions are specified in the requirements.txt file:
- Axios 0.21.1
- Bootstrap 4.5.3
- Node-sass 4.14.1
- Perfect-Scrollbar 1.5.0
- Reactstrap 8.7.1
- React-dom 17.0.1
- React-router-dom 5.2.0
- React-scripts 4.0.1


## Setting up the server locally
```
1. run "npm install" to download dependencies required to launch the front-end app
```
2. Run the app on your local server
```
npm start
```
**Note:** 
Google Chrome is recommended to deploy the application

## Module Details:
Acts as a gateway to backend functionality with an easy to understand and use UI.

The application is divided into 3 sections: Recipe OCR, website scraper and medicine database

Recipe OCR: is a front-end gateway to module 1's Recipe OCR implementations and services.

Website Scraper: Allows users to scrape medicine information with a medicine.org.uk medicine URL or a HTML local file that the user has to upload for scraping. In addition, users are able to search for interactions between two medicines via the interactions checker

Medicine Database: Includes functionality to search medicine information regarding a disease name and a matched interaction table that displays all related medicine according to the input Medicine ID.
