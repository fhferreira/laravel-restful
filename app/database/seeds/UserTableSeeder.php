<?php
 
class UserTableSeeder extends Seeder {
 
    public function run()
    {
        DB::table('users')->delete();

        $admin_group = Group::where('name', 'admin')->first();
        $member_group = Group::where('name', 'admin')->first();
 
        $admin_user = User::create(array(
            'group_id' => $admin_group->id,
            'username' => 'admin',
            'password' => Hash::make('password'),
            'email' => 'admin@example.com',
            'status' => 'active'
        ));
        UserMeta::create(array(
            'user_id' => $admin_user->id,
            'first_name' => 'John',
            'last_name' => 'Admin'
        ));
 
        $member_user = User::create(array(
            'group_id' => $member_group->id,
            'username' => 'member',
            'password' => Hash::make('password'),
            'email' => 'member@example.com',
            'status' => 'active'
        ));
        UserMeta::create(array(
            'user_id' => $member_user->id,
            'first_name' => 'John',
            'last_name' => 'Member'
        ));
    }
 
}

