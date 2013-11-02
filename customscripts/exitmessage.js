function exitmessage(url){
	closeExitMessage();
	var messageDiv = document.createElement("div");
	messageDiv.style.background = 'url(../images/defferer_bg.gif)';
	messageDiv.style.width = '532px';
	messageDiv.style.height = '401px';
	// messageDiv.style.border = '3px solid red';
	messageDiv.style.position = 'fixed';
	messageDiv.style.top = '100px';
	messageDiv.style.left = '200px';
	messageDiv.setAttribute('id', 'exitMessageDiv');

	var messageClose = document.createElement("img");
	messageClose.setAttribute('src', '../images/deferrer_close.png');
	messageClose.style.position = "absolute";
	messageClose.style.top = '30px';
	messageClose.style.right = '40px';
	messageClose.style.cursor = 'pointer';
	messageClose.setAttribute('onclick', 'closeExitMessage("test")');
	messageDiv.appendChild(messageClose);

	var messageText = document.createElement("img");
	messageText.setAttribute('src', '../images/defferer_text.png');
	messageDiv.appendChild(messageText);

	var messageButtonLink = document.createElement('a');
	messageButtonLink.href = url;
	messageButtonLink.target = '_blank';
	messageButtonLink.style.display = 'block';
	messageButtonLink.style.position = "absolute";
	messageButtonLink.style.top = '235px';
	messageButtonLink.style.left = '57px';
	messageButtonLink.setAttribute('onclick', 'closeExitMessage()');

	var messageButton = document.createElement("img");
	messageButton.setAttribute('src', '../images/deferrer_button.png');
	messageButtonLink.appendChild(messageButton);

	messageDiv.appendChild(messageButtonLink);

	document.body.appendChild(messageDiv);
}

function closeExitMessage(){
	var msg = document.getElementById('exitMessageDiv');
	if (msg) document.body.removeChild(msg);
}

if (window.onload) var oldOnload = window.onload;
window.onload = function(){
	if (oldOnload) oldOnload();

	var list = document.getElementsByTagName("a");

	for (var i = list.length - 1; i >= 0; i--) {
		if (list[i].rel && list[i].rel == "outside") {
			list[i].setAttribute('onclick', "exitmessage('" + list[i].href + "');return false;");
		};
	};

};