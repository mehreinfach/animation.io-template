function Playing(actor, audioFilename, playingImagePath, looped, onload, betweenLoops, playEndFunction, triggeredByAction, reactionTargetIndex){
  var playing = new Plugin(0, 0, actor, triggeredByAction, reactionTargetIndex);
  if (typeof playingImagePath !== 'undefined') playing.actor.playingImagePath = 'images/' + playingImagePath;;
  playing.actor.waitingImagePath = playing.actor.image.src;
  playing.actor.playEndFunction = playEndFunction;
  playing.actor.pulsatesWhilePlaying = false;
  playing.actor.playLooped = looped;
  playing.actor.playOnLoad = onload;
  playing.actor.playOnLoadExecuted = false;

  playing.actor.audio = document.createElement('audio');
  playing.actor.audio.setAttribute('preload', 'auto');

  var source = document.createElement('source');

  playing.reset = function () {
      playing.actor.playOnLoadExecuted = false;
      playing.actor.audioplaying = false;
    playing.actor.audio.pause();
    playing.actor.audioplaying = false;
  };
  playing.reset();

  playing.applybehavior = function(){
    if (this.actor.playOnLoad && !this.actor.playOnLoadExecuted) {
      this.actor.playOnLoadExecuted = true;
      this.actor.toggleAudio();
    };
  };

  playing.actor.showPlayingImage = function(){
    if (typeof this.playingImagePath !== 'undefined') this.image.src = this.playingImagePath;
    if (this.pulsatesWhilePlaying) {
      console.log("pulsates")
      this.pulsates(3,0.1,0, 0, true);
    };
  };

  playing.actor.showWaitingImage = function(){
    this.image.src = this.waitingImagePath;
    if (this.pulsatesWhilePlaying) {
      this.behaviors = [];
    };
  };

  if (playing.actor.audio.canPlayType('audio/mpeg;')) {
      source.type = 'audio/mpeg';
      source.src = 'audio/' + audioFilename + '.mp3';
  } else {
      source.type = 'audio/ogg';
      source.src = 'audio/' + audioFilename + '.ogg';
  }

  playing.actor.audio.appendChild(source);
  playing.actor.audio.actor = playing.actor;

  if (typeof betweenLoops === "undefined") {
    betweenLoops = 0;
  };
  playing.actor.audio.betweenLoops = betweenLoops;

  // playing.actor.audio.load();

  if (playing.actor.playLooped) {
    bindEvent(playing.actor.audio, 'ended', function(){
      playing.actor.showWaitingImage(this.actor);
      playing.actor.showWaitingImage(this.actor);
      setTimeout(function(){
        // console.log("AUDIO looping: " + playing.actor.filename);
        if (playing.actor.audioplaying){playing.actor.toggleAudio('play')} }, playing.actor.audio.betweenLoops);
    });
  } else {
    bindEvent(playing.actor.audio, 'ended', function(){
      playing.actor.showWaitingImage(this.actor);
      playing.actor.audioplaying = false;
      if (typeof playing.actor.playEndFunction !== 'undefined') playing.actor.playEndFunction();
    });
  };

  playing.actor.toggleAudio = function(force_play_or_pause){
    if (force_play_or_pause === "play") {
      this.playAudio();
    } else if (force_play_or_pause == "pause") {
      this.pauseAudio();
    } else if (!this.audioplaying) {
      this.playAudio();
    } else {
      this.pauseAudio();
    };
  };

  playing.actor.playAudio = function(){
    // always start from top
    if (this.audio.currentTime) this.audio.currentTime = 0;

    // mute all others non-background – unless this is background itself
    if (!this.backgroundPlayer) this.scene.muteNonBackground();

    this.audio.play();
    this.showPlayingImage();
    this.audioplaying = true;
  };

  playing.actor.pauseAudio = function(executefunctions){
    this.audio.pause();
    this.audioplaying = false;
    this.showWaitingImage();

    if (typeof executefunctions === 'undefined') executefunctions = true; // make executing the functions default

    if (executefunctions && typeof this.playEndFunction !== 'undefined') {
      console.log("*** pausing Audio!");
      this.playEndFunction()
    };
  };

  // arm the player-actor:
  playing.actor.reacts('this.toggleAudio();');

  return playing;
}

Actor.prototype.plays = function(audioFilename, playingImagePath) {
  var myactor = this;
  setTimeout(function(){myactor.addBehavior(new Playing(myactor, audioFilename, playingImagePath, false, false))}, 500);
  return this;
};

Actor.prototype.playsSolo = function(audioFilename, playingImagePath) {
  var myactor = this;
  this.soloPlayer = true;
  var behavior = new Playing(myactor, audioFilename, playingImagePath, false, false);
  setTimeout(function(){myactor.addBehavior(behavior)}, 500);
  return this;
};

Actor.prototype.playsAndExecutesOnStop = function(audioFilename, playingImagePath, endFunction) {
  var myactor = this;
  var behavior = new Playing(myactor, audioFilename, playingImagePath, false, false, false, endFunction);
  setTimeout(function(){myactor.addBehavior(behavior)}, 500);
  return this;
};

Actor.prototype.playsLoop = function(audioFilename, playingImagePath, betweenLoops) {
  var myactor = this;
  var behavior = new Playing(myactor, audioFilename, playingImagePath, true, false, betweenLoops);
  setTimeout(function(){myactor.addBehavior(behavior)}, 500);
  return this;
};

Actor.prototype.playsBackground = function(audioFilename, playingImagePath, betweenLoops) {
  var myactor = this;
  this.backgroundPlayer = true;
  var behavior = new Playing(myactor, audioFilename, playingImagePath, true, true, betweenLoops);
  setTimeout(function(){myactor.addBehavior(behavior)}, 500);
  return this;
};

Actor.prototype.playsAndPulsates = function(audioFilename, playingImagePath) {
  // setTimeout(function(){})
  var myactor = this;
  // setTimeout(function(){alert(bla.image.src)}, 250);
  var behavior = new Playing(myactor, audioFilename, playingImagePath);
  myactor.pulsatesWhilePlaying = true;
  setTimeout(function(){myactor.addBehavior(behavior)}, 500);
  // this.addBehavior(new Playing(this, audioFilename, playingImagePath));
  return this;
};


Scene.prototype.mute = function(){
  for (var i = 0; i < this.actors.length; i++) {
    try {
      this.actors[i].pauseAudio();
    } catch(e){}
  }
};

Scene.prototype.muteNonBackground = function(){
  for (var i = 0; i < this.actors.length; i++) {
    try {
      if((typeof this.soloPlayer === 'undefined' || !this.soloPlayer)){
        if (typeof this.actors[i].backgroundPlayer === 'undefined' || !this.actors[i].backgroundPlayer) {
          this.actors[i].pauseAudio(false);          
        }
      }
    } catch(e){}
  }
};

Scene.prototype.muteOthers = function(){
  for (var i = window.animation.loadedScenes.length - 1; i >= 0; i--) {
    if (!window.animation.loadedScenes[i].id.match(this.id)) {
      window.animation.loadedScenes[i].mute();
    }
  }
};

/////

function StopPlaying(actor, triggeredByAction, reactionTargetIndex){
  var dissolving = new Plugin(0,0, actor, triggeredByAction, reactionTargetIndex);
  dissolving.targetObject.pauseAudio();
  return dissolving;
};

Actor.prototype.stopsPlaying = function(triggeredByAction, reactionTargetIndex){
  // don't use directly in script!
  var behavior = new StopPlaying(this, triggeredByAction, reactionTargetIndex);
  return this;
}

Actor.prototype.letsStopPlaying = function(targetObject){
  console.log("TARGET: " + targetObject.filename);
  this.reacts("this.stopsPlaying(true, reactionTargetIndex);", 1, targetObject);
  return this;
};

/////

function StartsPlaying(actor, triggeredByAction, reactionTargetIndex){
  var dissolving = new Plugin(0,0, actor, triggeredByAction, reactionTargetIndex);
  dissolving.targetObject.playAudio();
  return dissolving;
};

Actor.prototype.startsPlaying = function(triggeredByAction, reactionTargetIndex){
  // don't use directly in script!
  var behavior = new StartsPlaying(this, triggeredByAction, reactionTargetIndex);
  return this;
}

Actor.prototype.letsStartPlaying = function(targetObject){
  this.reacts("this.startsPlaying(true, reactionTargetIndex);", 1, targetObject);
  return this;
};

