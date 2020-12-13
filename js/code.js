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

//Current Journal Entry
var currentEntry;

//Current Date
var currentDate = new DateObject(new Date());

//Month Arrays
var monthArrayShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", 'Dec'];

//Booleans
var isProfileLoaded = false;

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

    //jQuery Listeners
    //Login Button
    $("body").on("click", "#login-btn", function () {
        const alert = document.createElement('ion-alert');
        alert.cssClass = 'tribe-alert';
        alert.header = 'Hey!';
        alert.buttons = ['OK'];

        if ($("#login-email").val() == "") {
            alert.message = "Please provide your login email.";

            document.body.appendChild(alert);
            return alert.present();
        }

        else if ($("#login-password").val() == "") {
            alert.message = "Please provide your login password.";

            document.body.appendChild(alert);
            return alert.present();
        }

        else {
            displayLoader("login");
        }
    });

    //Register Button
    $("body").on("click", "#register-btn1", function () {
        const alert = document.createElement('ion-alert');
        alert.cssClass = 'tribe-alert';
        alert.header = 'Hey!';
        alert.buttons = ['OK'];

        if ($("#register-email").val() == "") {
            alert.message = "You can't leave your email empty.";

            document.body.appendChild(alert);
            return alert.present();
        }

        else if ($("#register-password").val() == "") {
            alert.message = "You can't leave your password empty.";

            document.body.appendChild(alert);
            return alert.present();
        }

        else if ($("#register-first-name").val() == "") {
            alert.message = "You can't leave your first name empty.";

            document.body.appendChild(alert);
            return alert.present();
        }

        else if ($("#register-last-name").val() == "") {
            alert.message = "You can't leave your last name empty.";

            document.body.appendChild(alert);
            return alert.present();
        }

        else {
            displayLoader("register");
        }
    });

    //Logout
    $("body").on("click", "#logout-btn", function () {
        const alert = document.createElement('ion-alert');
        alert.cssClass = 'tribe-alert';
        alert.header = 'Hey!';
        alert.message = "You're about to log out, are you sure about that?";
        alert.buttons = [
            {
                text: 'Cancel',
                role: 'cancel',
                cssClass: 'secondary'
            },

            {
                text: 'Sign Out',
                handler: () => {
                    displayLoader("logout");
                }
            }
        ];

        document.body.appendChild(alert);
        return alert.present();
    });

    //Edit Account Details
    $("body").on("click", "#edit-account-submit", function () {

        const alert = document.createElement('ion-alert');
        alert.cssClass = 'tribe-alert';
        alert.header = 'Hey!';
        alert.buttons = ['OK'];

        //Storing input values as variables
        var accountFirstName = $("#edit-account-firstname").val();
        var accountLastName = $("#edit-account-lastname").val();
        var accountEmail = $("#edit-account-email").val();
        var accountPassword = $("#edit-account-password").val();

        //Verify if entry name is blank  
        if (accountFirstName == "") {
            alert.message = "You can't leave your first name empty.";

            document.body.appendChild(alert);
            return alert.present();
        }

        else if (accountLastName == "") {
            alert.message = "You can't leave your last name empty.";

            document.body.appendChild(alert);
            return alert.present();
        }

        else if (accountEmail == "") {
            alert.message = "You can't leave your email empty.";

            document.body.appendChild(alert);
            return alert.present();
        }

        else if (accountPassword == "") {
            alert.message = "You can't leave your password empty.";

            document.body.appendChild(alert);
            return alert.present();
        }

        //Save Changes
        else {

            //Updating local data
            localAccount.firstName = accountFirstName;
            localAccount.lastName = accountLastName;
            localAccount.email = accountEmail;
            localAccount.password = accountPassword;

            updateLocalData(localAccount);

            //Updating database
            //Look for user in array
            for (var i = 0; i < accountsArray.length; i++) {
                if (accountsArray[i].id == localAccount.id) {
                    accountsArray.splice(i, 1, localAccount);

                    console.log(accountsArray);

                    displayLoader("edit-account");

                    //Sending data to database
                    updateData(accountsArray);
                }
            }
        }
    });

    //Edit Child Details
    $("body").on("click", "#edit-child-submit", function () {

        const alert = document.createElement('ion-alert');
        alert.cssClass = 'tribe-alert';
        alert.header = 'Hey!';
        alert.buttons = ['OK'];

        //Storing input values as variables
        var childName = $("#edit-child-name").val();
        var childDOB = $("#edit-child-dob").val();
        var childGender = $("#edit-child-gender").val();
        var childWeight = $("#edit-child-weight").val();
        var childHeight = $("#edit-child-height").val();

        //Verify if entry name is blank  
        if (childName == "") {
            alert.message = "You can't leave your child's name empty.";

            document.body.appendChild(alert);
            return alert.present();
        }

        else if (childDOB == "") {
            alert.message = "You can't leave your child's date of birth empty.";

            document.body.appendChild(alert);
            return alert.present();
        }

        else if (childGender == "") {
            alert.message = "You can't leave your child's gender empty.";

            document.body.appendChild(alert);
            return alert.present();
        }

        else if (childWeight == "") {
            alert.message = "You can't leave your child's weight empty.";

            document.body.appendChild(alert);
            return alert.present();
        }

        else if (childHeight == "") {
            alert.message = "You can't leave your child's height empty.";

            document.body.appendChild(alert);
            return alert.present();
        }

        //Save Changes
        else {

            //Updating local data
            localAccount.child.childName = childName;

            var submitDate = new Date(`${childDOB.slice(0, 4)}, ${childDOB.slice(5, 7)}, ${childDOB.slice(8, 10)}`);
            localAccount.child.dob = new DateObject(submitDate);

            localAccount.child.gender = childGender;
            localAccount.child.weight = childWeight;
            localAccount.child.height = childHeight;

            updateLocalData(localAccount);

            //Updating database
            //Look for user in array
            for (var i = 0; i < accountsArray.length; i++) {
                if (accountsArray[i].id == localAccount.id) {
                    accountsArray.splice(i, 1, localAccount);

                    console.log(accountsArray);

                    displayLoader("edit-child");

                    //Sending data to database
                    updateData(accountsArray);
                }
            }
        }
    });

    //Journal Submit
    $("body").on("click", "#journal-submit", function () {

        //Storing input values as variables
        var journalName = $("#journal-name").val();
        var journalDetails = $("#journal-details").val();
        var journalImage = $("#journal-image").val();

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
            updateLocalData(localAccount);

            console.log(localAccount.journalEntries);

            //Updating local user in the account data
            //Look for user in array
            for (var i = 0; i < accountsArray.length; i++) {
                if (accountsArray[i].id == localAccount.id) {
                    accountsArray.splice(i, 1, localAccount);

                    console.log(accountsArray);

                    displayLoader("new-entry");

                    //Sending data to database
                    updateData(accountsArray);
                }
            }


        }
    });

    //Journal Edit
    $("body").on("click", "#journal-edit", function () {

        //Storing input values as variables
        var journalName = $("#journal-name").val();
        var journalDetails = $("#journal-details").val();
        var journalImage = $("#journal-image").val();

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
            var updatedEntry = new JournalEntry(journalName, currentDate, journalDetails, journalImage);

            localAccount.journalEntries[currentEntry] = updatedEntry;
            updateLocalData(localAccount);

            console.log(localAccount.journalEntries);

            //Updating local user in the account data
            //Look for user in array
            for (var i = 0; i < accountsArray.length; i++) {
                if (accountsArray[i].id == localAccount.id) {
                    accountsArray.splice(i, 1, localAccount);

                    console.log(accountsArray);

                    displayLoader("update-entry");

                    //Sending data to database
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

            //Add journal entries to profile
            if (isProfileLoaded == false) {
                displayLoader("load-profile");
            }
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
    dataGet = JSON.parse(localStorage.getItem("storedLogin"));
    if (dataGet) {

        localChild = new Child(dataGet.child.id, dataGet.child.name, dataGet.child.dob, dataGet.child.gender, dataGet.child.weight, dataGet.child.height);
        localAccount = new UserAccount(dataGet.id, dataGet.email, dataGet.password, dataGet.firstName, dataGet.lastName, localChild, dataGet.journalEntries);

        console.log(localChild);
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
        if ($("#login-email").val() == accountsArray[i].email) {

            if ($("#login-password").val() == accountsArray[i].password) {
                //This path is for successful login
                //Stringify accountsArray
                localAccount = accountsArray[i];
                updateLocalData(localAccount);

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

//User Register Function
function register() {
    var newEmail = $("#register-email").val();
    var newPassword = $("#register-password").val();
    var newFirstName = $("#register-first-name").val();
    var newLastName = $("#register-last-name").val();

    var templateChild = new Child(0, "Child Name", currentDate, "Gender", "Weight (kg)", "Height (cm)");

    var newAccount = new UserAccount(accountsArray.length, newEmail, newPassword, newFirstName, newLastName, templateChild, []);

    accountsArray.push(newAccount);

    updateData(accountsArray);
    localAccount = newAccount;
    updateLocalData(localAccount);

    //Alert for successful registration
    const alert = document.createElement('ion-alert');
    alert.cssClass = 'tribe-alert';
    alert.header = 'Yay!';
    alert.buttons = ['OK'];


    loadApp();
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

    else if (reason == "logout") {
        //Removing local login info
        localStorage.removeItem("storedLogin");
        localAccount = {};

        loadLogin();
    }

    else if (reason == "edit-account") {
        //Present Success Alert
        const alert = document.createElement('ion-alert');
        alert.cssClass = 'tribe-alert';
        alert.header = 'Done!';
        alert.message = "Your account details have been updated, yay!";
        alert.buttons = [{
            text: 'OK',
            handler: () => {
                dismissSettingsModal();
                dismissEditAccountModal();
            }
        }];

        document.body.appendChild(alert);
        return alert.present();
    }

    else if (reason == "edit-child") {
        //Present Success Alert
        const alert = document.createElement('ion-alert');
        alert.cssClass = 'tribe-alert';
        alert.header = 'Done!';
        alert.message = "Your child's details have been updated, yay!";
        alert.buttons = [{
            text: 'OK',
            handler: () => {
                displayLoader("load-profile");
                dismissSettingsModal();
                dismissEditChildModal();
            }
        }];

        document.body.appendChild(alert);
        return alert.present();
    }

    else if (reason == "new-entry") {

        //Present Success Alert
        const alert = document.createElement('ion-alert');
        alert.cssClass = 'tribe-alert';
        alert.header = 'Done!';
        alert.message = "New scrapbook entry added, yay!";
        alert.buttons = [{
            text: 'OK',
            handler: () => {
                dismissJournalModal();
                displayLoader("load-profile");
            }
        }];

        document.body.appendChild(alert);
        return alert.present();
    }

    else if (reason == "update-entry") {

        //Present Success Alert
        const alert = document.createElement('ion-alert');
        alert.cssClass = 'tribe-alert';
        alert.header = 'Done!';
        alert.message = "Scrapbook entry updated, yay!";
        alert.buttons = [{
            text: 'OK',
            handler: () => {
                dismissEditJournalModal();
                displayLoader("load-profile");
            }
        }];

        document.body.appendChild(alert);
        return alert.present();
    }

    else if (reason == "load-profile") {
        //Clear profile
        $(".profile-item").remove();
        $(".profile-item-empty").remove();

        //Add account details
        $("#profile-name").text(localAccount.child.name);
        $("#profile-age").text(localAccount.child.age());

        //Add entries one by one
        if (localAccount.journalEntries.length > 0) {
            for (var i = 0; i < localAccount.journalEntries.length; i++) {
                //If there was no image attached
                if (localAccount.journalEntries[i].entryMedia == "" || localAccount.journalEntries[i].entryMedia == null) {
                    $("#profile-body").after(`
                <ion-item class="profile-item" id="${i}">
            <ion-card class="profile-card">
                <img src="" />
                <ion-card-header>
                    <ion-card-subtitle>${localAccount.journalEntries[i].entryDate.dateObj}</ion-card-subtitle>
                    <ion-card-title>${localAccount.journalEntries[i].entryName}</ion-card-title>
                </ion-card-header>
            </ion-card>
            </ion-item>
            `);
                }

                else {
                    //do stuff here if there's an img
                }


            }
        }

        //Feedback if there aren't any entries
        else {
            $("#profile-body").after(`
            <ion-item class="profile-item-empty">
            <ion-card class="profile-card" id="journal-entry-${i}">
                <img src="" />
                <ion-card-header>
                    <ion-card-title>You've got no entries!</ion-card-title>
                    <ion-card-subtitle>Oops</ion-card-subtitle>
                </ion-card-header>

                <ion-card-content>
                    Try adding one with the plus button down there!
                </ion-card-content>
            </ion-card>
            </ion-item>
            `);
        }


        isProfileLoaded = true;
    }
}

//Object Templates

//Date Obvarject Template
function DateObject(dateObj) {
    this.dateObj = dateObj;

    /*
    this.dayOfTheWeek = function () {
        var dayArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var dayIndex = this.dateObj.getDay();
        return dayArray[dayIndex];
    };
    */

    this.day = dateObj.getDate();
    this.month = dateObj.getMonth() + 1;

    /*
    this.month2 = function () {
        var monthArrayShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", 'Dec'];
        var monthIndex = this.month - 1;

        return monthArrayShort[monthIndex];
    }
    this.month3 = function () {
        var monthArrayFull = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", 'December'];
        var monthIndex = this.month - 1;

        return monthArrayFull[monthIndex];
    }
    */

    this.year = dateObj.getFullYear();

    /*
    this.date = function () {
        //Convert int to str for concantenation
        var dayStr = this.day.toString();
        var monthStr = this.month.toString();
        var yearStr = this.year.toString();

        var dateReturn = parseInt(dayStr + monthStr + yearStr);

        return dateReturn;
    };
    */
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
        if (yearDiff > 1 || (yearDiff == 1 && monthDiff > 6)) {
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
