<?php

return array(
    'api' => array(
        'keys' => array(
            'hru8ud28emvr394jd'
        )
    ),
    'paths' => array(
        'profile_img' => public_path() . "/img/profile"
    ),
    'urls' => array(
        'profile_img' => asset('img/profile')
    ),
    'defaults' => array(
        'pagination' => array(
            'limit' => 20
        ),
        'user' => array(
            'status' => 'active'
        ),
        'group' => array(
            'name' => 'member'
        )
    )
);
