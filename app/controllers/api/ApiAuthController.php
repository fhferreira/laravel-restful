<?php

class ApiAuthController extends BaseApiController {

    /**
     *  @desc Login
     **/
    public function login()
    {
        $requestBody = file_get_contents('php://input');
        $request = json_decode($requestBody);

        if ($authToken = AuthToken::login($request->username, $request->password)) {
            $resp = RestResponseProvider::ok($authToken->toArray());
        } else {
            $resp = RestResponseProvider::badrequest(null, "Invalid Username/Password");
        }
        return Response::json($resp);
    }

    /**
     *  @desc Logout
     **/
    public function logout()
    {
        $authToken = App::make('authToken');
        $authToken->expired_at = date('Y-m-d H:i:s');
        $authToken->updated_at = $authToken->expired_at;
        $authToken->save();
        $resp = RestResponseProvider::ok(null);
        return Response::json($resp);
    }

    /**
     *  @desc Register user 
     **/
    public function register()
    {
        $requestBody = file_get_contents('php://input');
        $request = json_decode($requestBody, true);

        $validator = Validator::make(
            $request,
            array(
                'username' => 'required|alpha_dash|min:5|max:16|unique:users',
                'password' => 'required|min:5',
                'email' => 'required|email'
            )
        );
        if ($validator->fails())
        {
            $messages = $validator->messages();
            $resp = RestResponseProvider::badrequest(array(
                'validation' => $messages->toArray()
            ));
            return Response::json($resp);
        }

        $group = Group::where('name', Config::get('restful.defaults.group.name'))->first();
        
        $user = new User();
        $user->group_id = $group->id;
        $user->username = $request['username'];
        $user->password = Hash::make($request['password']);
        $user->email = $request['email'];
        $user->status = Config::get('restful.defaults.user.status');
        $user->save();

        $userMeta = new UserMeta();
        $userMeta->user_id = $user->id;
        $userMeta->first_name = isset($request['meta']['first_name']) ? $request['meta']['first_name'] : "";
        $userMeta->last_name = isset($request['meta']['last_name']) ? $request['meta']['last_name'] : "";
        $userMeta->address1 = isset($request['meta']['address1']) ? $request['meta']['address1'] : "";
        $userMeta->address2 = isset($request['meta']['address2']) ? $request['meta']['address2'] : "";
        $userMeta->country = isset($request['meta']['country']) ? $request['meta']['country'] : "";
        $userMeta->province = isset($request['meta']['province']) ? $request['meta']['province'] : "";
        $userMeta->city = isset($request['meta']['city']) ? $request['meta']['city'] : "";
        $userMeta->postal = isset($request['meta']['postal']) ? $request['meta']['postal'] : "";
        $userMeta->fax = isset($request['meta']['fax']) ? $request['meta']['fax'] : "";
        $userMeta->phone = isset($request['meta']['phone']) ? $request['meta']['phone'] : "";
        $userMeta->company = isset($request['meta']['company']) ? $request['meta']['company'] : "";
        $userMeta->website_url = isset($request['meta']['website_url']) ? $request['meta']['website_url'] : "";
        $userMeta->profile_img_url = isset($request['meta']['profile_img_url']) ? $request['meta']['profile_img_url'] : "";
        $userMeta->save();

        $userBilling = new UserBilling();
        $userBilling->user_id = $user->id;
        $userBilling->credit_card_name = isset($request['billing']['credit_card_name']) ? $request['billing']['credit_card_name'] : "";
        $userBilling->credit_card_num = isset($request['billing']['credit_card_num']) ? $request['billing']['credit_card_num'] : "";
        $userBilling->credit_card_type = isset($request['billing']['credit_card_type']) ? $request['billing']['credit_card_type'] : "";
        $userBilling->credit_card_expiry_month = isset($request['billing']['credit_card_expiry_month']) ? $request['billing']['credit_card_expiry_month'] : "";
        $userBilling->credit_card_expiry_year = isset($request['billing']['credit_card_expiry_year']) ? $request['billing']['credit_card_expiry_year'] : "";
        $userBilling->credit_card_ccv = isset($request['billing']['credit_card_ccv']) ? $request['billing']['credit_card_ccv'] : "";
        $userBilling->same_as_profile = isset($request['billing']['same_as_profile']) ? $request['billing']['same_as_profile'] : "";
        $userBilling->address1 = isset($request['billing']['address1']) ? $request['billing']['address1'] : "";
        $userBilling->address2 = isset($request['billing']['address2']) ? $request['billing']['address2'] : "";
        $userBilling->country = isset($request['billing']['country']) ? $request['billing']['country'] : "";
        $userBilling->province = isset($request['billing']['province']) ? $request['billing']['province'] : "";
        $userBilling->city = isset($request['billing']['city']) ? $request['billing']['city'] : "";
        $userBilling->postal = isset($request['billing']['postal']) ? $request['billing']['postal'] : "";
        $userBilling->save();

        $resp = RestResponseProvider::ok($user->toArray());
        return Response::json($resp);
    }

    public function oauth() {
        // if its a logged in user and watns to hook up an 3rd party service
        if ($hash = Input::get('session_id')) {
            $authToken = AuthToken::with('user')->find($hash);
            if (!$authToken) { 
                return Response::json(RestResponseProvider::unauthorized("", "Invalid session token.")); 
            }
            if ($authToken->isExpired()) { 
                return Response::json(RestResponseProvider::unauthorized("", "Session token has expired.")); 
            }
            if ($provider = Input::get('provider')) {
                
            }
        } else {

        }
    }

    public function oauth2() {

    }
}

