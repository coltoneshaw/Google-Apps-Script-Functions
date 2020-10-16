
/*
Setting spreadsheet data based on an array.
*/




/*
OPTION 1
*/

// we are feeding data to this function. This data should be in an array format. I typically use this for feeding a CSV
function setSpreadsheetData(data) { 

    //this hardcodes our working sheet to the one currently active. 
    let ss = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    let output = [];

    //looping over the length of our data and turning it into an array that Google Sheets will accept.
    for ( i = 0 ; i < data.length ; i++){
      output.push(data[i]);
    }  

    //setting the rows / columns based on the total length of our data once done.
    ss.getRange(1, 1, output.length, output[0].length).setValues(output);
  }



/*
OPTION 2
*/

//this function is the spreadsheet function to be used when calling a sheet. Need to use this when modifying data.
function getDefaultSheetByName(sheetName) {
    
    //This needs to be set to your spreadsheetID. You can also use the user properties functions.
    let spreadsheetID = "myspreadsheetId"; 
    let spreadsheet = SpreadsheetApp.openById(spreadsheetID);
    let sheet = spreadsheet.getSheetByName(sheetName); 

    //we are returning the full spreadsheet call of your sheet. This is the equivolent of running
    // SpreadsheetApp.openById("spreadsheetID").getSheetByName("My Sheet"); 
    return sheet;
}


//setting the spreadsheet data with the payload and spreadsheet name.
function setSpreadsheetDataByName(data,name) { 

    //using a dynamic spreadsheet name that you can feed with a function.
    let ss = getDefaultSheetByName(name);
    let output = [];

    //looping over the length of our data and turning it into an array that Google Sheets will accept.
    for ( i = 0 ; i < data.length ; i++){
      output.push(data[i]);
    }  

    //setting the rows / columns based on the total length of our data once done.
    ss.getRange(1, 1, output.length, output[0].length).setValues(output);
  }