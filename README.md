# SafePoint


Creation of this application was under the creative guidance and idea from Zach Lulavy
### Programmers:
Conrad Rolf,
Steven Petersen,
Touathi Vang, and
Maxwell Chrysler




## Purpose:


SafePoint is a web application (optimized for mobile use) meant to provide a quicker alternative for getting help at events such as concerts. Users register an account prior to attendance, and then when the time comes to reach out for help users select the event they are currently at.


### Installation Process


Required installation 
Node.js [Download](https://nodejs.org/en/download)


Create a database named `safepoint`.
Copy and paste code found in `database.sql` into PostgreSQL/Postico the tables, and dummy data if you'd like.


The queries in the tables.sql file are set up to create all the necessary tables and populate the needed data to allow the application to run correctly. The project is built on PostgreSQL, so you will need to make sure to have that installed. We recommend using Postico to run those queries as that was used to create the queries,
Open up your editor of choice and run an ` npm install`


Run `npm run server` in your terminal


Run `npm run client` in your terminal


The `npm run client` command will open up a new browser tab for you!




# Usage of Safepoint


The best way to demo the SafePoint app is to use Google Chrome, using the developer tools to change to mobile view. We used the iPhone SE ![Alt text](<./documentation/Screenshot 2023-08-10 at 10.27.22 AM.png>)


## User View
Then send out an SOS to reach out to the event staff which monitor said SOS to dispatch appropriate measures.
Upon login the user will be asked to select the event, afterwards the SOS button will appear


![Alt text](<./documentation/Screenshot 2023-08-10 at 10.13.06 AM.png>)


After submitting the emergency, Users will be prompted to select


## Admin View
This is an example of what each events page would look like.


![Alt text](<./documentation/Screenshot 2023-08-10 at 10.16.11 AM.png>)




Admins will be able to see all emergencies created by users at the event they have selected to view.




## Admin Update view
By clicking on each alert they will be able to update the status of the event and add notes to attach to the emergency


![Alt text](<./documentation/Screenshot 2023-08-10 at 9.32.35 AM.png>)




### Built with:


Javascript, HTML, React, CSS, Material UI, Postico, PostgreSQL, Node.js, Express, Sweet Alerts, Passport, Axios


### MIT License




Copyright (c) [2023] [Zach Lullavy]


Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:


The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.


THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.









