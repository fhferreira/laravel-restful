<?php
 
class GroupTableSeeder extends Seeder {
 
    public function run()
    {
        DB::table('groups')->delete();

        $admin_group = Group::create(array(
            'name' => 'admin',
            'description' => 'Admin users group'
        ));

        $member_group = Group::create(array(
            'name' => 'member',
            'description' => 'Member users group'
        ));
    }

}
