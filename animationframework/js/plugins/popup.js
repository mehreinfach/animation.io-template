/* global Plugin, Actor, randomId */

function Popup(actor, url, width, height, offsetX, offsetY, closeAfter, triggeredByAction, reactionTargetIndex){
  var popup = new Plugin(0,0, actor, triggeredByAction, reactionTargetIndex);

  if (typeof window.closepopup === "undefined") {
    window.closepopup = function(iframeDivId){
      var iframe = document.getElementById(iframeDivId);
      iframe.scene.div.removeChild(iframe);
      iframe.actor.popup = false;
    };
  }

  popup.cleanup = function(){
    popup.cleanupPlugin();
    if (popup.targetObject.popup) {
      popup.destroy();
    }
  };

  popup.create = function(){
    popup.iframeDivId = randomId();
    popup.wrapdiv = window.document.createElement('DIV');
    popup.wrapdiv.setAttribute('id', popup.iframeDivId);
    popup.wrapdiv.setAttribute('class', 'popupdiv');
    popup.wrapdiv.style.width = width + 'px';
    popup.wrapdiv.style.height = height + 'px';
    popup.wrapdiv.style.left =  absolutePositionTopLeftX(popup.targetObject) + offsetX  + 'px';
    popup.wrapdiv.style.top =  absolutePositionTopLeftY(popup.targetObject) + offsetY  + 'px';

    popup.wrapdiv.scene = popup.targetObject.scene;
    popup.wrapdiv.actor = popup.targetObject;

    var closer = window.document.createElement('a');
    closer.setAttribute('class', 'closer')
    var linkText = document.createTextNode("×");

    closer.href="javascript:void(0)";
    closer.setAttribute('onclick', "closepopup('" + popup.iframeDivId + "');");

    closer.appendChild(linkText);
    popup.wrapdiv.appendChild(closer);

    popup.iframe = window.document.createElement('IFRAME');
    popup.iframe.setAttribute('src', url);
    popup.iframe.setAttribute('class', "iframe");
    popup.iframe.style.width = width + 'px';
    popup.iframe.style.height = height + 'px';

    popup.targetObject.popup = popup;
    popup.wrapdiv.appendChild(popup.iframe);
    popup.targetObject.scene.div.appendChild(popup.wrapdiv);

    if (closeAfter > 0) {
      popup.targetObject.popup.closetimeout = setTimeout("window.closepopup('" + popup.iframeDivId + "')", closeAfter);
    };
  };

  popup.destroy = function(){
    popup.targetObject.scene.div.removeChild(document.getElementById(popup.targetObject.popup.iframeDivId));
    popup.targetObject.popup = false;
  };

  if (popup.targetObject.popup) {
    // destroy popup
    popup.destroy();
  } else {
    // create popup
    popup.create();
  }

  return popup;
}

Actor.prototype.hasPopup = function(url, width, height, offsetX, offsetY, closeAfter, triggeredByAction, reactionTargetIndex) {
  this.addBehavior(new Popup(this, url, width, height, offsetX, offsetY, closeAfter, triggeredByAction, reactionTargetIndex));
  return this;
};

Actor.prototype.hasPopupOnTouch = function(url, width, height, offsetX, offsetY, closeAfter){
  this.reacts("this.hasPopup('" + url + "', " + width +  ", " + height +  ", " + offsetX +  ", " + offsetY +  ", " + closeAfter + ", true, reactionTargetIndex);", 0);
  return this;
};

// Actor.prototype.letsDrift = function(targetObject, forceX, forceY){
//   this.reacts("this.drifts(" + forceX + "," + forceY + ", true, reactionTargetIndex);", 1, targetObject);
// };