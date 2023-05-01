(function() {
	var href = window.location.href;
	if((href == "https://twitter.com/home" || href.search("https://twitter.com") > -1) && document.querySelector('[data-testid="BottomBar"]').firstChild == null){
		var muteList = [];
		var tweets = document.querySelectorAll('[data-testid="tweet"]');
		var verifiedTweets = document.querySelector('[aria-label="Verified account"]');
		if(tweets.length > 1 && verifiedTweets != null){
			//Element placement moves up or down depending on whether you're on the main feed or viewing an individual tweet.
			var tweetIndex = 0;
			var isHome = (href == "https://twitter.com/home" || href == "https://twitter.com");
			var isTweet = href.search(/.+twitter.+status\/\d+/) > -1;
			if(isTweet){
				tweetIndex = 1;
			}
			if(isTweet){
				for(i=tweetIndex;i<tweets.length;i++){
					var parent = tweets[i].parentNode.parentNode.parentNode;
					var verified = parent.querySelector('[aria-label="Verified account"]') != null;
					if(verified){
						var user = parent.querySelector('[data-testid="User-Name"]').childNodes[0].childNodes[0].childNodes[0].getAttribute("href").slice(1);
						muteList.push(user);
						var moreButton = parent.querySelector('[aria-label="More"]');
						moreButton.click();
						setTimeout(function(){
							var nodeIndex = 2;
							var dropdown = document.querySelectorAll('[data-testid="Dropdown"]');
							//Ads have a different menu item placement, so move selection accordingly.
							var isAd = dropdown[0].childNodes[0].childNodes[1].childNodes[0].childNodes[0].innerText == "Not interested in this ad";
							if(isAd){nodeIndex = 4;}
							var muteButton = dropdown[0].childNodes[nodeIndex];
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
