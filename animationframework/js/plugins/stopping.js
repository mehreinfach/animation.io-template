function Stopping(actor, plugintype2stop, triggeredByAction, reactionTargetIndex){
	var stopping = new Plugin(0,0, actor, triggeredByAction, reactionTargetIndex);

	for (var i = stopping.targetObject.behaviors.length - 1; i >= 0; i--) {
		if ((stopping.targetObject.behaviors[i].plugintype == plugintype2stop) && stopping.targetObject.behaviors[i].running) {
			stopping.targetObject.behaviors[i].done = true;
			console.log("stopping rotating " + i);
		}
	};
	return stopping;
}

Actor.prototype.stops = function(plugintype2stop, triggeredByAction, reactionTargetIndex){
	var behavior = new Stopping(this, plugintype2stop, triggeredByAction, reactionTargetIndex);
	this.addBehavior(behavior);
	return behavior; 
};

Actor.prototype.letsStop = function(targetObject, plugintype2stop, triggeredByAction, reactionTargetIndex){
	this.reacts("this.stops('" + plugintype2stop + "', true, reactionTargetIndex)", 0, targetObject);
	return this;
};

Actor.prototype.stopsOnTouch = function(plugintype2stop, triggeredByAction, reactionTargetIndex){
	this.reacts("this.stops('" + plugintype2stop + "', true, reactionTargetIndex)", 0);
	return this;
};
