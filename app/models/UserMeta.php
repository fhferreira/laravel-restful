<?php

class UserMeta extends Eloquent {

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'user_meta';

    public function user()
    {
        return $this->belongsTo('User');
    }

}
