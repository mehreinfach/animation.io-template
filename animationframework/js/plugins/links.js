/* globals Plugin, bindEvent */

function Linking(actor, url, newwindow, triggeredByAction, reactionTargetIndex){
	var linking = new Plugin(0,0, actor, triggeredByAction, reactionTargetIndex);

	linking.actor = actor;
	linking.url = url;

	if( /iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
		bindEvent(linking.targetObject.image, 'touchstart', function(){this.gotourl();});
	} else {
		bindEvent(linking.targetObject.image, 'mousedown', function(){this.gotourl();});
	}

	linking.actor.image.gotourl = function(){
		//this.removeEventListener('mousedown',arguments.callee, false);

		var tmpwindow = window.open(url, newwindow);
		return false;
	};

	linking.applybehavior =  function(){
		// nothing here
	};

	return linking;
}

Actor.prototype.links = function(url, windowname) {
	if(typeof windowname !== 'undefined'){windowname = "_blank";}
	this.addBehavior(new Linking(this, url, windowname));
  return this;
};

Actor.prototype.linksToNewWindow = function(url) {
	this.addBehavior(new Linking(this, url, "_blank"));
  return this;
};

Actor.prototype.linksToSameWindow = function(url) {
	this.addBehavior(new Linking(this, url, "_self"));
  return this;
};