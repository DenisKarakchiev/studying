<?php

namespace App\Http\Controllers;

use App\Models\TaskSecond;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TaskSecondController extends Controller
{
    /**
     * Paginate the authenticated user's tasks.
     *
     * @return \Illuminate\View\View
     */
    public function index()
    {
        // paginate the authorized user's tasks with 5 per page
        $tasks = Auth::user()
            ->taskSeconds()
            ->orderBy('is_complete')
            ->orderByDesc('created_at')
            ->paginate(5);

        // return task index view with paginated tasks
        return view('taskSeconds', [
            'tasks' => $tasks
        ]);
    }

    /**
     * Store a new incomplete task for the authenticated user.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        // validate the given request
        $data = $this->validate($request, [
            'title' => 'required|string|max:255',
        ]);

        // create a new incomplete task with the given title
        Auth::user()->taskSeconds()->create([
            'title' => $data['title'],
            'is_complete' => false,
        ]);

        // flash a success message to the session
        session()->flash('status', 'Task Created!');

        // redirect to tasks index
        return redirect('/taskSeconds');
    }

    /**
     * Mark the given task as complete and redirect to tasks index.
     *
     * @param \App\Models\Task $task
     * @return \Illuminate\Routing\Redirector
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function update(TaskSecond $task)
    {
        // check if the authenticated user can complete the task
        $this->authorize('complete', $task);

        // mark the task as complete and save it
        $task->is_complete = true;
        $task->save();

        // flash a success message to the session
        session()->flash('status', 'Task Completed!');

        // redirect to tasks index
        return redirect('/taskSeconds');
    }
}
