# Google Sheets Scripts

This is a place to share and understand scripts that pertain directly to Google Sheets.

Official Documentation [Here](https://developers.google.com/apps-script/reference/spreadsheet).

## ClearingSpreadsheetData.js
Clearing the entire contents of a spreadsheet by fetching it's first/last rows then deleting it.

## getSpreadsheetData.js
We are getting the data of a spreadsheet using a constant spreadsheet ID value. You can also set this as a user property to make this
function more dynamic.

This will return an array of objects that have a key:value pairing for your spreadsheets. This would be useful if you need to call specific data in your
following functions as it would make the code more readable. 

## SettingSpreadsheetData.js

Setting spreadsheet data based on an array. Two options in this example. 1. setting the data in your current sheet. 2. Setting the data by feeding the function a sheet name and data.

This works well for CSV files or any files that you would have typically stored in an array or spreadsheet like format.
