<?php

use Faker\Generator as Faker;

$factory->define(App\Models\TaskSecond::class, function (Faker $faker) {
    return [
        'title'       => $faker->sentence,
        'is_complete' => $faker->boolean,
    ];
});
