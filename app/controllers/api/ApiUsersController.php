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
        $authToken = App::make('authToken');
        if ($authToken->user->isAdmin()) {
            $user = User::with('meta', 'group', 'billing')->find($id); // show billing
        } else {
            $user = User::with('meta', 'group')->find($id);
        }

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
        $authToken = App::make('authToken');
        if ($username == 'me') {
            $user = User::with('meta', 'group', 'billing')->find($authToken->user_id);
        } else {
            if ($authToken->user->isAdmin()) {
                $user = User::where('username', $username)->with('meta', 'group', 'billing')->first(); // show billing
            } else {
                $user = User::where('username', $username)->with('meta', 'group')->first();
            }
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
        
        $authToken = App::make('authToken');
        $currentUser = $authToken->user;
        if ($id == 'me') {
            $id = $currentUser->id;
        } else {
            if (!$currentUser->isAdmin()) {
                $resp = RestResponseProvider::forbidden("", "Can't update other user.");
                return Response::json($resp);
            }
        } 
        $user = User::with('meta', 'group', 'billing')->find($id);

        if (!$user) {
            $resp = RestResponseProvider::ok(null, "User not found.");
            return Response::json($resp);
        } 

        $user->group_id = $request['group_id'];
        //$user->username = $request['username']; // cannot change username
        if (isset($request['password']) && $request['password'] != "") {
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

        $userBilling = $user->billing;
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

    /**
     *  @desc Delete user
     **/
    public function delete($id)
    {
        $requestBody = file_get_contents('php://input');
        $request = json_decode($requestBody);
        
        $user = User::find($id);

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
            $id = $authToken->user_id;
        } 
        $user = User::with('meta')->find($id);
        
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
