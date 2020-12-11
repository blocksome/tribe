//Code for tribe

//Do stuff on document load
$(document).ready(function () {



    //jQuery Listeners
    //Journal Submit
    $("body").on("click", "#journal-submit", function () {

        //Verify if entry name is blank  
        if ($("#journal-name:nth-child(2)").val() == "") {
            const alert = document.createElement('ion-alert');
            alert.cssClass = 'entry-name-empty-alert';
            alert.header = 'Hey!';
            alert.message = "You can't leave the entry name empty.";
            alert.buttons = ['OK'];

            document.body.appendChild(alert);
            return alert.present();
        }

        else {

        }
    });

    //Tab Buttons
    $("ion-tab-button").click(function () {

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

        //Add Journal Entry
        else if ($(this).attr("id") == "add-journal-btn") {
            $("#home-icon").attr("name", "home-outline");
            $("#food-icon").attr("name", "restaurant-outline");
            $("#alarm-icon").attr("name", "alarm-outline");
            $("#profile-icon").attr("name", "person-circle-outline");
        }
    })


})



//Global Variables
//Database Login Details
var apiKey = "";
var myDB = "";
var myCollection = "";

//Account Data Object (all users)
var accountData;

//Journal Entry Array (1 user)
var entryArray = [];

//Current Date
var currentDate = new DateObject(new Date());

//Functions
//Function to update database
function UpdateData(submitData) {
    //Settings config to POST data
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://" + myDB + ".restdb.io/rest/" + myCollection + "",
        "method": "POST",
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
        console.log("Data successfully POSTed");
    });
}

//Function to retrieve data
function GetData() {
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
        console.log("successfully log into db");
        console.log(data);
    });
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
    this.month = dateObj.getMonth();
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
function UserAccount(id, username, password, email, firstName, lastName, child, journalEntries) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.child = child;
    this.journalEntries = journalEntries;
};

//Child Object Template
function Child(id, name, dob, weight, height) {
    this.id = id;
    this.name = name;
    this.dob = dob;
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
function JorunalEntry(entryName, entryDate, entryText, entryMedia) {
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
