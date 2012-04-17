<?php
	include_once "config.php";
	include_once "zyncro_api_functions.php";

	if(!empty($_POST["iduser"])) 
	{
  		// API service to get the user profile from Zyncro API
  		$serviceAPI = "/api/v1/rest/users/" . $_POST["iduser"];
  		// get response from API service
  		$responseAPI = getResponseAPI($_POST["iduser"], $_POST["sessionid"], $serviceAPI);
  		// return the json response
  		echo $responseAPI;
	}
?>