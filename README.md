
# EComm Backend




# Project Setup Guide
This guide will walk you through setting up and running the project locally after downloading it from the GitHub repository.

## Instructions: 
### 1. Download and Extract:
* Download the project by clicking on the "Code" button and selecting "Download ZIP".
* Extract the downloaded ZIP file to your desired location.

### 2. Open in VS Code:
* Open the extracted folder in Visual Studio Code (VS Code) or any other preferred code editor.

### 3. Install Dependencies and Configure .env file:
* Open a terminal in VS Code and run the following command to install the required dependencies:
```
npm install
```
* Create a .env file in the root directory of the project. Copy the following details into the .env file:
```
PORT=5000
CORS_ORIGIN=*
MONGO_URI=
JWT_SECRET=
COOKIE_SECRET=
```
Replace MONGO_URI with mongodb atlas URI or local mongodb URI, JWT_SECRET and COOKIE_SECRET with your own secret keys.

### 4. Run the Project:
* After setting up the .env file, run the project locally using the following command:
```
npm run dev
```
### 5. Access Project Routes:
* Once the project is running locally, refer to the project documentation for available routes and functionalities.
* Use the provided routes and functionalities to interact with the project as documented.
