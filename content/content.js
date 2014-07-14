console.log('My content script has been injected!');

// Receive messages initiated from the background page:
chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    if (msg.command === 'color') {
    	console.log('Setting page color.');
    	[].forEach.call(document.querySelectorAll('*'), function(element) {
    		element.style.backgroundColor = 'red';
    	});
	} else {
	    console.log('Command "' + msg.command + '" from background page not recognized.');
	}
});

// Establish connection to background page:
var port = chrome.runtime.connect({
	name: 'content'
});

// Receive responses from the background page to self-initiated requests:
port.onMessage.addListener(function(msg) {
	console.log(msg);
});

// Post some messages to the background page:

port.postMessage({
	command: 'invalid'
});

port.postMessage({
	command: 'hello'
});
