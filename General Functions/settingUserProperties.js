/*
In the below code we set a user property. This is useful for storing user data like spreadsheet IDs, values, etc.

best practice would be to have a comment above your user properties with a description of possible properties and what they do. You can use this
to the point if you don't have that information it gets confusing.

*/


//we are setting the user propertys by feeding it a property name and data. both sets of data need to be a string, and a boolean will NOT work.
// example setUserProperty("name", name ); 
// use the above if you are trying to make a dynamic prperty.
function setUserProperty(property,data) {
    const setUserProperty = PropertiesService.getUserProperties()
    setUserProperty.setProperty(property, data);

    //during testing I tend to leave a logger every time i set a property just to know this is happening.
    Logger.log("Setting a new property")
    Logger.log(getUserProperty(property))
  }

//below we are actually fetching the property by property name. Remember, this MUST be a string value.
function getUserProperty(property) {
    const returnUserProperty = PropertiesService.getUserProperties().getProperty(property);
    return returnUserProperty;
}

//if you need to delete a specific user property by name.
function deleteUserProperty(property) {
    const userProperties = PropertiesService.getUserProperties();
    userProperties.deleteProperty(property);
}

//if you want to delete all properties. Typically done on a sign in / out.
function reset() {
    var userProperties = PropertiesService.getUserProperties();
    userProperties.deleteAllProperties();
}