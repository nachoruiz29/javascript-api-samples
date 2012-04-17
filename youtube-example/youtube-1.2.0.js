// Search for YouTube's video urls and replace them for the thumbnail preview.

// Fixing a bug in IE9 because it executes the .js more than once
if (typeof $.Zyncro_Apps.youtube == "undefined") {

	// Setting things up
	$.Zyncro_Apps.youtube = new Object();

	// Load styles for this ZApp
	$.Zyncro_Apps.loadScript(
			"/zyncroapps/ext/zyncroapps/youtube/css/styles_youtube-1.2.0.css",
			"css");

	if (jQuery().livequery != 'undefined') {
		$.Zyncro_Apps.loadScript("/js/jquery/jquery.livequery.js", "js");
	}

	// Gets the value of a parameter from a URL
	$.Zyncro_Apps.youtube.getParameter = function(parameter, url) {
		// Gets the position of the sign ?, there it is where parameters start
		var index = url.indexOf("?");
		// Gets the position where ends the name of the parameter and start the
		// sign =
		index = url.indexOf(parameter, index) + parameter.length;
		// Verifies that the value of the current position is the sign =
		if (url.charAt(index) == "=") {
			// Gets the value of the parameter
			var result = url.indexOf("&", index);
			if (result == -1) {
				result = url.length;
			};
			// Returns the value of the parameter
			return url.substring(index + 1, result);
		}
	}

	// Replace the video thumbnail for its video and plays it
	$.Zyncro_Apps.youtube.event_playVideo = function(video) {
		var idVideo = $(video).attr("idyoutube");
		// The url needed to embed a video. Autoplay=1 the video starts playing
		// automatically
		var urlVideo = "https://www.youtube.com/embed/" + idVideo
				+ "?rel=0&autoplay=1";
		$(video).css("display", "none");
		// Replaces the thumbnail for its video
		$(video).prev().replaceWith(
				"<iframe width='398' height='256' src='" + urlVideo
						+ "' frameborder='0' allowfullscreen></iframe>");
	}

	$.Zyncro_Apps.youtube.getsYoutubeUrl = function(urlMssg) {
		// Regular expression for YouTube videos
		urlVideo_regexp = /(http|https):\/\/(?:youtu\.be\/|(?:[a-z]{2,3}\.)?youtube\.com\/watch(?:\?|#\!)v=)([\w-]{11}).*/gi;
		// Trims white spaces
		var url = $.trim(urlMssg.text());

		// If the url has the format of a Youtube video URL.
		if ((url.match(urlVideo_regexp)) && (url != '')) {
			// Get the id of the Youtube video
			var idVideo = $.Zyncro_Apps.youtube.getParameter("v", url);
			// For short YouTube's video urls we have to hack it
			if (!idVideo) {
				// Get the id of the Youtube video (last 11 characters of the
				// youtube url)
				idVideo = url.substring(url.length - 11, url.length);
			}

			// Url to grab the youtube video thumbnail
			var thumbnailVideoUrl = "https://img.youtube.com/vi/" + idVideo
					+ "/default.jpg";

			embedHtml = "<div class='videobox'><img class='thumbnail' width='120' height='90' src='"
					+ thumbnailVideoUrl
					+ "' alt='Youtube video'/>"
					+ "<a idyoutube='"
					+ idVideo
					+ "' href='#' onclick='$.Zyncro_Apps.youtube.event_playVideo(this); return false;'>"
					+ "<img width='29' height='29' class='thumbnailImg_play' src='/zyncroapps/ext/zyncroapps/youtube/img/youtube_play.png' /></a></div>";
		} else {
			// If it isn't a url in youtube format
			embedHtml = "";
		}
		return embedHtml;
	}

	$.Zyncro_Apps.youtube.init = function() {
		// setTimeout to wait till the wall is loaded
		setTimeout(function() {
			try {
				// For each comment on the wall
				$("#lista_muro li.item_muro .comment_wall").livequery(
						function() {
							// Find urls within comments
							$(this).find("a").each(
									function() {
										// messageUrl stores the Youtube url
										var messageUrl = $.Zyncro_Apps.youtube
												.getsYoutubeUrl($(this));
										// If the url has the format of a
										// Youtube video URL.
										if ((messageUrl != "")
												&& (messageUrl != undefined)) {
											// replaces the url(<a>) for a
											// Thumbnail
											$(this).replaceWith(messageUrl);
										}
									});
						});
			} catch (e) {
				$.Zyncro_Apps.youtube.init();
			}
		}, 800);
	}

	$.Zyncro_Apps.youtube.trigger = function() {
		if (($("body.panel").length) || ($("body.zprofilecompany").length)
				|| ($("body.folders").length) || ($("body.search").length)
				|| ($("body.zprofile").length)
				|| ($("body.companyfeed").length)
				|| ($("body.personalfeed").length)
				|| ($("body.zcomments").length)) {

			$.Zyncro_Apps.youtube.init();
		}
	}
	
	$.Zyncro_Apps.youtube.trigger();
}