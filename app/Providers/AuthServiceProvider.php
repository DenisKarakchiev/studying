<?php

namespace App\Providers;

use App\Models\Task;
use App\Models\TaskSecond;
use App\Policies\TaskPolicy;
use App\Policies\TaskSecondPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies
        = [
            Task::class       => TaskPolicy::class,
            TaskSecond::class => TaskSecondPolicy::class,
        ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();
    }
}
