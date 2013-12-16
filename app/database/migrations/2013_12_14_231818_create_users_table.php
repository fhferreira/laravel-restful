<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::dropIfExists('groups');
		Schema::create('groups', function(Blueprint $table)
		{
            $table->engine = 'InnoDB';

            $table->increments('id')->unsigned();
            $table->string('name', 32)->unique();
            $table->string('description', 64);
            $table->timestamps();
		});

		Schema::dropIfExists('users');
		Schema::create('users', function(Blueprint $table)
		{
            $table->engine = 'InnoDB';

            $table->increments('id')->unsigned();
            $table->integer('group_id')->unsigned();

            $table->string('username', 16)->unique();
            $table->string('password', 60);
            $table->string('email', 255);
            $table->enum('status', array('pending', 'active', 'inactive', 'banned'))->default('pending');
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('group_id')->references('id')->on('groups');
		});

        Schema::dropIfExists('user_meta');
		Schema::create('user_meta', function(Blueprint $table)
		{
            $table->engine = 'InnoDB';

            $table->increments('id');
            $table->integer('user_id')->unsigned();

            $table->string('first_name', 64);
            $table->string('last_name', 64);
            $table->string('phone', 16);
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
		Schema::dropIfExists('users');
        Schema::dropIfExists('user_meta');
		Schema::dropIfExists('groups');
	}

}
