Scene.prototype.createVideoActor = function (fileName, startAtX, startAtY, width, height) {
    var actor = new Actor(startAtX, startAtY, width, height);
    actor.actortype = "video";
    var defaultVideoDirectory = 'video/';
    var CRITICAL_VIDEO_READYSTATE = 3; //used as const

    actor.filename = fileName;

    actor.setup = function () {
        actor.image = document.createElement('video');
        actor.image.originalPath = fileName;
        actor.filename = fileName.substring(fileName.lastIndexOf('/') + 1);
        //actor.image.setAttribute('poster', 'http://localhost:23268/merlantis_dev/images/quiz/intro_bg.png');

        if (ismobile()) {
            actor.image.setAttribute('controls', 'controls');
            //actor.image.setAttribute('poster', relativeOrAbsolutePath(defaultVideoDirectory, actor.image.originalPath) + '.png');
        }

        var srcTag = actor.image.appendChild(document.createElement('source'));
        srcTag.setAttribute('type', 'video/mp4');
        srcTag.setAttribute('src', relativeOrAbsolutePath(defaultVideoDirectory, actor.image.originalPath) + '.mp4');

        srcTag = actor.image.appendChild(document.createElement('source'));
        srcTag.setAttribute('type', 'video/webm');
        srcTag.setAttribute('src', relativeOrAbsolutePath(defaultVideoDirectory, actor.image.originalPath) + '.webm');

        // mediaType = 'video'; // seems to be unused

        actor.image.actor = actor;
        actor.defaultdirectory = defaultVideoDirectory;
        actor.position = { x: startAtX, y: startAtY };
        actor.setSize(width, height);
        actor.vector = { x: 0, y: 0 };

        bindEvent(actor.image, 'mousedown', function () { actor.react() });
        bindEvent(actor.image, 'canplay', function () {
            //console.log(actor.filename + ' loaded');
            actor.hasLoaded = function () {
                // Norman, have fun! :-)
                return true;
            };
            this.removeEventListener('canplay', arguments.callee);
        });


        moveActor(actor);
    };
    actor.setup();

    actor.scene = this;
    this.addActor(actor);
    return actor;
};

function ismobile(){
    return false
        || (navigator.userAgent.match(/iPad/i) != null)    
        || (navigator.userAgent.match(/iPhone/i) != null) 
        || (navigator.userAgent.match(/iPod/i) != null)
        || (navigator.userAgent.match(/Android/i) != null)
        || (navigator.userAgent.match(/IEMobile/i) != null)
    ;
}

