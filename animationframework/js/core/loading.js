// When actor.dontWaitForMeWhenLoading is set to true, this actor is assumed to have loaded no more what…  
Actor.prototype.dontWaitForMeWhenLoading = false;
Actor.prototype.ignoreInLoader = function(){
	this.dontWaitForMeWhenLoading = true ;
}

Actor.prototype.hasLoaded = function(){
	// Overwrite this in you actor-implementation!
  return false;
};

Scene.prototype.namesOfLoadingActors = function(){
	var arr = [];
	for (var i = this.actors.length - 1; i >= 0; i--) {
		if(!this.actors[i].dontWaitForMeWhenLoading && !this.actors[i].hasLoaded()){
			arr.push(this.actors[i].filename + " (" + this.actors[i].actortype + ")");
		};
	}
	return arr;
};

Scene.prototype.numberOfLoadedActors = function(){
	var num = 0;
	for (var i = this.actors.length - 1; i >= 0; i--) {
		if(this.actors[i].dontWaitForMeWhenLoading || this.actors[i].hasLoaded()){
			num++;
		} else {
			console.log("Waiting for actor " + this.actors[i].filename + " to load.");
		};
	}
	return num;
};

Scene.prototype.loadedPercentage = function(){
	if (this.actors.length === 0) {return 100};
	return Math.round((this.numberOfLoadedActors() / this.actors.length) * 100);
};

Scene.prototype.hasLoaded = function(){
	return this.loadedPercentage() === 100;
};
