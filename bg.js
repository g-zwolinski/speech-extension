function speak() {
	//@TODO: find voice in voices based on detected lang

	chrome.tabs.query(
	  {currentWindow: true, active : true},
	  function (tabs) {
            console.log(tabs);
            chrome.tabs.executeScript(tabs[0].id, {
			    "code": `var msg = new SpeechSynthesisUtterance();
	var voices = window.speechSynthesis.getVoices();
	msg.voice = voices[17]; // Note: some voices don't support altering params
	msg.voiceURI = 'native';
	msg.volume = 1; // 0 to 1
	msg.rate = 1; // 0.1 to 10
	msg.pitch = 2; //0 to 2
	msg.text = window.getSelection().toString();
	msg.lang = document.body.lang || window.navigator.userLanguage || window.navigator.language;
	console.log(msg);
	msg.onend = function(e) {
	  console.log('Finished in ' + event.elapsedTime + ' seconds.');
	};

	speechSynthesis.speak(msg);`
			});
	});	
}

chrome.browserAction.onClicked.addListener(speak);
speak();
