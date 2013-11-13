// Animation.prototype.showLoader = function(){
//   console.log("showing loader");

//   // loader-divs (wrapper/inner)
//   this.loader = document.createElement('div');
//   this.loader.setAttribute('class', 'loader');
//   this.loader.inner = document.createElement('div');
//   this.loader.inner.setAttribute('class', 'inner');
//   this.loader.appendChild(this.loader.inner);

//   // display the image
//   this.loader.loadimage = document.createElement('img');
//   this.loader.loadimage.setAttribute('src', 'images/bilder/gesichter/ML_00.png');
//   this.loader.loadimage.setAttribute('class', 'percentage');

//   var logo = document.createElement('img');
//   logo.setAttribute('src', 'images/logo.jpg');

//   // add everything to the loader-div
//   this.loader.inner.appendChild(logo);
//   this.loader.inner.appendChild(this.loader.loadimage);

//   window.animation.stageDiv.appendChild(this.loader);
// };

// Animation.prototype.updateLoader = function(percentage){
//               // this.loader.loadtext.innerHTML = percentage;

//   // round to nearest 10 (so we need only 10 images):
//   percentage = Math.round(percentage/10) * 10;

//   // never round up to 100%
//   if (percentage == 100) percentage = 90;

//   // double digits:
//   percentage = percentage < 10 ? '0' + percentage : percentage;

//   // pick the right image
//   this.loader.loadimage.setAttribute('src', 'images/bilder/gesichter/ML_' + percentage + '.png');
// };

// Animation.prototype.hideLoader = function(){
//   try{
//           window.animation.stageDiv.removeChild(this.loader);
//   }catch(e){}
// };