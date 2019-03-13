<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::middleware(['auth'])->group(function () {
    Route::resource('tasks', 'TaskController', [
        'only' => [
            'index',
            'store',
            'update'
        ]
    ]);

    Route::resource('taskSeconds', 'TaskSecondController', [
        'only' => [
            'index',
            'store',
            'update'
        ]
    ]);

});
