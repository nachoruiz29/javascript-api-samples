// Display a message within the main sections of Zyncro

//Fixing a bug in IE9 because executes the .js more than once
if (typeof $.Zyncro_Apps.helloworld == "undefined") {

	// Setting things up
	$.Zyncro_Apps.helloworld = new Object();

	// Load styles for this ZApp
	$.Zyncro_Apps
			.loadScript(
					"/zyncroapps/ext/zyncroapps/helloworld/css/styles_helloworld-1.0.0.css",
					"css");

	$.Zyncro_Apps.helloworld.event_saveContent = function() {
		var message = $("#txt_message").val();
		// don't use localStorage in Production, better store in a DB
		if (window.localStorage) {
			localStorage.setItem("message", message);
		}
		$("#zapps_helloworld_popup").dialog("close");
	}

	$.Zyncro_Apps.helloworld.addNewSection = function(place, data) {
		switch (place) {
			case "sidebar":
				if ($.isArray(data) && ("title" in data) && ("content" in data)) {
					// content to add
					var contentSidebar = "<div id='colMessage' style='float:left; width:100%; overflow: hidden'><p  class='titulo-gral'>"
							+ data["title"]
							+ "</p>"
							+ "<div id='mssgContent' style='padding:5px 15px;float:left;font-size:0.7em'>"
							+ data["content"] + "</div></div>";
					// if already exists the sidebar remove it
					if ($("#colMessage").length) {
						$("#colMessage").remove();
					}

					// special places for Search and Profile section
					if ($("body.perfil").length) {
						// #colIzqMenu doesn't exit on Profile section, instead
						// we have to add the message after the contact-info
						// panel
						$("#colIzqTitle > div.contact-info").prev().before(
								contentSidebar);
					} else if ($("body.search").length) {
						$("#cuerpo .col_izq").append(contentSidebar);
					} else {
						$("#colIzqMenu").after(contentSidebar);
					}
				}
				break;
			case "header":
				if (data) {
					if ($("#personal-notification-message").length) {
						$("#personal-notification-message").remove();
					}
					$("#topmenu").after(
							'<div id="personal-notification-message" class="zapps_showmsg_message"><p>'
									+ data + '</p></div>');
				}
				break;
			case "section":
				if ($.isArray(data) && ("title" in data) && ("content" in data)) {
					if ($("#new_optmenu").length) {
						$("#new_optmenu").remove();
					}
					$("#topmenu .a_perfil")
							.parent()
							.after(
									"<li class='li_button' id='new_optmenu'>"
											+ "<a title='' id='newSection' href='#'>"
											+ "<span style='padding:0px 4px 0px 0px; overflow:hidden; display:block;'>"
											+ data["title"]
											+ "</span></a></li>");

					// display a new section
					$("#newSection").click(function() {
						newContent = '<p>' + data["content"] + '</p>';
						$("#cuerpo .col_centro").html(newContent);
					});
				}
				break;
			default:
				// code
		}
	}

	$.Zyncro_Apps.helloworld.init = function() {
		var data = new Array();

		// display sections
		if (localStorage.getItem("message")) {
			data["title"] = "Title";
			data["content"] = localStorage.getItem("message");
			$.Zyncro_Apps.helloworld.addNewSection("sidebar", data);
			$.Zyncro_Apps.helloworld.addNewSection("header", data["content"]);
			$.Zyncro_Apps.helloworld.addNewSection("section", data);
		}
	}

	// Admin panel config
	$.Zyncro_Apps.helloworld.adminStart = function() {
		// Add Configure button on top of Disable button
		$("#zapps_helloworld .button_popup_ch_gr")
				.before(
						'<p id="zapps_helloworld_configure" style="margin-bottom:12px" class="button_popup_ch"><a style="color: rgb(255, 255, 255);" alt="Configure" class="button_popup_img_ch follow" href="#">Configure</a></p>');

		// Prepare configuration popup
		$("#zapps_helloworld_configure a")
				.click(
						function() {
							// Load or reopen popup?
							if ($("#zapps_helloworld_popup").length > 0) {
								$("#zapps_helloworld_popup").dialog("open");
								return false;
							}

							// Content popup
							contentPopup = "<p>Introduce a text: </p><input id='txt_message' type='text'><p class='button_popup_ch'><a class='zapps_save button_popup_img_ch follow'>Save</a></p>";

							// Popup html
							$("body")
									.append(
											"<div title='Hello world popup' id='zapps_helloworld_popup' class='ui-dialog-content_b'>"
													+ contentPopup + "</div>")
									.find("#zapps_helloworld_popup").dialog({
										resizable: false,
										width: 500,
										height: 160
									});

							// Save the content of the textbox
							$("#zapps_helloworld_popup .zapps_save").click(
									function() {
										$.Zyncro_Apps.helloworld
												.event_saveContent();
									});

							return false;
						});
	};

	// Detect admin panel
	$.Zyncro_Apps.helloworld.trigger = function() {
		if ($("body.adminzyncroapps").length) {
			// Check if the button Disable is visible that means that the
			// ZyncroApp is enabled and displays the Configure button
			$.Zyncro_Apps.helloworld.adminStart();
		}
	}
	
	$.Zyncro_Apps.helloworld.trigger();
	
	$.Zyncro_Apps.helloworld.init();
}