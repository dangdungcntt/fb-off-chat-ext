var block = true;

function updateIcon(blocking) {

	var path = 'images/fb_16.png';
	var title = 'Online'
	
	if (blocking) {
		path = 'images/fb_un_16.png';
		title = 'Đang ẩn trò chuyện';
	}

	chrome.storage.sync.set({'block': blocking ? 'on' : 'off'}, function() {
      console.log('Updated: ' + blocking);
    });
	chrome.browserAction.setIcon({path});
	chrome.browserAction.setTitle({title});
}

chrome.storage.sync.get(['block'], function(result) {
  	block = result.block == 'on';
  	updateIcon(block)
});

chrome.browserAction.onClicked.addListener(() => {
	block = !block;
	updateIcon(block);
});

chrome.webRequest.onBeforeRequest.addListener(
 	function(details) { return {cancel: block}; },
    {
    	urls: [
			"https://0-edge-chat.facebook.com/pull*",
			"https://1-edge-chat.facebook.com/pull*",
			"https://2-edge-chat.facebook.com/pull*",
			"https://3-edge-chat.facebook.com/pull*",
			"https://4-edge-chat.facebook.com/pull*",
			"https://5-edge-chat.facebook.com/pull*",
			"https://6-edge-chat.facebook.com/pull*",
			"https://7-edge-chat.facebook.com/pull*",
			"https://8-edge-chat.facebook.com/pull*",
			"https://9-edge-chat.facebook.com/pull*",
		]
	},
    ["blocking"]
);

