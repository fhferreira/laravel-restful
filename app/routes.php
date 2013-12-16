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

Route::group(array('prefix' => 'api/users'), function () {
    
    // Find users
    Route::get('', array(
        'before' => 'api.auth|api.admin',
        'uses' => 'ApiUsersController@find'
    ));
    
    // Get user by id
    Route::get('{id}', array(
        'before' => 'api.auth',
        'uses' => 'ApiUsersController@getById'
    ))->where(array('id' => '[0-9]+'));
    
    // Get user by username
    Route::get('{username}', array(
        'before' => 'api.auth',
        'uses' => 'ApiUsersController@getByUsername'
    ))->where(array('username' => '[A-Za-z]+'));
    
    // Get me
    Route::get('me', array(
        'before' => 'api.auth',
        'uses' => 'ApiUsersController@getByUsername'
    ));
    
    // Create user
    Route::post('', array(
        'before' => 'api.auth|api.admin',
        'uses' => 'ApiUsersController@create'
    ))->where(array('id' => '[0-9]+'));
    
    // Update user by id
    Route::put('{id}', array(
        'before' => 'api.auth|api.admin',
        'uses' => 'ApiUsersController@update'
    ))->where(array('id' => '[0-9]+'));
    
    // Update me
    Route::put('me', array(
        'before' => 'api.auth',
        'uses' => 'ApiUsersController@update'
    ));
    
    // Delete user by id
    Route::delete('{id}', array(
        'before' => 'api.auth|api.admin',
        'uses' => 'ApiUsersController@delete'
    ))->where(array('id' => '[0-9]+'));
    
    // Upload user (by id) profile image
    Route::post('{id}/uploadProfileImage', array(
        'before' => 'api.auth|api.admin',
        'uses' => 'ApiUsersController@uploadProfileImage'
    ));
    
    // Upload my profile image
    Route::post('me/uploadProfileImage', array(
        'before' => 'api.auth',
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
