(function() {
	var href = window.location.href;
	//If BottomBar is present, that means the user isn't logged in, which screws up formatting so just return false in that instance.
	if((href == "https://twitter.com/home" || href.search("https://twitter.com") > -1) && document.querySelector('[data-testid="BottomBar"]').firstChild == null && document.querySelector('[id="hideVerified"]') == null){
		var hv = document.createElement("div");
		hv.setAttribute("id","hideVerified");
		//Borrowing Twitter's native class styling
		hv.setAttribute("class","css-1dbjc4n r-1igl3o0 r-qklmqi r-1adg3ll r-1ny4l3l");
		hv.setAttribute("style","text-align:center; padding:10px; width: 100%;");
		var tweets = document.querySelectorAll('[data-testid="tweet"]');
		var verifiedTweets = document.querySelector('[aria-label="Verified account"]');
		//Only create new page elements if a tweet has replies and there's at least 1 blue account per the querySelector.
		if(tweets.length > 1 && verifiedTweets != null){
			//Element placement moves up or down depending on whether you're on the main feed or viewing an individual tweet.
			var tweetIndex = 0;
			var isHome = (href == "https://twitter.com/home" || href == "https://twitter.com");
			var isTweet = href.search(/.+twitter.+status\/\d+/) > -1;
			if(isTweet){
				tweetIndex = 1;
			}
			if(isHome||isTweet){
				var tweetContainer = tweets[tweetIndex].parentNode.parentNode.parentNode;
				tweetContainer.insertBefore(hv,tweets[tweetIndex].parentNode.parentNode);
			}			
			var btn = document.createElement("button");
			btn.setAttribute("id","hideVerifiedButton");
			btn.setAttribute("style","padding:12px; font-size:115%; font-weight:bold; border-radius:24px; border:none; color:white; background-color:#1da1f2; cursor:pointer;");
			btn.innerText = "HIDE VERIFIED MORONS";
			hv.appendChild(btn);
			var  moronCount = 0;
			var sp = document.createElement("span");
			sp.setAttribute("id","moronCount");
			sp.setAttribute("style","padding:12px; font-size:115%; color:white;");
			hv.appendChild(sp);
			var moronCounter = document.getElementById("moronCount");
			moronCounter.innerHTML = moronCount + " Twitter Blue Subscribers Removed";
			document.getElementById("hideVerifiedButton").onclick = function() {
				//console.log("%chiding tweets...","color:darkseagreen");
				var tweetList = document.querySelectorAll('[data-testid="tweet"]');
				var tweetStart = 0;
				href = window.location.href;
				if(isTweet){
					tweetStart = 1;
				}
				for(var i = tweetStart; i < tweetList.length; i++){
					var verified = tweetList[i].querySelector('[aria-label="Verified account"]') != null;
					if(verified && tweetList[i].parentNode.parentNode.style.display != "none"){
						tweetList[i].parentNode.parentNode.style.display = "none";
						moronCount++;
					}
					if(i == tweetList.length-1){
					//console.log("moron count: " + "%c"+moronCount,"color:red");
					if(moronCount == 1){moronCounter.innerHTML = moronCount + " Twitter Blue Subscriber Removed";}
					else{moronCounter.innerHTML = moronCount + " Twitter Blue Subscribers Removed";}
					}
				}
			}
		}
	}
})();
