function HavingText(actor, content, divid, domclass, triggeredByAction, reactionTargetIndex){
  var havingText = new Plugin(0,0, actor, triggeredByAction, reactionTargetIndex);

  havingText.targetObject.originalText = String(content);

  havingText.targetObject.textDiv = document.createElement('div');
  havingText.targetObject.textDiv.setAttribute('id',divid);
  havingText.targetObject.textDiv.setAttribute('class','hastext ' + domclass);
  havingText.targetObject.textDivInner = document.createElement('div');
  havingText.targetObject.textDivInner.setAttribute('class','inner');
  havingText.targetObject.textDiv.appendChild(havingText.targetObject.textDivInner);
  havingText.targetObject.textDiv.style.zIndex = "2";
  havingText.targetObject.textDiv.style.width = havingText.targetObject.imagesize.x + 'px';
  havingText.targetObject.textDiv.style.height = havingText.targetObject.imagesize.y + 'px';
  havingText.targetObject.textDiv.style.pointerEvents = 'none';
  havingText.targetObject.scene.div.appendChild(havingText.targetObject.textDiv);

  havingText.targetObject.textDivInner.innerHTML = content;

  havingText.applybehavior = function(){
    havingText.targetObject.textDiv.style.zIndex = havingText.targetObject.actualZIndex() + 5;
    havingText.targetObject.textDiv.style.visibility = havingText.targetObject.image.style.visibility;
    havingText.targetObject.textDiv.style.left = havingText.targetObject.position.x + 'px';
    havingText.targetObject.textDiv.style.top = havingText.targetObject.position.y + 'px';
    havingText.targetObject.textDiv.style.opacity = havingText.targetObject.currentOpacity;
    havingText.targetObject.textDiv.style.transform = 'rotate(' +  havingText.targetObject.tilt + 'deg)'; // Firefox
    havingText.targetObject.textDiv.style.webkitTransform = 'rotate(' +  havingText.targetObject.tilt + 'deg)'; // Webkit (Chrome, Safari)
    havingText.targetObject.textDiv.style.msTransform = 'rotate(' +  havingText.targetObject.tilt + 'deg)'; // Internet Explorer

    havingText.targetObject.textDiv.style.transformOrigin = havingText.targetObject.image.style.transformOrigin;
    havingText.targetObject.textDiv.style.webkitTransformOrigin = havingText.targetObject.image.style.webkitTransformOrigin;
    havingText.targetObject.textDiv.style.msTransformOrigin = havingText.targetObject.image.style.msTransformOrigin;
  };

  return havingText;
};

Actor.prototype.setText = function(content, divid, domclass, triggeredByAction, reactionTargetIndex) {
  if (typeof this.textDiv === 'undefined') {
    this.addBehavior(new HavingText(this, content, divid, domclass, triggeredByAction, reactionTargetIndex));
  } else {
    this.textDivInner.innerHTML = content;
  };
  return this;
};


