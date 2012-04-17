// Get a user profile through an API service

//Fixing a bug in IE9 because executes the .js more than once
if (typeof $.Zyncro_Apps.helloworld == "undefined") {

	// Setting things up
	$.Zyncro_Apps.helloworld = new Object();
	var userId = $.Zyncro_Apps.getUserId();
	var sessionId = $.Zyncro_Apps.getSessionId();

	$.Zyncro_Apps.helloworld.addNewSection = function() {
		var titleSection = "Profile API";
		// add a new section in the top menu
		if ($("#new_optmenu").length) {
			$("#new_optmenu").remove();
		}
		$("#topmenu .a_perfil")
				.parent()
				.after("<li class='li_button' id='new_optmenu'>"
								+ "<a title='' id='newSection' href='#'>"
								+ "<span style='padding:0px 4px 0px 0px; overflow:hidden; display:block;'>"
								+ titleSection + "</span></a></li>");

		// display the user profile
		$("#newSection")
				.click(
						function() {
							// get data from the API
							$.post("/zyncroapps/ext/zyncroapps/helloworld/php/controller.php",
											{
												iduser: userId,
												sessionid: sessionId
											},
											function(data) {
												if (data) {
													var content = "<p style='background-color:#D5D5D5;'>Name</p><p>"
															+ data.object["name"]
															+ "</p><br/>"
															+ "<p style='background-color:#D5D5D5;'>Lastname</p><p>"
															+ data.object["lastname"]
															+ "</p><br/>"
															+ "<p style='background-color:#D5D5D5;'>Email</p><p>"
															+ data.object["email"]
															+ "</p><br/>"
															+ "<p style='background-color:#D5D5D5;'>Mobile</p><p>"
															+ data.object["mobile"]
															+ "</p><br/>"
															+ "<p style='background-color:#D5D5D5;'>Experience</p><p>"
															+ data.object["experience"]
															+ "</p><br/>"
															+ "<p style='background-color:#D5D5D5;'>Education</p><p>"
															+ data.object["education"]
															+ "</p><br/>";

													$("#colContent").html(
															content);
												}
											}, "json");
						});
	}

	$.Zyncro_Apps.helloworld.addNewSection();
}