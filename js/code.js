//Code for tribe

//Journal Object Template

function JorunalEntry (entryName, entryDate, entryAge, entryText, entryMedia){
    this.entryName = entryName;
    this.entryDate = entryDate;
    this.Age = function (){

        //Find difference in years
        var yearDiff = ParseInt(entryDate.slice(4,8)) - ParseInt(childDOB.slice(4,8));

        //Find difference in years
        var monthDiff = ParseInt(entryDate.slice(2,4)) - ParseInt(childDOB.slice(2,4));

        //If month in entryDate is before month in childDOB
        if(monthDiff < 0){
            monthDiff = 12 + monthDiff;
            yearDiff -= 1;
        }

        //Variable to return at the end
        var ageReturn;

        //If child is older than 18 months
        if(yearDiff > 1 && monthDiff > 6){
            ageReturn = `${yearDiff} years ${monthDiff} months`;
        }

        else{
            ageReturn = `${monthDiff + yearDiff * 12} months`;
        }

        return ageReturn;
    };
    this.entryText = entryText;
    this.entryMedia = entryMedia;
};