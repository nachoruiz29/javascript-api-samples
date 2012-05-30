<?php
	
	// ACCESS ZYNCRO API
	define("OAUTH_HOST", "https://my.sandbox.zyncro.com" );
	define("CONSUMER_KEY", "ApiKey");
	define("CONSUMER_SECRET", "ApiSecret");
	define("REQUEST_TOKEN_URL", OAUTH_HOST . "/tokenservice/oauth/v1/get_request_token");
	define("ACCESS_TOKEN_URL", OAUTH_HOST . "/tokenservice/oauth/v1/get_access_token");
	
	define('OAUTH_TMP_DIR', function_exists('sys_get_temp_dir') ? sys_get_temp_dir() : realpath($_ENV["TMP"]));
	
?>