<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddNewFieldsToUserMeta extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('user_meta', function(Blueprint $table)
		{
			$table->string('address1');
			$table->string('address2');
			$table->string('city', 32);
            $table->string('postal', 16);
            $table->string('fax', 16);
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
			$table->dropColumn('address1');
			$table->dropColumn('address2');
			$table->dropColumn('city');
            $table->dropColumn('postal');
            $table->dropColumn('fax');
		});
	}

}
