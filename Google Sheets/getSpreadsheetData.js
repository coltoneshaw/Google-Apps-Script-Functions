/*
In the below example we are getting the data of a spreadsheet using a constant spreadsheet ID value. You can also set this as a user property to make this
function more dynamic.

This will return an array of objects that have a key:value pairing for your spreadsheets. This would be useful if you need to call specific data in your
following functions as it would make the code more readable. 

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

// pulling the sheet headers on any sheet. This is used to create key:value pairs.
function getSheetHeaders(name){
    let ss = getDefaultSheetByName(name);
    let lastCol = ss.getLastColumn();

    // this assumes your sheet headers are all stores in the first row of your spreadsheet.
    let sheetHeaders = ss.getRange(1, 1, 1, lastCol).getValues();
    return sheetHeaders[0];
  
}

//to use this you call the spreadsheet by the name. You can adjust this if needed. 
function getSpreadsheetDataByName(name) { 
    let ss = getDefaultSheetByName(name);
    let lastRow = ss.getDataRange().getNumRows();
    let lastCol = ss.getLastColumn();

    let headers = getSheetHeaders(name);
    let output = [];
    let spreadsheetData = ss.getRange(2, 1, lastRow, lastCol).getValues();
 
    //doing a loop over each row in your spreadsheet. this runs top to bottom.
    for ( let i = 0 ; i < lastRow ; i++){  
      let currentRow = spreadsheetData[i];

      //creating an empty object for each loop
      let object = {};

      //doing a loop over each cell in your spreadsheet. this runs left to right.
      for (j = 0 ; j < currentRow.length ; j++) {

        //setting the key to be the column header that matches the column data
        let keyData = headers[j];
        let valueData = currentRow[j];

        //this is where we actually create teh key:value pairing.
        object[keyData] = valueData;
        }

    //the object we created above is stored in our ouput array.
    output.push(object);

    }
    
    //returning the data of your spreadsheet in a key:value pair.
    return output;
}

//This is an example of how you could run this. Depending on your use case.
function getSpreadsheetData() {
    getSpreadsheetDataByName("spreadsheet tab name");

}