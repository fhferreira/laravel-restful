<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddMoreFieldsToUserMeta extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('user_meta', function(Blueprint $table)
		{
			$table->string('country', 32);
            $table->string('province', 32);
            $table->string('company', 32);
            $table->string('website_url');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('user_meta', function(Blueprint $table)
		{
			$table->dropColumn('country');
            $table->dropColumn('province');
            $table->dropColumn('company');
            $table->dropColumn('website_url');
		});
	}

}
