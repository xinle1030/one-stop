# FIT3170-Data-Scraping-and-Mining
This is a monorepo containing 3 different projects as follows:
- frontend
- scraping-tool-backend
- medicine-database-backend

## Frontend
A front end application built on reactjs that provides access to back-end functionalities by calling back-end APIs. The web application holds functionality to both module 1 and 2's backend service.

### Software Requirements:
React 17.0.1 (64-bit)
#### The following required packages and their respective versions are specified in the requirements.txt file:
- Axios 0.21.1
- Bootstrap 4.5.3
- Node-sass 4.14.1
- Perfect-Scrollbar 1.5.0
- Reactstrap 8.7.1
- React-dom 17.0.1
- React-router-dom 5.2.0
- React-scripts 4.0.1

### Setting up the server locally
1. run "npm install" to download dependencies required to launch the front-end app
Run the app on your local server
npm start
Note: Google Chrome is recommended to deploy the application

Details of this module can be found in the readme of its directory.

## Scraping Tool Backend
A scraping tool backend built using Django providing two functionalities, namely, the scraping of medicinal data from medicines.org.uk and automated drug interaction checking from https://go.drugbank.com/drug-interaction-checker.

### Software Requirements:
- Python 3.8 (64-bit)
#### The following required packages and their respective versions are specified in the requirements.txt file:
- Django 3.2.9
- Django rest framework 3.13.1
- Django cors headers 3.10.0
- Spacy 2.2.1
- Beautifulsoup 4.11.1
- Gensim 4.2.0
- en_ner_bc5cdr_md v0.2.4
- en_ner_bionlp13cg_md v0.2.4
- en_core_web_sm-2.2.0
- Negspacy 0.1.9
- Selenium 4.5.0
- Webdriver-manager 3.8.3

### Setting up the server locally
1. Move into the required directory
```
cd scraping-tool-backend
```
2. Create a python virtual environment
3. Activate your virtual environment
4. Install all the required packages and dependencies
```
pip install -r requirements.txt
```
5. Run the app on your local server
```
python manage.py runserver
```

**Note:** On Windows, visual studio c++ build tools will need to be downloaded: https://stackoverflow.com/a/49986365

Google Chrome will also need to be download to perform selenium automation.

If the project builds successfully, the application should be running on localhost:8000

Details of this module can be found in the readme of its directory.


## Medicine Database Backend
A REST API built using SpringBoot to interface with medicine data stored in a database. Our team recommends IntelliJ as the IDE to be used for easy package and dependency management.

### Software Requirements:
- Java 17
#### The following required packages and their respective versions are specified in the pom.xml file:
- springboot 2.7.2
- org.postgresql 42.5.0
- org.projectlombok 1.18.24

A postgresql database will need to be configured which contains data populated from the scraping tool. This will need to be configured in the application.properties file as such:
```
spring.datasource.url=DATASOURCE_URL
spring.datasource.username=DATASOURCE_USERNAME
spring.datasource.password=DATASOURCE_PASSWORD
```
*Note:* Prefix your datasource url with jdbc:postgresql:// and suffix it with :5432/postgres

### Setting up the server locally
1. Open the medicine-database-backend directory as a project in IntelliJ.
2. Build project.
3. Click on run.
If the project builds successfully, the application should be running on localhost:8080

Details of this module can be found in the readme of its directory.

