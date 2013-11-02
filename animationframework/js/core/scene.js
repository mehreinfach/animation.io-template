/* global createDiv, Actor */
/* exported Scene */

function Scene(id, title, width, height){
  this.id = id;
  this.title = (typeof title !== 'undefined' ? title : id);
  this.div = createDiv(id, 'scene');

  this.isVisible = false;
  this.actors = [];
  this.texts = [];
  this.textDisplaying = true;
  this.alwaysShowsText = false;
  this.displayedAt = Date.now(); // TODO also set in scene.reset() --> duplication?
  scrollingPerspectiveStrength = 'undefined';

  this.scrollPositionX = 0;
  this.scrollPositionY = 0;

  this.scrollPositionVectorX = 0;
  this.scrollPositionVectorY = 0;

  // dimensions of the scene's div and related settings -->
  this.dimensions = {};
  this.dimensions.x = (typeof width !== 'undefined') ? parseInt(width, 10) : 0;
  this.dimensions.y = (typeof height !== 'undefined') ? parseInt(height, 10) : 0;
  // <-- dimensions of the scene's div and related settings  

  this.currentZIndex = 0; // counted up by 10 for each added actor

  this.addActor = function(myactor){
    myactor.zIndex = this.currentZIndex += 10;
    this.actors.push(myactor);
  }

  this.setDivSizeToStage = function(myWidth, myHeight){
    setDivSize(this.div, window.animation.width, window.animation.height);
  };

  this.age = function(){
    return Date.now() - this.displayedAt;
  };

  this.alwaysShowText = function(){
    this.alwaysShowsText = true;
  };

  this.url = function(){
    var ret = '';

    ret += window.location.protocol;
    ret += '//';
    ret += window.location.hostname;
    ret += window.location.pathname;
    ret += '#' + this.id.match(/\d+$/)[0]; // expects id in form of "scene3"

    return ret;
  };

  // scene itself should preload as minimum,
  // further preload-scenes are added by the navigates-plugin
  this.preloadSceneIds = [id];

  this.removeBehaviorsThatCameFromReacts = function(){
    for (var i = this.actors.length - 1; i >= 0; i--) {
      try {
        this.actors[i].removeBehaviorsThatCameFromReacts();
      } catch(e){}
    }
  };

  this.makeVisible = function () {
    this.div.style.display = 'block';
    this.isVisible = true;
  };

  this.makeInvisible = function(){
    this.div.style.display = 'none';
    this.isInvisible = false;
    this.removeBehaviorsThatCameFromReacts();
  };
  this.makeInvisible(); // all scenes start out invisible

  this.cleanup = function () {
    console.log('cleaning up \"' + this.id + '"');
    for (var i = this.actors.length - 1; i >= 0; i--) {
      this.actors[i].cleanupBehaviors();
    }
    this.createActor("blank.png", 0, 0, 0, 0).scrollsTo(0,0,1000);
  };

  this.makeOthersInvisible = function(){
    var showTextInCurrent = window.animation.textIsDisplaying;
    for (var i = window.animation.loadedScenes.length - 1; i >= 0; i--) {
      if (window.animation.loadedScenes[i].id.match(this.id)) {
        this.makeVisible();
      } else {
        window.animation.loadedScenes[i].makeInvisible();
        window.animation.loadedScenes[i].hideText();
      }
    }

    if (showTextInCurrent || this.alwaysShowsText) {
      this.showText();
    } else {
      this.hideText();
    }

    window.animation.textIsDisplaying = showTextInCurrent;
  };

  this.enterActors = function(){
    for (var i = 0; i < this.actors.length; i++) {
      this.actors[i].enter(this);
    }
  };

  this.write = function(myX, myY, html, cssclass){
    var newText = document.createElement('div');
    newText.innerHTML = html;
    newText.setAttribute('class', 'text ' + (typeof cssclass === "undefined" ? "" : cssclass));
    newText.style.left = myX + 'px';
    newText.style.top = myY + 'px';
    this.div.appendChild(newText);
    this.texts.push(newText);
  };

  this.showText = function(){
    this.textDisplaying = true;
    for (var i = this.texts.length - 1; i >= 0; i--) {
      this.texts[i].style.visibility = 'visible';
    }
    window.animation.textIsDisplaying = true;
  };

  this.hideText = function(){
    this.textDisplaying = false;
    for (var i = this.texts.length - 1; i >= 0; i--) {
      this.texts[i].style.visibility = 'hidden';
    }
    window.animation.textIsDisplaying = false;
  };

  return this;
}
