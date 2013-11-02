/* jshint -W061 */ // allow "evil eval"

function Animation(width, height, firstSceneId, minWidth, maxWidth, minHeight, maxHeight){
	this.firstSceneId = firstSceneId;
	this.loadedScenes = [];
	this.stageDiv = createDiv('stage', 'stage');
	setDivSize(this.stageDiv, width, height);

	this.startedLoadingAt = now(); // will be used/reset in loadAndShow();

	this.width = width;
	this.height = height;
	this.dimensions = {x: width, y: height};
	this.textIsDisplaying = true; // show text as default

	this.minWidth = (typeof minWidth == 'undefined') ? this.width : minWidth;
	this.maxWidth = (typeof maxWidth == 'undefined') ? this.width : maxWidth;
	this.minHeight = (typeof minHeight == 'undefined') ? this.height : minHeight;
	this.maxHeight = (typeof maxHeight == 'undefined') ? this.height : maxHeight;

	this.startAnimationTimestamp = now();
	this.age = function(){
		return now() - this.startAnimationTimestamp;
	};

	this.adaptScaling = function(){
		if (this.resizeToDiv) {
			this.scaleToDiv();
		} else if (this.resizeToWindow){
			this.scaleToWindow();
		}
	};

	this.scaleToDiv = function(){
		var divWidth = this.animationwrapper.clientWidth;
		var divHeight = this.animationwrapper.clientHeight;
		var newWidth, newHeight;

		/*
			If the height of the div can be determined (if it has
			been set via CSS as opposed to being automatically
			determined by the browser-engine) and it is bigger than
			10 (0 + borders or similar), we will also take the
			div-height into consideration. Otherwise we will
			only
		*/

		if (divHeight > 10 && divWidth > 10) {
			// take both height and width into consideration
			// console.log("take both height and width into consideration");

			// TODO

		} else if (divWidth > 10){ // take only width into consideration
			// console.log("take only width into consideration");

			if (divWidth > this.maxWidth) { // the div is wider than allowed, set to maximum
				newWidth = this.maxWidth;
			} else if (divWidth < this.minWidth) { // the div is narrower than allowed, set to minimum
				newWidth = this.minWidth;
			} else { // div-width is within permitted scope
				newWidth = divWidth;
			}
			newHeight = newWidth / (this.width/this.height);

		} else if (divHeight > 10){ // take only height into consideration
			console.log("take only height into consideration");
			// TODO

		} else { // use default animation size
			console.log("use default animation size");
			// TODO
		}

		if (typeof window.metaWrapperDiv !== "undefined") {
			metaWrapperDiv.style.height = newHeight + "px";
			metaWrapperDiv.style.width = newWidth + "px";
		}

		rescale(parseFloat(newWidth/this.width));
	};

	this.scaleToWindow = function(){
		console.log("scaling to window");

		var winWidth = window.innerWidth;
		var winHeight = window.innerHeight;
		var newHeight = winHeight;
		var newWidth = winWidth;

		var windowFactor = window.innerWidth / window.innerHeight;
		var animationFactor = this.width / this.height;

		var scaleFactor;

		if (this.minWidth !== 0 && (animationFactor > windowFactor)) {
			// the WIDTH has to be set
			if (winWidth < this.minWidth) {
				winWidth = this.minWidth;
			} else if (winWidth > this.maxWidth) {
				winWidth = this.maxWidth;
			}
			scaleFactor = winWidth / this.width;
			newHeight = winWidth * scaleFactor;

		} else if (this.minWidth !== 0){
			// the HEIGHT has to be set
			if (winHeight < this.minHeight) {
				winHeight = this.minHeight;
			} else if (winHeight > this.maxHeight) {
				winHeight = this.maxHeight;
			}
			scaleFactor = winHeight / this.height;
			newWidth = winHeight * scaleFactor;
		}

		if (scaleFactor != 1) {
			rescale(scaleFactor);
		}

		// position on screen:
		window.animationwrapper.style.marginTop = ((window.innerHeight - parseInt(this.height * scaleFactor, 10))/2) + 'px';
		window.animationwrapper.style.width = newWidth + 'px';
		window.animationwrapper.style.marginLeft = ((window.innerWidth - parseInt(this.width * scaleFactor, 10))/2) + 'px';
		window.animationwrapper.style.height = newHeight + 'px';
	};

	this.rescale = function(scaleFactor){
		// this.stageDiv.style.width = (this.width * scaleFactor) + "px";
		this.stageDiv.style.transformOrigin = "0 0";
		this.stageDiv.style.transform = "scale(" + scaleFactor + ", " + scaleFactor + ")";
		this.stageDiv.style.msTransformOrigin = "0 0";
		this.stageDiv.style.msTransform = "scale(" + scaleFactor + ", " + scaleFactor + ")";
		this.stageDiv.style.webkitTransformOrigin = "0 0";
		this.stageDiv.style.webkitTransform = "scale(" + scaleFactor + ", " + scaleFactor + ")";
		this.stageDiv.style.OTransformOrigin = "0 0";
		this.stageDiv.style.OTransform = "scale(" + scaleFactor + ", " + scaleFactor + ")";
	};

	this.reloadAndFadeToScene = function(sceneid){
		var sceneNum = parseInt(/scene(\d+)/.exec(sceneid)[1], 10);
		window.location.hash = sceneNum;
		var fadeTime = 1200;
		fadeOut(window.animationwrapper, fadeTime / 2);
		setTimeout(function(){window.location.href = window.currentScene.url();window.location.reload();}, (fadeTime / 2) + 250);
	};

	this.showScene = function(sceneid, maximumAnimationAge){
		if ((this.animation.age() >= this.config.maximumAnimationAge)) {
			reloadAndFadeToScene(sceneid);
		} else {
			if ((typeof this.currentScene === 'undefined') || this.currentScene.age() > 1000) { // navigation possible only after 1 second
				// console.log("SHOWING SCENE " + sceneid);
				if (typeof this.currentScene !== 'undefined') {
					this.currentScene.cleanup();
				}
				this.currentScene = this.loadScene(sceneid); // TODO: when coming from loadAndShow() we are repeating the loadScene here…

				var sceneNum = getIntegerFromEndOfString(sceneid);
				// window.location.hash = sceneNum === 0 ? '' : sceneNum; // deactivate for production!

				this.currentScene.enterActors();
				this.currentScene.reset();
				this.currentScene.makeOthersInvisible();
				this.currentScene.muteOthers();
				updateScrolling(this.currentScene, true);
				this.dropUnneededScenes(this.currentScene.preloadSceneIds);
				this.loadNeededScenes(this.currentScene.preloadSceneIds);
				window.forceReloadTimer = setTimeout('reloadAndFadeToScene("' + sceneid + '")', window.animation.config.maximumAnimationAge);
			}
		}
		updateKey('scene', sceneid);
	};

  this.showFirstScene = function(){
    this.showScene(this.firstSceneId);
  };

  this.showLoader = function(){
    // loader-divs (wrapper/inner)
    this.loader = document.createElement('div');
    this.loader.setAttribute('class', 'loader');
    this.loader.inner = document.createElement('div');
    this.loader.inner.setAttribute('class', 'inner');
    this.loader.appendChild(this.loader.inner);

    // spinning gif
    this.loader.loadimage = document.createElement('img');
    this.loader.loadimage.setAttribute('src', 'images/loader/ML_00.jpg');
    this.loader.loadimage.setAttribute('class', 'percentage');

    var logo = document.createElement('img');
    logo.setAttribute('src', 'images/logo.jpg');

    // add everything to the loader-div
    this.loader.inner.appendChild(logo);
    this.loader.inner.appendChild(this.loader.loadimage);

    window.animation.stageDiv.appendChild(this.loader);
  };

	this.updateLoader = function(percentage){
		// this.loader.loadtext.innerHTML = percentage;

    // round to nearest 10 (so we need only 10 images):
    percentage = Math.round(percentage/10) * 10;

    // never round up to 100%
    if (percentage == 100) percentage = 90;

    // double digits:
    percentage = percentage < 10 ? '0' + percentage : percentage;

    // pick the right image
    this.loader.loadimage.setAttribute('src', 'images/bilder/gesichter/ML_' + percentage + '.png');
    console.log("this.loader.loadimage.src: " + this.loader.loadimage.src);
	};

	this.hideLoader = function(){
		try{
			window.animation.stageDiv.removeChild(this.loader);			
		}catch(e){}
	};

	this.loadAndShow = function(sceneid){
		if (window.animation.loadingInterval) {
			console.log("stopping loading process to start another");
			this.hideLoader();
			clearInterval(window.animation.loadingInterval);			
		}

		this.showLoader();
		this.startedLoadingAt = now();

		// start loading the scene
		var scene = window.animation.loadSceneFresh(sceneid);
		console.log("started loading scene " + sceneid);

		window.animation.loadingInterval = setInterval(function(){
			this.loadingtime = Math.abs(this.startedLoadingAt - now());
			if (scene.hasLoaded() || this.loadingtime > this.config.maximumLoadWait) {
				if (this.loadingtime > this.config.maximumLoadWait) {
					var tmp = this.config.maximumLoadWaitExceededMessage1;
					var loadingActors = scene.namesOfLoadingActors();
					for (var i = loadingActors.length - 1; i >= 0; i--) {
						tmp += ("\n· " + loadingActors[i]);
					};
					tmp += this.config.maximumLoadWaitExceededMessage2;
					console.log(loadingActors);
					if (confirm(tmp)) {
						var tmp2 = "Folgende Objekte konnten nicht geladen werden:\n";
						for (var i = loadingActors.length - 1; i >= 0; i--) {
							tmp2 += ("\n· " + loadingActors[i]);
						}

						tmp2 += "\n\nSzene: " + scene.id;

						try	{
							tmp2 += "\n\n" + navigator.userAgent;							
						} catch(e){
							tmp2 += "Couldn't determine userAgent.";
						}

						window.location.href = "mailto:speedlab@mehreinfach.de?subject=Merlantis:%20Objekte%20wurden%20nicht%20geladen&body=" + encodeURIComponent(tmp2);
						console.log("should send mail")
					}
				}
				clearInterval(window.animation.loadingInterval);
				console.log("Loading of " + sceneid + " complete.");
				window.animation.showScene(sceneid);
				this.hideLoader();
			} else {
				console.log("Waiting for scene " + sceneid + " to load. loadingTime: " + this.loadingtime);
        updateLoader(scene.loadedPercentage());
			}
		}, 1000);
	};

	this.loadScene = function(sceneid){
		console.log("-> loadScene " + sceneid);

		// is the scene maybe already loaded?
		for (var i = this.loadedScenes.length - 1; i >= 0; i--) {
			if (this.loadedScenes[i].id === sceneid) {
				return this.loadedScenes[i];
			}
		}

		return buildScene(sceneid);
	};

	this.loadSceneFresh = function(sceneid){
		// drop scene if already loaded?
		for (var i = this.loadedScenes.length - 1; i >= 0; i--) {
			if (this.loadedScenes[i].id === sceneid) {
				return this.loadedScenes[i];
			}
		}

		// is the scene maybe already loaded?
		for (var i = this.loadedScenes.length - 1; i >= 0; i--) {
			if (this.loadedScenes[i].id === sceneid) {
				console.log("scene ")
				return this.dropScene(this.loadedScenes[i].id);
			}
		}

		return buildScene(sceneid);
	};

	this.buildScene = function(sceneid){
		var newScene = eval(sceneid + '()');
		newScene.setDivSizeToStage();
		this.loadedScenes.push(newScene);
		newScene.stageDiv = this.stageDiv;
		this.stageDiv.appendChild(newScene.div);
		newScene.makeInvisible();
		return newScene;
	};

	this.loadedSceneIds = function(){
		var result = [];
		for (var i = this.loadedScenes.length - 1; i >= 0; i--) {
			result.push(this.loadedScenes[i].id);
		}
		return result;
	};

	this.dropUnneededScenes = function(neededScenes){
		// neededScenes: array if scene-ids
		// var droplist = this.loadedSceneIds().minus(neededScenes);
		var droplist = arrayMinus(this.loadedSceneIds(), neededScenes);

		for (var i = droplist.length - 1; i >= 0; i--) {
			this.dropScene(droplist[i]);
		}
	};

	this.loadNeededScenes = function(neededScenes){
		var loadlist = arrayMinus(neededScenes, this.loadedSceneIds());
		// var loadlist = neededScenes.minus(this.loadedSceneIds());
		for (var i = loadlist.length - 1; i >= 0; i--) {
			this.loadScene(loadlist[i]);
		}
	};

	this.dropScene = function(sceneid){
		for (var i = this.loadedScenes.length - 1; i >= 0; i--) {
			if (this.loadedScenes[i].id === sceneid) {
				var element = document.getElementById(sceneid);
				this.stageDiv.removeChild(this.loadedScenes[i].div);
				// this.loadedScenes = this.loadedSceneloadSceneFreshs.without(i);
				this.loadedScenes = arrayWithout(this.loadedScenes, i);
			}
		}
	};
	return this;
}

function loadAnimation(title, width, height, firstSceneId, minWidth, maxWidth, minHeight, maxHeight){
	config(this); // read in configuration residing in animationconfig.js
	getOrCreateIdentity();

	if (!compatibleBrowser()) {
		document.getElementById('backupdiv').style.display = "block";
		return;
	}
	animationLoader(title, width, height, firstSceneId, minWidth, maxWidth, minHeight, maxHeight);
}

function loadAnimationInto(title, metaWrapperDivId, firstSceneId, width, height){
	config(this); // read in configuration residing in animationconfig.js
	getOrCreateIdentity();

	if (!compatibleBrowser()) {
		document.getElementById('fallback').style.display = "block";
		return;
	}

	var metaWrapperDiv = document.getElementById(metaWrapperDivId);
	var targetDiv = createDiv('animationwrapper', '');
	metaWrapperDiv.appendChild(targetDiv);

	animationLoader(title, width, height, firstSceneId, width, width, height, height, targetDiv, metaWrapperDiv);
}

function animationLoader(title, width, height, firstSceneId, minWidth, maxWidth, minHeight, maxHeight, targetDiv, metaWrapperDiv){
	document.title = title;

	if (window.onload) var oldOnload = window.onload;
	window.onload = function(){
		if (oldOnload) oldOnload();

		// scroll away address bar on e.g. iOS-devices:
		setTimeout(function(){window.scrollTo(0, 1);}, 100);

		if (typeof targetDiv !== "undefined") {
			minWidth = maxWidth = targetDiv.clientWidth;
			minHeight = maxHeight = targetDiv.clientHeight;
		}

		window.animation = Animation(width, height, keyOr('scene', firstSceneId), minWidth, maxWidth, minHeight, maxHeight);

		if (typeof targetDiv === "undefined") {
			window.animationwrapper = createDiv('animationwrapper', '');
			window.document.body.appendChild(window.animationwrapper);
			window.animationwrapper.appendChild(this.stageDiv);
			window.animation.resizeToWindow = true;
		} else {
			window.animationwrapper = targetDiv;
			window.animationwrapper.appendChild(this.stageDiv);
			window.animation.resizeToDiv = true;
			if (typeof metaWrapperDiv !== "undefined") {
				window.animation.metaWrapperDiv = metaWrapperDiv;
			}
		}

		window.animation.adaptScaling();

		if (window.animation.config.waitForServer > 0) {
			// according to animationconfig.js the animation should wait for the server to
			// return a result. In the meantime we show a rotating waiting.gif.
			var waitingImg = document.createElement('img');
			waitingImg.src = "images/waiting.gif";
			window.animation.waitingDiv = document.createElement('div');
			window.animation.waitingDiv.id = 'waitingdiv';
			window.animation.waitingDiv.appendChild(waitingImg);
			// window.animation.waitingDiv.innerHTML += window.animation.config.waitingText;
			window.animation.stageDiv.appendChild(waitingDiv);
		}

		waitForCurrentuserDataFromServerFor(window.animation.waitForServer, function(){
			// remove the waiting-gif, if it was created
			if (typeof window.animation.waitingDiv !== 'undefined') window.stageDiv.removeChild(window.animation.waitingDiv);

			// read scene-number from hashtag in URL or start with default:
			// var sceneNum = parseInt(window.location.hash.substring(1), 10); // deactivated for production
			var sceneNum; // deactivated for debugging

			if (isNaN(sceneNum)) {
				window.animation.loadAndShow(keyOr('scene', firstSceneId));
			} else{
				eval("window.animation.loadAndShow('scene" + sceneNum + "')");
			}
			window.animation.startLoop();

			fadeIn(window.animationwrapper);
		}); // <-- waitForCurrentuserDataFromServerFor();
	};

	if (window.onresize) var oldOnresize = window.onresize;
	window.onresize = function() {
		// setGuessedOrientation();
		if(oldOnresize) oldOnresize();
		window.animation.adaptScaling();
	};
}

function setGuessedOrientation(){
  if(window.innerWidth > window.innerHeight) {
    window.orientation = "landscape";
    return "landscape";
  } else {
    window.orientation = "portrait";
    return "portrait";
  }
}
setGuessedOrientation();

// requestAnim shim layer by Paul Irish
requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          window.oRequestAnimationFrame      ||
          window.msRequestAnimationFrame     ||
          function(/* function */ callback, /* DOMElement */ element){
            window.setTimeout(callback, 1000 / 60);
          };
})();

function startLoop(){
	this.animloop = function(){
		requestAnimFrame(animloop);
			try	{
				// when loading, there is no currentScene
				for (var i = 0; i < window.currentScene.actors.length; i++) {
					animateactor(window.currentScene.actors[i]);
					updateScrolling(window.currentScene);
				}				
			} catch(e){}

	};
	this.animloop();
}