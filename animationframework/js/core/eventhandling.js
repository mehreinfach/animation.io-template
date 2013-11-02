function bindEvent(element, eventName, eventHandler, reacting) {
  if (typeof reacting !== "undefined") {
    reacting = null;
  };

  if (element.addEventListener){
    element.addEventListener(eventName, eventHandler, false);
  } else if (element.attachEvent){
    element.attachEvent('on'+eventName, eventHandler);
  }
}

function unbindEvent(el, callee){
  // should work
  this.removeEventListener('click', arguments.callee,false);
}

function handleClick(el) {

  var clickX;
  var clickY;
  if (el.pageX || el.pageY) { 
    clickX = el.pageX;
    clickY = el.pageY;
  } else {
    clickX = el.clientX + document.body.scrollLeft + document.documentElement.scrollLeft; 
    clickY = el.clientY + document.body.scrollTop + document.documentElement.scrollTop; 
  }

  var animframe = document.getElementById('animframe');
  animframeX = animframe.offsetLeft - animframe.scrollLeft + animframe.clientLeft;
  animframeY = animframe.offsetTop - animframe.scrollTop + animframe.clientTop;

  var clickX = clickX - animframeX;
  var clickY = clickY - animframeY;
  console.log("click, " + clickX + ", " + clickY);

  analyzeActorsAtPositionAndRunReactions(clickX, clickY);
}
bindEvent(window, "click", handleClick);

function analyzeActorsAtPositionAndRunReactions(x, y){
  if (typeof window.currentScene !== 'undefined') {
    console.log("analyzing click for " + x + " / " + y);
    var actors = window.currentScene.actors;
    var clickedActors = [];
    var tmpActor;
    var haveRunReactions = false;
    var doneEvaluatingClick = false;

    for (var i = 0; i < (actors.length); i++) {
    // for (var i = actors.length - 1; i >= 0; i--) {
      tmpActor = actors[i];
      // if (x >= tmpActor.absolutePositionTopLeftX() && x <= (tmpActor.absolutePositionTopLeftX() + tmpActor.imagesize.x) && y >= tmpActor.absolutePositionTopLeftY() && (y <= tmpActor.absolutePositionTopLeftY() + tmpActor.imagesize.y)) {
      if (typeof actors[i].imagesizeY !== 'undefined' && actors[i].pointIsAboveActor(x, y)) {
        clickedActors.push(actors[i]);          
      };
    };

    console.log("\nvisible actors at click, from top to bottom:");
    var tmpName;
    for (var i = clickedActors.length - 1; i >= 0; i--) {
      tmpActor = clickedActors[i];
      tmpName = clickedActors[i].filename;
      if (!tmpActor.currentlyVisible) tmpName += " (invisible)";
      if (typeof tmpActor.passesTouchThroughSet !== 'undefined' && tmpActor.passesTouchThroughSet) tmpName += " – passes touch through";
      if (typeof tmpActor.evaluateFirstWhenClicked !== 'undefined' && tmpActor.evaluateFirstWhenClicked) tmpName += " – PRIORITY: " + tmpActor.overrideZIndexExtraValue;
      if (tmpActor.reactions.length > 0) tmpName += (" – " + pluralize(tmpActor.reactions.length, "no reactions", "one reaction", "%count% reactions"));
      if (tmpActor.currentlyVisible) console.log("- " + tmpName); // showing only visible actors in the stack for now
    };


    // START evaluate priority-actors

    // 1. evaluate priority actors
    var priorityActors = _.filter(clickedActors, function(el){
      return (typeof el.evaluateFirstWhenClicked !== 'undefined' && el.evaluateFirstWhenClicked);
    });

    priorityActors = _.sortBy(priorityActors, 'overrideZIndexExtraValue'); // sort by z-index

    for (var i = priorityActors.length - 1; i >= 0; i--) {
      tmpActor = priorityActors[i];

      if (!tmpActor.passesTouchThroughSet && tmpActor.currentlyVisible){
        if (tmpActor.reactions.length > 0) {
          console.log("executing priority-actor: " + tmpActor.filename);
          tmpActor.react();
        }
        doneEvaluatingClick = true;
        break;
      }
    }
    // END 1. evaluate priority-actors

    // START 2. evaluate non-priority-actors
    var standardActors = _.filter(clickedActors, function(el){
      return (typeof el.evaluateFirstWhenClicked === 'undefined' || !el.evaluateFirstWhenClicked);
    });

    if (!doneEvaluatingClick) {
      for (var i = standardActors.length - 1; i >= 0; i--) {
        tmpActor = standardActors[i];

        if ((typeof tmpActor.evaluateFirstWhenClicked === undefined || !tmpActor.evaluateFirstWhenClicked)  && !tmpActor.passesTouchThroughSet && tmpActor.currentlyVisible){
          if (tmpActor.reactions.length > 0) {
          console.log("executing non-priority-actor: " + tmpActor.filename);
            tmpActor.react();
          }
          break;
        };
      };      
    }
    // END 2. evaluate non-priority-actors


  }
}
