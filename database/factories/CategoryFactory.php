<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */
use Illuminate\Support\Str;
use Faker\Generator as Faker;
use App\Categories;
use Carbon\Carbon;



/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(Categories::class, function (Faker $faker) {
    $year = rand(2009, 2016);
    $month = rand(1, 12);
    $day = rand(1, 28);
    $date = Carbon::create($year,$month ,$day , 0, 0, 0);
    return [
        'name' => $faker->name,
        'status' => $faker->numberBetween($min = 1, $max = 2),
        'created_at' =>$date->format('Y-m-d H:i:s'),
        'updated_at' =>$date->format('Y-m-d H:i:s')
    ];
});
