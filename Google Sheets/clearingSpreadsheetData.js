
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

//we feed a name to this function and clear all the spreadsheet data in it.
function clearSpreadsheetData(name) {
    let ss = getDefaultSheetByName(name);
    let lastRow = ss.getDataRange().getNumRows();
    let lastCol = ss.getLastColumn();
    ss.getRange(1, 1, lastRow, lastCol).clearContent();
  }
