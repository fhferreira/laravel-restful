<?php

class UserBilling extends Eloquent {

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'user_billings';

    public function user()
    {
        return $this->belongsTo('User');
    }

}

