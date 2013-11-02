function make_script_tag(url){
  var script = document.createElement("script");
  script.src = url;
  script.type = "text/javascript";
  document.body.appendChild(script);
}

function server_url(){
  return "http://sync.animation.io";
}

function getOrCreateCurrentUserFromServer(currentUserUuid){
  var url = server_url() + '/getorcreate/' + encodeURIComponent(currentUserUuid)
  url += '?cachebuster=' + new Date().getTime().toString();
  make_script_tag(url);
}

function waitForCurrentuserDataFromServerFor(length, callback){
  dowhen(callback, "(typeof window.currentUserLoaded !== 'undefined' && window.currentUserLoaded == true)", 500, 10000);
}

function setCurrentUser(data){
  console.log("data");
  _.each(JSON.parse(data), function(value,key){
    if(keyIsSynced(key) || localStorage.getItem(key) === null){
      // browser has pushed latest version to server
      // OR this key doesn't even exist here
      // SO it can harm to update it with what is coming from the server
      localStorage.setItem(key, value);
    } else {
      // key exits, but is unsynced, which means that the local
      // version is more current than the saved one – update it!
      updateKey(key, localStorage.getItem(key));
    }
  });
  console.log(data);

  // called via jsonp coming from the animation.io-server
  // after getOrCreateCurrentUserFromServer-request
  window.currentUser = JSON.parse(data);
  window.currentUserLoaded = true;
  // console.log(window.currentUser);
}

function keyOr(keyname, defaultvalue){
  // If there a value is set for 'currentUser[keyname]'
  // (e.g. it came saved from server) then return that,
  // otherwise return the 'defaultvalue'.
  if (localStorage.getItem(keyname) === null) {
    return defaultvalue;    
  } else {
    if (localStorage.getItem(keyname) === 'true') {
      // turn "true"-string into real boolean
      return true;
    } else if (localStorage.getItem(keyname) === 'false') {
      // turn "false"-string into real boolean
      return false;
    } else {
      // return value coming from server
      return localStorage.getItem(keyname);
    }
  }
}

function updateKey(key, value){
  // Set a user-property both in the local object and on the server.

  // 1. set value as local currentUser-property and flag it unsaved
  localStorage.setItem(key, value);

  // 2. set the key as unsynced
  setKeyAsUnsynced(key);

  // 3. try saving on server | TODO: what to do on failure?
  var url = server_url() + '/setvalue';
  url += '/' + encodeURIComponent(currentUser.uuid);
  url += '/' + encodeURIComponent(key);
  url += '/' + encodeURIComponent(value);
  make_script_tag(url);
}

function setKeyAsSynced(key){
  // console.log("*** setKeyAsSynced " + key);
  localStorage.setItem(key + '_synced', 'true');
}

function setKeyAsUnsynced(key){
  // console.log("*** setKeyAsUnsynced " + key);
  localStorage.removeItem(key + '_synced');
}

function keyIsSynced(key){
  return localStorage.getItem(key + '_synced') !== null
}

function keyUpdated(key){
  // called by ajax server
  localStorage.setItem(key + '_lastsave', now());
}

function keyAge(key){
  if (parseInt(localStorage.getItem(key + '_lastsave')), 10) {
    return now() - parseInt(localStorage.getItem(key + '_lastsave'), 10);
  } else {
    return 0;
  }
}