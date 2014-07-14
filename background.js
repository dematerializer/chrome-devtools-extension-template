// Listen for connections from devtools panel instances:
chrome.runtime.onConnect.addListener(function(port) {

    if (port.name === "panel") {
        // Listen for messages from the panel,
        // execute the requested command and post a reply:
        port.onMessage.addListener(function(msg) {
            if (msg.command === 'hello') {
                port.postMessage('Hello from my background page!');
            } else if (msg.command === 'inject') {
                // TODO: don't inject multiple times!
                chrome.tabs.executeScript(msg.tabId, {
                    file: msg.scriptFileToInject,
                    runAt: 'document_end'
                }, function () {
                    contentScriptInjected = true;
                });
                chrome.tabs.insertCSS(msg.tabId, {
                    file: msg.cssFileToInject,
                    runAt: 'document_end'
                });
                port.postMessage('My content script ' + msg.scriptFileToInject + ' and css file ' + msg.cssFileToInject + ' have been injected.');
            } else if (msg.command === 'color') {
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, {
                        command: 'color'
                    }, function (reply) {
                        if (reply) {
                            port.postMessage('Setting page color.');
                        } else {
                            port.postMessage('Content script is not injected!');
                        }
                    });
                });
            } else {
                port.postMessage('Command "' + msg.command + '" not recognized.');
            }
        });
    } else if (port.name === 'content') {
        // Listen for messages from the content script,
        // execute the requested command and post a reply:
        port.onMessage.addListener(function(msg) {
            if (msg.command === 'hello') {
                port.postMessage('Hello from my background page!');
            } else {
                port.postMessage('Command "' + msg.command + '" not recognized.');
            }
        });
    }
});
