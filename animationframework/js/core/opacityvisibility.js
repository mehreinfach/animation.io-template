
// TODO: set/save visibility status here
Actor.prototype.extraResetFunctions.push(
  function(actor){
    if (actor.syncs() && keyOr(actor.synckey + "-visibleForever", false)) {
      setVisible(actor);
    } else if (actor.syncs() && keyOr(actor.synckey + "-invisibleForever", false)){
      setInvisible(actor);
    } else if (typeof actor.currentlyVisible !== 'undefined'){
      // do nothing
    } else {
      actor.originalOpacity = actor.currentOpacity = 1;      
      actor.currentlyVisible = true;
    }
    actor.originalOpacity = actor.currentOpacity = keyOr(actor.synckey + "-originalOpacity", 1);   
  }
);

Actor.prototype.alterOpacity = function(newOpacity){
  if (newOpacity !== this.currentOpacity) {
    this.currentOpacity = newOpacity;
    this.image.style.opacity = this.currentOpacity;
    this.image.style.filter = 'alpha(opacity=' + this.newOpacity*100 + ')';
  }
  return this;
};

Actor.prototype.setInitialOpacity = function(newOpacity){
  this.originalOpacity = newOpacity;
  this.alterOpacity(newOpacity);
  return this;
};

function setInvisible(actor){
  actor.image.style.visibility = 'hidden';
  if (typeof actor.textDiv !== 'undefined') actor.textDiv.style.overflow = 'hidden';
  actor.currentlyVisible = false;
  return actor;
}

function syncInvisibleByKey(synckey){
  // pro-tip: make sure the actor with that key actually exists…
  updateKey(synckey + "-invisibleForever", true);
  updateKey(synckey + "-visibleForever", false);
}

function setInvisibleAndSync(actor){
  setInvisible(actor);
  if (actor.syncs()){
    syncInvisibleByKey(actor.synckey);
  } else {
    console.error("You are trying to sync " + actor.filename + " but have not set a synckey! Use setSynckey()…")
  }
  return actor;
}

function setVisible(actor, newOpacity){
  if (typeof newOpacity !== 'undefined') {
    actor.alterOpacity(newOpacity);
    updateKey(actor.synckey + "-invisibleForever", false);
    updateKey(actor.synckey + "-visibleForever", true);
  }
  actor.image.style.visibility = 'visible';
  if (typeof actor.textDiv !== 'undefined') actor.textDiv.style.overflow = 'auto';
  actor.currentlyVisible = true;
  return actor;
};

function syncVisibleByKey(synckey){
  // pro-tip: make sure the actor with that key actually exists…
  updateKey(synckey + "-visibleForever", true);
  updateKey(synckey + "-invisibleForever", false);
}

function setVisibleAndSync(actor, newOpacity){
  // console.log("SETTING VISIBLE " + actor.filename);
  setVisible(actor, newOpacity);
  if (actor.syncs()){
    syncVisibleByKey(actor.synckey);
  } else {
    console.error("You are trying to sync " + actor.filename + " but have not set a synckey! Use setSynckey()…")
  }
  return actor;
};

function notVisibleOnStage(actor){
  return (actor.position.x > actor.scene.dimensions.x) || ((actor.position.x + actor.imagesize.x) < 0) || ((actor.position.y + actor.imagesize.y) < 0) || (actor.position.y > actor.scene.dimensions.y);
}

function visibleOnStage(actor){
  return !notVisibleOnStage;
}