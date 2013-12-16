<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAuthTokensTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::dropIfExists('auth_tokens');
		Schema::create('auth_tokens', function(Blueprint $table)
		{
            $table->string('id', 32)->primary();
            $table->text('data');
            $table->timestamp('expired_at')->default('0000-00-00 00:00:00');
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::dropIfExists('auth_tokens');
	}

}
