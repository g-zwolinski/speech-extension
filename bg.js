// function getSelectionText(){
// 		    var selectedText = ""
// 		    if (window.getSelection){ // all modern browsers and IE9+
// 		        selectedText = window.getSelection().toString()
// 		    }
// 		    return selectedText
// 		}
//         //Executed when the extension's icon is clicked    
//         console.log(getSelectionText());     
//             alert(getSelectionText());

// document.addEventListener('DOMContentLoaded', function() {
    
//       chrome.tabs.executeScript(null,
//       {code:"console.log(window.getSelection().toString());"});
//  		 // window.close();
// });

function speak() {
  // chrome.browserAction.setIcon({path:"icon" + current + ".png"});
  // current++;

  // if (current > max)
  //   current = min;
  // document.addEventListener('DOMContentLoaded', function() {
    // chrome.tabs.executeScript(null,
    //   {code:"console.log(window.getSelection().toString())"});
 		 // window.close();

	// var bkg = chrome.extension.getBackgroundPage();
	// bkg.window.getSelection().toString();
	// alert(bkg.window.getSelection().toString());

	

	// So, if you want to inject this code using the executeScript() method and the "code" property you can do it like this:
		
	// var curId = chrome.windows.WINDOW_ID_CURRENT;
	// console.log(curId);
	// chrome.tabs.query({
 //            'active': true,
 //            'windowId': chrome.windows.WINDOW_ID_CURRENT
 //        }, function (tabs) {
 //            // chrome.tabs.create({
 //            //     url: 'http://www.mydestination.com/index.php?url=' + tabs[0].url
 //            // });
 //            chrome.tabs.executeScript(chrome.windows.WINDOW_ID_CURRENT, {
	// 		    "code": 'console.log(window.getSelection().toString());'
	// 		});
 //        });
	// function getLang(q){
	//     var xmlHttp = new XMLHttpRequest();
	//     xmlHttp.open( "GET", 'http://ws.detectlanguage.com/0.2/detect?q[]='+q+'&key=b3970be6cad35d3b12f711c0e3d55c9a', false ); // false for synchronous request
	//     xmlHttp.send( null );
	//     console.log(JSON.parse(xmlHttp.responseText));
	//     data = JSON.parse(xmlHttp.responseText);
	//     if(data.detections[0][0].confidence > 30) return data.detections[0][0].language
	//     return xmlHttp.responseText;
	// }
	// getLang('testuję ten tekst po poslku');



	//@TODO: find voice in voices based on detected lang

	chrome.tabs.query(
	  {currentWindow: true, active : true},
	  function (tabs) {
            // chrome.tabs.create({
            //     url: 'http://www.mydestination.com/index.php?url=' + tabs[0].url
            // });
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

	

	// chrome.tabs.getCurrent(function(tab){
	// 	console.log(tab);
	// 	chrome.tabs.update(tab.id, {active: true});
	// 	chrome.tabs.executeScript(tab.id, {
	// 	    "code": 'console.log(window.getSelection().toString());'
	// 	});
	// })
	// });
	// // Execute code on the existing tab to open the Message.
	// chrome.tabs.executeScript(tab.id, {
	//     "code": `if(speak !== undefined && speak !== null)speak();
	//     		 var speak = document.createElement('script');
	// 			 speak.textContent = 'console.log(window.getSelection().toString());';
	// 			 document.head.appendChild(speak);`
	// });

}

chrome.browserAction.onClicked.addListener(speak);
speak();
