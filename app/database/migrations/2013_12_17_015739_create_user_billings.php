<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserBillings extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('user_billings', function(Blueprint $table)
		{
            $table->engine = 'InnoDB';

			$table->increments('id')->unsigned();
            $table->integer('user_id')->unsigned();
            $table->string("credit_card_name", 64);
            $table->string("credit_card_num", 32);
            $table->string("credit_card_type", 32);
            $table->smallInteger("credit_card_expiry_month")->unsigned();
            $table->smallInteger("credit_card_expiry_year")->unsigned();
            $table->smallInteger("credit_card_ccv")->unsigned();
            $table->smallInteger("same_as_profile")->unsigned()->default(0);
            $table->string("address1");
            $table->string("address2");
            $table->string("city", 32);
            $table->string("province", 32);
            $table->string("postal", 16);
            $table->string("country", 32);
			$table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::dropIfExists('user_billings');
	}

}
