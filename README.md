# ONE-STOP
This is a monorepo containing 3 different projects as follows:
- frontend
- backend

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

## Backend

### Setting up the server locally
1. Move into the required directory
```
cd backend
```
2. Create a python virtual environment
3. Activate your virtual environment
4. Install all the required packages and dependencies
```
pip install -r requirements.txt
```
5. Run the app on your local server
```
python routes.py
```