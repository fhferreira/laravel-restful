<?php 

return array( 
	
	/*
	|--------------------------------------------------------------------------
	| oAuth Config
	|--------------------------------------------------------------------------
	*/

	/**
	 * Storage
	 */
	'storage' => 'Memory', 

	/**
	 * Consumers
	 */
	'consumers' => array(

		/**
		 * Facebook
		 */
        'Facebook' => array(
            'client_id'     => '246062635555981',
            'client_secret' => '2a40e5b6d944253949f595e2668a3463',
            'scope'         => array('email', 'user_birthday'),
        ),		

		/**
		 * Twitter
		 */
        'Twitter' => array(
            'client_id'     => 'ZzRYAFPi9yC0XJdy4LdQ',
            'client_secret' => 'F6mN3PH2z7vVGRByy4sfpF0OE3cYyZ1jXnQWURfk',
            'scope'         => array(),
        ),		

		/**
		 * Instagram
		 */
        'Instagram' => array(
            'client_id'     => 'e09e6ebfcb744fa7920273f8f2d2f247',
            'client_secret' => 'b16ab23d048a452684278e0d7dae480d',
            'scope'         => array('basic'),
        ),		
	)

);

