# SeaCode-Bank-WebApp
SeaCode Bank Web App for ICS 427

## What is complete so far
- Setting up the basic app code and mongodb atlas
- Coding for Basic UI
- ESLint plugin with IntelliJ
- Installation of React and Meteor plugins for ESLint

## What is pending
- Front end and mockup pages
- Coding for Basic UI
- User database
- Encryptions and Decryptions
- Deposit function
- Withdrawal function
- Cookies Pop-up function
- Admin approval function
- Signup, Signin function
- Download Bank Statement function

**Mirabela Medallon**
- Worked on: Setting up the basic app code and mongodb atlas
- Next: Front end and mockup pages

**Tyler Chinen**
- Worked on: Coding for Basic UI
- Next: Coding for Basic UI

**Wei Leong Hiew**
- Worked on: ESLint plugin with IntelliJ
- Next: Deposit function

**Patima Poochai**
- Worked on: Installation of React and Meteor plugins for ESLint
- Next: User database

## Part II Updates: 6/7/20-6/14/20
### Progress
- Added UI utilizing Semantic UI React
  - Home page
  - Dashboard (History, Deposit, Withdraw, Wire)
  - Nav bar
  - Sign in page
  - Sign up page
  - Withdraw page
- Add basic Rest APIs
  - Startup database seeding
  - User account creation endpoint, with input validation
  - Password encryption
  - User roles

### [Link to our repository](https://github.com/tylerchinen/SeaCode-Bank-WebApp)

### Pending
- Authentication using Passport
- Backend balance checking endpoint
- Admin API
- Withdrawl, transfer API
- Transaction validation and logging

### Roles and Responsibilities
**Mirabela Medallon**
- New completions: UIs for: Dashboard page, Navbar, Home page, Withdraw page
- Worked on: Setting up the basic app code and mongodb atlas
- Next: Front end and mockup pages

**Tyler Chinen**
- New completions: Completed UI for Sign in and Sign up pages.
- Worked on: Coding for Basic UI, Sign in, and Sign up pages
- Next: Valdiation for Sign in and Sign up forms, Public Disclosure

**Wei Leong Hiew**
- New completions: Deposit function and web templates
- Worked on: ESLint plugin with IntelliJ
- Next: Frontend integration

**Patima Poochai**
- New completions: Backend user database and API, Endpoints security
- Worked on: Installation of React and Meteor plugins for ESLint
- Next: Authentication, access control


## Part III Updates: 6/15/20-6/21/20
### Progress
- Terms and conditions
- Cookie popup
- Sign up/in integration
- Authentication
- Protected API endpoints
- Transfer API
- Most UI is done
### Pending
- Withdraw functionality
- Deposit Functionality
- Wire Functionality
- Account History functionality

### Roles and Responsibilities
**Mirabela Medallon**
- New completions: UIs for: Deposit, Wire Funds, Account History
- Next: UI Testing, Connecting Backend to Frontend, Proper Functionality

**Tyler Chinen**
- New completions: Converting Sign-up validations from Bootstrap to Semantic-ui-react, cookies popup, Terms and Conditions
- Worked on: Added additional features to Sign-up (converted validations, added terms and conditions, changed formatting)
- Next: Backend integration with frontend

**Wei Leong Hiew**
- New completions: Deposit function and web templates
- Worked on: ESLint plugin with IntelliJ
- Next: Frontend integration

**Patima Poochai**
- New completions: Authentication, protected routing, access control, funds transfer, account balance
- Worked on: Installation of React and Meteor plugins for ESLint Backend, user database, and API Endpoints security
- Next: Deposit validation, integration

### [Link to our repository](https://github.com/tylerchinen/SeaCode-Bank-WebApp)

## Part IV Updates/Final: 6/22/20-7/3/20

### Technical Notes
#### Specifications for Use / Installation
To run our application you will need to have an IDE downloaded that is compatible with Javascript (we recommend IntelliJ Idea or Visual Studio Code), you will also need to download NPM, and Node.js.
[You can also view our wiki page which has more detailed instructions](https://tylerchinen.github.io/seabank.github.io)

1. You will need an IDE in order to access the code for our application and to ultimately run it. 
   - **Intellij Idea**
     - If you are a student you can sign up for a [JetBrains student license here](https://www.jetbrains.com/community/education/#students) which will allow you to obtain a free student license for IntelliJ Idea.
       - Next you will need to [download IntelliJ Idea](https://www.jetbrains.com/idea/download/#section=windows). [Here are more specific instructions for installation](http://courses.ics.hawaii.edu/ics314s19/morea/development-environments/experience-install-intellij-idea.html)
   - **Visual Studio Code**
     - Visual Studio Code is free to download and [instructions can be found here](https://code.visualstudio.com/docs/setup/windows).
     
2. After you have an IDE that is compatible with Javascript you will need to download NPM and node.js in the terminal/command prompt. [Instructions can be found here](https://www.npmjs.com/get-npm).
   - After installation you can use ``` node -v ``` and ``` node -v ``` in the terminal/command prompt to ensure that they are both installed. The result should be the version that is downloaded.
   
3. Once you have the proper tools installed you will then need to download our code from our [GitHub](https://github.com/tylerchinen/SeaCode-Bank-WebApp) by clicking the *clone* button and then either *download in Desktop* or *download zip*. Depending on which IDE you chose the instructions differ slightly as follows:
   - If you wish to use **download in desktop** you will need to [download GitHub Desktop](https://desktop.github.com/). Although this takes an extra step it will make accessing the code much easier. 
   - Once you have GitHub Desktop downloaded you will be able to *clone* and *download in desktop* which will open the GitHub Desktop.
   -  Next you will need to open either *IntelliJ Idea* or *Visual Studio Code*
      - **IntelliJ Idea**
        - Select *Open or Import* or just *File - Open* if IntelliJ is already open. 
        - Next you will need to navigate to the GitHub folder in your computer then the project folder which should be called *SeaCode-Bank-WebApp*.
        - Once selected you should be able to open the code view the entire framework of our application.
        
      - **Visual Studio Code**
        - Visual Studio will not require GitHub however, it makes finding the project much easier if you have already cloned and opened it GitHub Desktop.
        - Similarly to IntelliJ you can navigate to *File-Open File-* then you will need to locate the GitHub folder in our computer then find the project folder labeled *SeaCode-Bank-WebApp*
        - Once selected you should be able to open the code view the entire framework of our application.
   - If you wish to use **download zip**
     - You will need to [unzip the file](https://www.windowscentral.com/how-zip-and-unzip-files-windows-10) to your location of choice.
     -  Next you will need to open either *IntelliJ Idea* or *Visual Studio Code*

      - **IntelliJ Idea**
        - Select *Open or Import* or just *File - Open* if IntelliJ is already open. 
        - Next you will need to navigate to the folder/ location that you saved the unzipped file to then into the project folder which should be called *SeaCode-Bank-WebApp*.
        - Once selected you should be able to open the code view the entire framework of our application.
        
      - **Visual Studio Code**
        - Similarly to IntelliJ you can navigate to *File - Open File -* then you will need to navigate to the folder/ location that you saved the unzipped file to then into the project folder which should be called *SeaCode-Bank-WebApp*.
        - Once selected you should be able to open the code view the entire framework of our application.

4. Now that you are able to access the project code locally you should be able to open the built-in terminals within the IDEs through
   - **IntelliJ Idea** - *View - Tools Window - Terminal* (IntelliJ may require you to activate this plugin feature through: file-settings-plugins then use the search bar to find terminal and click the checkbox to activate it, this will likely prompt you to restart IntelliJ as a result. However, upon restarting you should be able to access the terminal through the view tab shortcut.)

   - **Visual Studio Code** - *View - Terminal*
     
5. With the terminal in the IDE that you have chosen you will need to navigate into the *webapp* folder by using the ```cd webapp``` command (this will open the frontend of our application).
    
   - Then you will be need to run ```npm install``` after this completes you will need to run ```npm start```
   - Once this completes the application should open in the *localhost:3000* 

6. Once again, within the terminal in the IDE that you have chosen you will now need to add another terminal tab by using the *'+'* button (both are similar in either IntelliJ or Visual Studio. Then you will need to navigate into the *backend* folder by using the ```cd backend``` command (this will open the backend of our application).
   - Then you will be need to run ```npm install``` again and after this completes you will need to run ```npm start```
   - Once this completes the terminal should prompt you stating that the *localhost:3000* is busy, select 'y' to allow the application to run on another host number.
   - You should now have our application up and running - Happy Banking!


### Brief Closing Thoughts
Thoughts on the outcome of our program looking back at our work including: the challanges, surprises, important achievements we are proud of, dissappointments, disclaimers/caveats.

### Roles and Responsibilites
**Mirabela Medallon**
- Worked on:

**Tyler Chinen**
- Worked on: Integrating the back end to the front end for the Sign up page, Created the Wiki Page.

**Wei Leong Hiew**
- Worked on:

**Patima Poochai**
- Worked on:

### [Link to our Final Repository](https://github.com/tylerchinen/SeaCode-Bank-WebApp)
### [Link to the Final Project Documentation File Within the Repository]()
### [Link to the Release Version of our Program]()
### [Link to our Wiki](https://tylerchinen.github.io/seabank.github.io/)
