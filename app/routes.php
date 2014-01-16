<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::get('/', function()
{
    $data = array();
    return View::make('home.base')->nest('content', 'home.index', $data);
});

Route::get('app', function()
{
    $data = array();
    return View::make('app', $data);
});

Route::post('api/upload', array(
    'before' => 'api.auth',
    'uses' => 'ApiUploadController@upload',
    'after' => 'api.auth.extend'
));

Route::group(array(
    'prefix' => 'api/users',
    'before' => 'api.auth',
    'after' => 'api.auth.extend'
), function () {
    
    // Find users
    Route::get('', array(
        'before' => 'api.admin',
        'uses' => 'ApiUsersController@find'
    ));
    
    // Get user by id
    Route::get('{id}', array(
        'uses' => 'ApiUsersController@getById'
    ))->where(array('id' => '[0-9]+'));
    
    // Get user by username
    Route::get('{username}', array(
        'uses' => 'ApiUsersController@getByUsername'
    ))->where(array('username' => '[A-Za-z]+'));
    
    // Get me
    Route::get('me', array(
        'uses' => 'ApiUsersController@getByUsername'
    ));
    
    // Create user
    Route::post('', array(
        'before' => 'api.admin',
        'uses' => 'ApiUsersController@create'
    ))->where(array('id' => '[0-9]+'));
    
    // Update user by id
    Route::put('{id}', array(
        'uses' => 'ApiUsersController@update'
    ));
    
    // Update me
    Route::put('me', array(
        'uses' => 'ApiUsersController@update'
    ));
    
    // Delete user by id
    Route::delete('{id}', array(
        'before' => 'api.admin',
        'uses' => 'ApiUsersController@delete'
    ))->where(array('id' => '[0-9]+'));
    
    // Upload user (by id) profile image
    Route::post('{id}/uploadProfileImage', array(
        'before' => 'api.admin',
        'uses' => 'ApiUsersController@uploadProfileImage'
    ));
    
    // Upload my profile image
    Route::post('me/uploadProfileImage', array(
        'uses' => 'ApiUsersController@uploadProfileImage'
    ));
});

Route::group(array('prefix' => 'api/auth'), function () {

    // Login
    Route::post('login', array(
        'uses' => 'ApiAuthController@login'
    ));
    
    // Register
    Route::post('register', array(
        'uses' => 'ApiAuthController@register'
    ));
    
    // Logout
    Route::get('logout', array(
        'before' => 'api.auth',
        'uses' => 'ApiAuthController@logout'
    ));

});
