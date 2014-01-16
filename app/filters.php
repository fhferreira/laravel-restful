<?php

/*
|--------------------------------------------------------------------------
| Application & Route Filters
|--------------------------------------------------------------------------
|
| Below you will find the "before" and "after" events for the application
| which may be used to do any work before or after a request into your
| application. Here you may also register your custom route filters.
|
*/

App::before(function($request)
{
	//
});


App::after(function($request, $response)
{
	//
});

/*
|--------------------------------------------------------------------------
| Authentication Filters
|--------------------------------------------------------------------------
|
| The following filters are used to verify that the user of the current
| session is logged into this application. The "basic" filter easily
| integrates HTTP Basic authentication for quick, simple checking.
|
*/

Route::filter('auth', function()
{
	if (Auth::guest()) return Redirect::guest('login');
});


Route::filter('auth.basic', function()
{
	return Auth::basic();
});

App::singleton('authToken', function ($app) { 
    $authToken = new AuthToken();
    return $authToken; 
});  

Route::filter('api.key', function()
{
    $headers = getallheaders();
    $api_key = isset($headers['X-Api-Key']) ? $headers['X-Api-Key'] : '';
    if ($api_key == "") {
        return Response::json(RestResponseProvider::unauthorized("", "Api key is required."));
    }
    if (!in_array($api_key, Config::get('restful.api.keys'))) {
        return Response::json(RestResponseProvider::unauthorized("", "Invalid api key."));
    }
    App::instance('authToken', $authToken);
});

Route::filter('api.auth', function()
{
    $headers = getallheaders();
    $hash = isset($headers['Authorization']) ? $headers['Authorization'] : '';
    if ($hash == "") {                                                                                                 
        return Response::json(RestResponseProvider::unauthorized("", "Session token is required."));                     
    }                                                                                                                  
                                                                                                                       
    $authToken = AuthToken::with('user')->find($hash);                                                                 
    if (!$authToken) {                                                                                                 
        return Response::json(RestResponseProvider::unauthorized("", "Invalid session token."));                         
    }                                                                                                                  
    if ($authToken->isExpired()) {                                                                                     
        return Response::json(RestResponseProvider::unauthorized("", "Session token has expired."));                     
    }  

    App::instance('authToken', $authToken);
});

Route::filter('api.admin', function()
{
    $authToken = App::make('authToken'); 
	if (!$authToken->user->isAdmin()) {
        return Response::json(RestResponseProvider::forbidden());
    }
});

Route::filter('api.auth.extend', function() 
{           
    $authToken = App::make('authToken'); 
    if ($authToken->id) {
        $authToken->expired_at = date('Y-m-d H:i:s', strtotime('+ 2 hours'));
        $authToken->updated_at = $authToken->expired_at;
        $authToken->save();
    }
});

/*
|--------------------------------------------------------------------------
| Guest Filter
|--------------------------------------------------------------------------
|
| The "guest" filter is the counterpart of the authentication filters as
| it simply checks that the current user is not logged in. A redirect
| response will be issued if they are, which you may freely change.
|
*/

Route::filter('guest', function()
{
	if (Auth::check()) return Redirect::to('/');
});

/*
|--------------------------------------------------------------------------
| CSRF Protection Filter
|--------------------------------------------------------------------------
|
| The CSRF filter is responsible for protecting your application against
| cross-site request forgery attacks. If this special token in a user
| session does not match the one given in this request, we'll bail.
|
*/

Route::filter('csrf', function()
{
	if (Session::token() != Input::get('_token'))
	{
		throw new Illuminate\Session\TokenMismatchException;
	}
});
