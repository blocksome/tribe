//Code for tribe

//jQuery Listeners
$(document).ready(function () {
    //Tab Buttons
    $("ion-tab-button").click(function(){

        //Home
        if($(this).attr("id") == "tab-button-home"){
            $("#home-icon").attr("name", "home");
            $("#food-icon").attr("name", "restaurant-outline");
            $("#alarm-icon").attr("name", "alarm-outline");
            $("#profile-icon").attr("name", "person-circle-outline");
        }

        //Food
        else if($(this).attr("id") == "tab-button-food"){
            $("#home-icon").attr("name", "home-outline");
            $("#food-icon").attr("name", "restaurant");
            $("#alarm-icon").attr("name", "alarm-outline");
            $("#profile-icon").attr("name", "person-circle-outline");
        }

        //Alarm
        else if($(this).attr("id") == "tab-button-alarm"){
            $("#home-icon").attr("name", "home-outline");
            $("#food-icon").attr("name", "restaurant-outline");
            $("#alarm-icon").attr("name", "alarm");
            $("#profile-icon").attr("name", "person-circle-outline");
        }

        //Profile
        else if($(this).attr("id") == "tab-button-profile"){
            $("#home-icon").attr("name", "home-outline");
            $("#food-icon").attr("name", "restaurant-outline");
            $("#alarm-icon").attr("name", "alarm-outline");
            $("#profile-icon").attr("name", "person-circle");
        }
    })


})



//Global Variables
var currentDate = new DateObject(new Date());


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
function UserAccount(id, username, password, email, firstName, lastName, child) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.child = child;
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