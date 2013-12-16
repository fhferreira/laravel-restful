<?php

class ApiUsersController extends BaseApiController {

    /**
     *  @param  page    optional    page number
     *  @param  limit   optional    page limit
     *
     *  @desc Find users
     **/
    public function find()
    {
        $limit = Input::get('limit') ? (int)Input::get('limit') : Config::get('restful.defaults.pagination.limit');
        
        $users = User::with('meta', 'group')->paginate($limit);

        if ($users) {
            $resp = RestResponseProvider::ok($users->toArray());
        } else {
            $resp = RestResponseProvider::ok(array(), "User(s) not found.");
        }
        return Response::json($resp);
    }

    /**
     *  @desc Get user by id
     **/
    public function getById($id)
    {
        $user = User::with('meta', 'group')->find($id);

        if ($user) {
            $resp = RestResponseProvider::ok($user->toArray());
        } else {
            $resp = RestResponseProvider::ok(null, "User not found.");
        }
        return Response::json($resp);
    }


    /**
     *  @desc Get user by username
     **/
    public function getByUsername($username)
    {
        if ($username == 'me') {
            $authToken = App::make('authToken');
            $user = $authToken->user;
        } else {
            $user = User::where('username', $username)->with('meta', 'group')->first();
        }

        if ($user) {
            $resp = RestResponseProvider::ok($user->toArray());
        } else {
            $resp = RestResponseProvider::ok(null, "User not found.");
        }
        return Response::json($resp);
    }


    /**
     *  @desc Create user 
     **/
    public function create()
    {
        $requestBody = file_get_contents('php://input');
        $request = json_decode($requestBody, true);

        $validator = Validator::make(
            $request,
            array(
                'group_id' => 'required|exists:groups,id',
                'username' => 'required|alpha_dash|min:5|max:16|unique:users',
                'password' => 'required|min:5',
                'email' => 'required|email',
                'status' => 'required|in:pending,active,inactive,banned'
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
        
        $user = new User();
        $user->group_id = $request['group_id'];
        $user->username = $request['username'];
        $user->password = Hash::make($request['password']);
        $user->email = $request['email'];
        $user->status = $request['status'];
        $user->save();

        $userMeta = new UserMeta();
        $userMeta->user_id = $user->id;
        $userMeta->first_name = isset($request['meta']['first_name']) ? $request['meta']['first_name'] : "";
        $userMeta->last_name = isset($request['meta']['last_name']) ? $request['meta']['last_name'] : "";
        $userMeta->address1 = isset($request['meta']['address1']) ? $request['meta']['address1'] : "";
        $userMeta->address2 = isset($request['meta']['address2']) ? $request['meta']['address2'] : "";
        $userMeta->city = isset($request['meta']['city']) ? $request['meta']['city'] : "";
        $userMeta->postal = isset($request['meta']['postal']) ? $request['meta']['postal'] : "";
        $userMeta->fax = isset($request['meta']['fax']) ? $request['meta']['fax'] : "";
        $userMeta->phone = isset($request['meta']['phone']) ? $request['meta']['phone'] : "";
        $userMeta->save();

        $resp = RestResponseProvider::ok($user->toArray());
        return Response::json($resp);
    }

    /**
     *  @desc Update user
     **/
    public function update($id)
    {
        $requestBody = file_get_contents('php://input');
        $request = json_decode($requestBody, true);
        $validator = Validator::make(
            $request,
            array(
                'group_id' => 'required|exists:groups,id',
                'password' => 'min:5',
                'email' => 'required|email',
                'status' => 'required|in:pending,active,inactive,banned'
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
        
        if ($id == 'me') {
            $authToken = App::make('authToken');
            $user = $authToken->user;
        } else {
            $user = User::with('meta', 'group')->find($id);
        }

        if (!$user) {
            $resp = RestResponseProvider::ok(null, "User not found.");
            return Response::json($resp);
        } 

        $user->group_id = $request['group_id'];
        //$user->username = $request['username']; // cannot change username
        if (isset($request['password'])) {
            $user->password = Hash::make($request['password']);
        }
        $user->email = $request['email'];
        $user->status = $request['status'];
        $user->save();

        $userMeta = $user->meta;
        $userMeta->user_id = $user->id;
        $userMeta->first_name = isset($request['meta']['first_name']) ? $request['meta']['first_name'] : "";
        $userMeta->last_name = isset($request['meta']['last_name']) ? $request['meta']['last_name'] : "";
        $userMeta->address1 = isset($request['meta']['address1']) ? $request['meta']['address1'] : "";
        $userMeta->address2 = isset($request['meta']['address2']) ? $request['meta']['address2'] : "";
        $userMeta->city = isset($request['meta']['city']) ? $request['meta']['city'] : "";
        $userMeta->postal = isset($request['meta']['postal']) ? $request['meta']['postal'] : "";
        $userMeta->fax = isset($request['meta']['fax']) ? $request['meta']['fax'] : "";
        $userMeta->phone = isset($request['meta']['phone']) ? $request['meta']['phone'] : "";
        $userMeta->save();

        $resp = RestResponseProvider::ok($user->toArray());
        return Response::json($resp);
    }

    /**
     *  @desc Delete user
     **/
    public function delete($id)
    {
        $requestBody = file_get_contents('php://input');
        $request = json_decode($requestBody);
        
        $user = User::with('meta', 'group')->find($id);

        if ($user) {
            $user->delete();
            $resp = RestResponseProvider::ok(null);
        } else {
            $resp = RestResponseProvider::ok(null, "User not found.");
        }
        return Response::json($resp);
    }

    /**
     *  @desc Upload profile image 
     **/
    public function uploadProfileImage($id) {
        if ($id == 'me') {
            $authToken = App::make('authToken');
            $user = $authToken->user;
        } else {
            $user = User::with('meta', 'group')->find($id);
        }
        
        if ($user) {
            if (Input::hasFile('img'))
            {
                $extension = Input::file('img')->getClientOriginalExtension();
                $filename = $user->username . '.' . $extension;
                Input::file('img')->move(Config::get('restful.paths.profile_img'), $filename);
            }

            $userMeta = $user->meta;
            $userMeta->profile_img_url = Config::get('restful.urls.profile_img') . '/' . $filename;
            $userMeta->save();

            $resp = RestResponseProvider::ok($userMeta->profile_img_url);
        } else {
            $resp = RestResponseProvider::ok(null, "User not found.");
        }
        return Response::json($resp);
    }
}
