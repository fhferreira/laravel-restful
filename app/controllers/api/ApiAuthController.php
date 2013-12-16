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
        $userMeta->first_name = $request['meta']['first_name'] ? $request['meta']['first_name'] : "";
        $userMeta->last_name = $request['meta']['last_name'] ? $request['meta']['last_name'] : "";
        $userMeta->phone = $request['meta']['phone'] ? $request['meta']['phone'] : "";
        $userMeta->save();

        $resp = RestResponseProvider::ok($user->toArray());
        return Response::json($resp);
    }
}

