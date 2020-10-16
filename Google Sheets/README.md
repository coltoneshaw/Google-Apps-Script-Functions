# Google Sheets Scripts

This is a place to share and understand scripts that pertain directly to Google Sheets.

# Index

- [Clearing Spreadsheet Data](#ClearingSpreadsheetData)
- [Geting Spreadsheet Data](#gettingSpreadsheetData)
- [Setting Spreadsheet Data](#SettingSpreadsheetData)


<a name="ClearingSpreadsheetData"></a>
## [ClearingSpreadsheetData.js](https://github.com/coltoneshaw/Google-Apps-Script-Functions/blob/main/Google%20Sheets/clearingSpreadsheetData.js)
Clearing the entire contents of a spreadsheet by fetching it's first/last rows then deleting it.

```javascript
/*
Clearing the entire contents of a spreadsheet by fetching it's first/last rows then deleting it.
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

//we feed a name to this function and clear all the spreadsheet data in it.
function clearSpreadsheetData(name) {
    let ss = getDefaultSheetByName(name);
    let lastRow = ss.getDataRange().getNumRows();
    let lastCol = ss.getLastColumn();
    ss.getRange(1, 1, lastRow, lastCol).clearContent();
  }
```

<a name="gettingSpreadsheetData"></a>
## [getSpreadsheetData.js](https://github.com/coltoneshaw/Google-Apps-Script-Functions/blob/main/Google%20Sheets/getSpreadsheetData.js)
We are getting the data of a spreadsheet using a constant spreadsheet ID value. You can also set this as a user property to make this
function more dynamic.

This will return an array of objects that have a key:value pairing for your spreadsheets. This would be useful if you need to call specific data in your
following functions as it would make the code more readable. 

```javascript
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
```


<a name="SettingSpreadsheetData"></a>
## [SettingSpreadsheetData.js](https://github.com/coltoneshaw/Google-Apps-Script-Functions/blob/main/Google%20Sheets/settingSpreadsheetData.js)

Setting spreadsheet data based on an array. Two options in this example. 1. setting the data in your current sheet. 2. Setting the data by feeding the function a sheet name and data.

This works well for CSV files or any files that you would have typically stored in an array or spreadsheet like format.

```javascript

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
```
