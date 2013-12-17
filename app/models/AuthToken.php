<?php

class AuthToken extends Eloquent {

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'auth_tokens';

    protected $fillable = array('id');
    public $incrementing = false;

    public static function login($username, $password)
    {
        $user = User::where('username', $username)
            ->first();

        if ($user && Hash::check($password, $user->password)) {
            $authToken = new AuthToken();
            $authToken->id = md5(time() + $username + $password);
            $authToken->user_id = $user->id;
            $authToken->data = serialize(array());
            $authToken->created_at = date('Y-m-d H:i:s');
            $authToken->updated_at = $authToken->created_at;
            $authToken->expired_at = date('Y-m-d H:i:s', strtotime("+ 2 hours"));
            $authToken->save();


            return $authToken;
        } else {
            return null;
        }
    }

    public function user() {
        return $this->belongsTo('User');
    }    

    public function isExpired() {
        $now = time();
        $expired_at = strtotime($this->expired_at);
        if ($now > $expired_at) {
            return true;
        }
        
        return false;
    }

    public function extendExpiry() {
        $this->expired_at = date('Y-m-d H:i:s', strtotime("+ 2 hours"));
        $this->save();
    }
}

