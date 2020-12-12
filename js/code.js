//Code for tribe

//Global Variables
//Database Login Details
var apiKey = "5e265bf14327326cf1c919e3";
var myDB = "pf2test-9f8d";
var myCollection = "test";

//Account Data Array (all users)
var accountsArray = [];

//User Account Local Object (1 user)
var localAccount;

//Journal Entry Array (1 user)
var entryArray = [];

//Current Date
var currentDate = new DateObject(new Date());

//Do stuff on document
$(document).ready(function () {

    //Hide Footer on load
    $("#app-footer").hide();
    $("#add-journal-btn").hide();

    //Load database
    getData();

    //Load Localstorage
    getLocalData();

    //Insert code here for login testing

    //jQuery to display data
    $("profile-name").text();

    //jQuery Listeners
    //Login Button
    $("body").on("click", "#login-btn", function () {
        const alert = document.createElement('ion-alert');
        alert.cssClass = 'tribe-alert';
        alert.header = 'Hey!';
        alert.buttons = ['OK'];

        if ($("#login-email:nth-child(2)").val() == "") {
            alert.message = "Please provide your login email";

            document.body.appendChild(alert);
            return alert.present();
        }

        else if ($("#login-password:nth-child(3)").val() == "") {
            alert.message = "Please provide your login password";

            document.body.appendChild(alert);
            return alert.present();
        }

        else {
            displayLoader("login");
        }
    });

    //Journal Submit
    $("body").on("click", "#journal-submit", function () {

        //Storing input valuesa as variables
        var journalName = $("#journal-name:nth-child(2)").val();
        var journalDetails = $("#journal-details:nth-child(2)").val();
        var journalImage = $("#journal-image:nth-child(2)").val();

        //Verify if entry name is blank  
        if (journalName == "") {
            const alert = document.createElement('ion-alert');
            alert.cssClass = 'tribe-alert';
            alert.header = 'Hey!';
            alert.message = "You can't leave the entry name empty.";
            alert.buttons = ['OK'];

            document.body.appendChild(alert);
            return alert.present();
        }

        //Submit new entry
        else {

            //Updating local user
            var newEntry = new JournalEntry(journalName, currentDate, journalDetails, journalImage);
            localAccount.journalEntries.push(newEntry);

            console.log(localAccount.journalEntries);

            //Updating local user in the account data
            //Look for user in array
            for (var i = 0; i < accountsArray.length; i++) {
                if (accountsArray[i].id == localAccount.id) {
                    accountsArray.splice(i, 1, localAccount);

                    console.log(accountsArray);

                    displayLoader("new-entry");

                    //Sending data to database
                    updateLocalData(localAccount);
                    updateData(accountsArray);
                }
            }


        }
    });

    //Tab Buttons
    $("body").on("click", "ion-tab-button", function () {

        //Home
        if ($(this).attr("id") == "tab-button-home") {
            $("#home-icon").attr("name", "home");
            $("#food-icon").attr("name", "restaurant-outline");
            $("#alarm-icon").attr("name", "alarm-outline");
            $("#profile-icon").attr("name", "person-circle-outline");
        }

        //Food
        else if ($(this).attr("id") == "tab-button-food") {
            $("#home-icon").attr("name", "home-outline");
            $("#food-icon").attr("name", "restaurant");
            $("#alarm-icon").attr("name", "alarm-outline");
            $("#profile-icon").attr("name", "person-circle-outline");
        }

        //Alarm
        else if ($(this).attr("id") == "tab-button-alarm") {
            $("#home-icon").attr("name", "home-outline");
            $("#food-icon").attr("name", "restaurant-outline");
            $("#alarm-icon").attr("name", "alarm");
            $("#profile-icon").attr("name", "person-circle-outline");
        }

        //Profile
        else if ($(this).attr("id") == "tab-button-profile") {
            $("#home-icon").attr("name", "home-outline");
            $("#food-icon").attr("name", "restaurant-outline");
            $("#alarm-icon").attr("name", "alarm-outline");
            $("#profile-icon").attr("name", "person-circle");
        }

    })


})

//Functions
//Function to update local data
function updateLocalData(updatedAccount) {
    var submitData = JSON.stringify(updatedAccount);
    localStorage.setItem("storedLogin", submitData);
}

//Function to get local data
function getLocalData() {
    localAccount = JSON.parse(localStorage.getItem("storedLogin"));
    if (localAccount) {
        loadApp();
    }

    else {
        loadLogin();
    }
}

//Function to update database
function updateData(updatedArray) {

    //Object to be submitted for POST
    var submitData = {
        "accountsArray": updatedArray
    };

    //Settings config to PUT data
    //NOTE: url will change if you delete the restdb data entry, only do so if of right mind and clear understanding
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://" + myDB + ".restdb.io/rest/" + myCollection + "/5fd3a36f6c39096d00016ece",
        "method": "PUT",
        "headers": {
            "content-type": "application/json",
            "x-apikey": apiKey,
            "cache-control": "no-cache"
        },
        "processData": false,
        "data": JSON.stringify(submitData)
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
        console.log("Data successfully updated");
    });
}

//Function to retrieve data
function getData() {
    //Settings config to GET data
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://" + myDB + ".restdb.io/rest/" + myCollection + "",
        "method": "GET",
        "headers": {
            "content-type": "application/json",
            "x-apikey": apiKey,
            "cache-control": "no-cache"
        }
    }

    $.ajax(settings).done(function (data) {
        console.log("Data successfully retrieved.");
        console.log(data);

        accountsArray = data[0].accountsArray;
    });
}

//========================================
//Area for loading login/app
//Function that loads html
function loadApp() {
    $("ion-app").load("main-app.html");

    for(var i = 0; i < localAccount.journalEntries.length; i++){
        

    }
};

function loadLogin() {
    $("ion-app").load("login.html");
}
//========================================

//User login function
function login() {
    //Alert for invalid logins
    const alert = document.createElement('ion-alert');
    alert.cssClass = 'tribe-alert';
    alert.header = 'Whoops';
    alert.buttons = ['OK'];

    //Run login details through all accounts in database
    for (var i = 0; i < accountsArray.length; i++) {
        if ($("#login-email:nth-child(2)").val() == accountsArray[i].email) {

            if ($("#login-password:nth-child(3)").val() == accountsArray[i].password) {
                //This path is for successful login
                //Stringify accountsArray
                localAccount = accountsArray[i];
                updateLocalData(localAccount);

                //NOTE: experiment with location.replace and windows.location
                loadApp();
            }

            //If email does not have a matching password run error message
            else {
                if (i == (accountsArray.length - 1)) {
                    alert.message = "This isn't the right password for the account.";

                    document.body.appendChild(alert);
                    return alert.present();
                }
            }

        }

        //If all accounts do not have a matching email run error message
        else {
            if (i == (accountsArray.length - 1)) {
                alert.message = "We don't have your email in our records.";

                document.body.appendChild(alert);
                return alert.present();
            }
        }
    }

    $("#login-password:nth-child(2)").val();
}

//Asynchronous loading function
async function displayLoader(reason) {
    const loading = document.createElement('ion-loading');

    loading.cssClass = 'my-custom-class';
    loading.message = 'Please wait...';
    loading.duration = 2000;

    document.body.appendChild(loading);
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    if (reason == "login") {
        login();
    }

    else if (reason == "register") {
        register();
    }

    else if (reason == "new-entry") {
        //Present Success Alert
        const alert = document.createElement('ion-alert');
        alert.cssClass = 'tribe-alert';
        alert.header = 'Done!';
        alert.message = "New journal entry added, yay!";
        alert.buttons = ['OK'];

        document.body.appendChild(alert);
        return alert.present();
    }
}

//Object Templates

//Date Object Template
function DateObject(dateObj) {
    this.dateObj = dateObj;
    this.dayOfTheWeek = function () {
        var dayArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var dayIndex = this.dateObj.getDay();
        return dayArray[dayIndex];
    };
    this.day = dateObj.getDate();
    this.month = dateObj.getMonth() + 1;
    this.year = dateObj.getFullYear();
    this.date = function () {
        //Convert int to str for concantenation
        var dayStr = this.day.toString();
        var monthStr = this.month.toString();
        var yearStr = this.year.toString();

        var dateReturn = parseInt(dayStr + monthStr + yearStr);

        return dateReturn;
    };
};

//Account Object Template
function UserAccount(id, email, password, firstName, lastName, child, journalEntries) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.child = child;
    this.journalEntries = journalEntries;
};

//Child Object Template
function Child(id, name, dob, gender, weight, height) {
    this.id = id;
    this.name = name;
    this.dob = dob;
    this.gender = gender;
    this.age = function () {

        //Find difference in years
        var yearDiff = currentDate.year - this.dob.year;

        //Find difference in years
        var monthDiff = currentDate.month - this.dob.month;

        //If month in entryDate is before month in childDOB
        if (monthDiff < 0) {
            monthDiff = 12 + monthDiff;
            yearDiff -= 1;
        }

        //Variable to return at the end
        var ageReturn;

        //If child is older than 18 months
        if (yearDiff > 1 && monthDiff > 6) {
            ageReturn = `${yearDiff} years ${monthDiff} months`;
        }

        else {
            ageReturn = `${monthDiff + yearDiff * 12} months`;
        }

        return ageReturn;
    };
    this.weight = weight;
    this.height = height;
};

//Journal Object Template
function JournalEntry(entryName, entryDate, entryText, entryMedia) {
    this.entryName = entryName;
    this.entryDate = entryDate;
    this.entryAge = function () {

        //Find difference in years
        var yearDiff = entryDate.year - childDOB.year;

        //Find difference in years
        var monthDiff = entryDate.month - childDOB.month;

        //If month in entryDate is before month in childDOB
        if (monthDiff < 0) {
            monthDiff = 12 + monthDiff;
            yearDiff -= 1;
        }

        //Variable to return at the end
        var ageReturn;

        //If child is older than 18 months
        if (yearDiff > 1 && monthDiff > 6) {
            ageReturn = `${yearDiff} years ${monthDiff} months`;
        }

        else {
            ageReturn = `${monthDiff + yearDiff * 12} months`;
        }

        return ageReturn;
    };
    this.entryText = entryText;
    this.entryMedia = entryMedia;
};
