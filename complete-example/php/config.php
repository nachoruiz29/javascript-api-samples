<?php
	
	$protocol = strpos(strtolower($_SERVER['SERVER_PROTOCOL']),'https') === FALSE ? 'http' : 'https';
	define( "OAUTH_HOST", $protocol . "://" . $_SERVER['HTTP_HOST'] );

	// ACCESS ZYNCRO API INT
	define("CONSUMER_KEY", "e0ad8093cdbe4407a93a7cd256ef0034");
	define("CONSUMER_SECRET", "af186398d4d44cf2803f29eb08273b0f");
	define("REQUEST_TOKEN_URL", OAUTH_HOST . "/tokenservice/oauth/v1/get_request_token");
	define("ACCESS_TOKEN_URL", OAUTH_HOST . "/tokenservice/oauth/v1/get_access_token");
	
	define('OAUTH_TMP_DIR', function_exists('sys_get_temp_dir') ? sys_get_temp_dir() : realpath($_ENV["TMP"]));
	
?>