function getOrCreateIdentity(){
  var currentUserUuid;

  if (getParameterFromUrlByName('setuser').length > 0) {
    // if the new identity has been passed in via url
    // clear the local storage…
    localStorage.clear();
    // set this as the userid
    currentUserUuid = getParameterFromUrlByName('setuser');

  } else {
    // lets look into local storage whether there is a current user id
    currentUserUuid = localStorage.getItem("currentUserUuid");
  }

  if (currentUserUuid === null) {
    // NO USER SAVED ON THIS MACHINE/BROWSER
    console.log("NO USER SAVED ON THIS MACHINE/BROWSER");

    currentUserUuid = uuid();
    console.log("created identity " + currentUserUuid);
    localStorage.setItem("currentUserUuid", currentUserUuid);

    // Cookie don't work when called as local file:
    if(developermode && localStorage["currentUserUuid"] === null)
      console.log("\nERROR Couldn't save to local storage! Are you running framework as local file?\n");

  } else {
    // FOUND A USER-UUID VIA COOKIE ON THIS MACHINE
    console.log("existing identity " + currentUserUuid);
  }

  currentUser = {"uuid":currentUserUuid}; // "real" data comes from server will overwrite this in a sec
  getOrCreateCurrentUserFromServer(currentUserUuid);
}

function identitylink(){
  return location.href.split(/[?|#]/)[0] + "?setuser=" + currentUser.uuid
}