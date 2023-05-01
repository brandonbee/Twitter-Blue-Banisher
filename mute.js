(function() {
	var href = window.location.href;
	if((href == "https://twitter.com/home" || href.search("https://twitter.com") > -1) && document.querySelector('[data-testid="BottomBar"]').firstChild == null){
		var muteList = [];
		var tweets = document.querySelectorAll('[data-testid="tweet"]');
		var verifiedTweets = document.querySelector('[aria-label="Verified account"]');
		if(tweets.length > 1 && verifiedTweets != null){
			//Start point moves up or down depending on whether you're on the main feed or viewing an individual tweet.
			var tweetIndex = 0;
			var isHome = (href == "https://twitter.com/home" || href == "https://twitter.com");
			var isTweet = href.search(/.+twitter.+status\/\d+/) > -1;
			if(isTweet){
				tweetIndex = 1;
			}
			if(isHome||isTweet){
				for(i=tweetIndex;i<tweets.length;i++){
					var parent = tweets[i].parentNode.parentNode.parentNode;
					var verified = parent.querySelector('[aria-label="Verified account"]') != null;
					if(verified){
						var user = parent.querySelector('[data-testid="User-Name"]').childNodes[0].childNodes[0].childNodes[0].getAttribute("href").slice(1);
						muteList.push(user);
						var moreButton = parent.querySelector('[aria-label="More"]');
						moreButton.click();
						//Setting a slight delay to buy some time for element clicking.
						setTimeout(function(){
							var nodeIndex = 2;
							var dropdown = document.querySelectorAll('[data-testid="Dropdown"]');
							//There are different context menus depending on if the tweet is viewed on the home page, as a reply, or if it it's a promoted tweet. This just searches for the svg code for the mute icon and chooses the parent element.
							var muteButton = dropdown[0].querySelector('[d="M18 6.59V1.2L8.71 7H5.5C4.12 7 3 8.12 3 9.5v5C3 15.88 4.12 17 5.5 17h2.09l-2.3 2.29 1.42 1.42 15.5-15.5-1.42-1.42L18 6.59zm-8 8V8.55l6-3.75v3.79l-6 6zM5 9.5c0-.28.22-.5.5-.5H8v6H5.5c-.28 0-.5-.22-.5-.5v-5zm6.5 9.24l1.45-1.45L16 19.2V14l2 .02v8.78l-6.5-4.06z"]').parentNode.parentNode.parentNode.parentNode;
							muteButton.click();
						}, 750);
					}
				}
				var uniqueMutes = [...new Set(muteList)];
				console.log("users muted:", uniqueMutes);
			}
		}
	}
})();
