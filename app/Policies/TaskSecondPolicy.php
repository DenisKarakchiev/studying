<?php

namespace App\Policies;

use App\Models\TaskSecond;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class TaskSecondPolicy
{
    use HandlesAuthorization;

    /**
     * Determine if a user can complete a task.
     *
     * @param \App\Models\User       $user
     * @param \App\Models\TaskSecond $task
     *
     * @return bool
     */
    public function complete(User $user, TaskSecond $task)
    {
        return $user->is($task->user);
    }
}
