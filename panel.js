function OnReceiveMessageFromBackgroundPage(msg) {
    document.querySelector('#log').innerHTML += '<br />' + msg;
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('#invalid').onclick = function() {
        sendMessageToBackgroundPage({
            command: 'invalid'
        });
    };

    document.querySelector('#hello').onclick = function() {
        sendMessageToBackgroundPage({
            command: 'hello'
        });
    };

    document.querySelector('#inject').onclick = function() {
        sendMessageToBackgroundPage({
            command: 'inject',
            tabId: chrome.devtools.inspectedWindow.tabId,
            scriptFileToInject: "content/content.js",
            cssFileToInject: "content/content.css"
        });
    };

    document.querySelector('#color').onclick = function() {
        sendMessageToBackgroundPage({
            command: 'color'
        });
    };
});
