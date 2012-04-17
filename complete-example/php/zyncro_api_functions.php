<?php

	include_once "../oauth/OAuthStore.php";
	include_once "../oauth/OAuthRequester.php";
	include_once "../oauth/OAuthUtil.php";

	function getResponseAPI($userIdZyncro, $sessionid, $serviceAPI) {
  
  		// Init the OAuthStore
  		$options = array(
  			'consumer_key' => CONSUMER_KEY, 
  			'consumer_secret' => CONSUMER_SECRET,
  			'server_uri' => OAUTH_HOST,
  			'request_token_uri' => REQUEST_TOKEN_URL,
    		'signature_methods' => array('HMAC-SHA1'),
  			'authorize_uri' => AUTHORIZE_URL,
  			'access_token_uri' => ACCESS_TOKEN_URL
  		);
  
  		// Note: do not use "Session" storage in production. Prefer a database
  		// storage, such as MySQL.
  		OAuthStore::instance("Session", $options);
    	
    	try 
    	{
      		// get a request token
      		$getRequestTokenParams = array();
      		$tokenResultParams = OAuthRequester::requestRequestToken(CONSUMER_KEY, 0, $getRequestTokenParams,'GET');
      		
      		// get an access token
    		$oauthToken = $tokenResultParams['token'];
        	$getAccessTokenParams = array('oauth_verifier' => $sessionid);
		    OAuthRequester::requestAccessToken(CONSUMER_KEY, $oauthToken, 0, 'POST',  $getAccessTokenParams);
	    	
    		// make the request.
      		$urlRequest = OAUTH_HOST.$serviceAPI;
    		$request = new OAuthRequester($urlRequest, 'GET');
    		$result = $request->doRequest(0);
    		if ($result['code'] == 200) 
    		{
    			return $result['body'];
	    	}    		
    	}
    	catch(OAuthException2 $e) {
    	}
	}
?>