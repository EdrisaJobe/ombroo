from .forms import RegisterForm
from django.contrib.auth import get_user
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.sessions.backends.db import SessionStore

# Create your views here.
def home(request):

    return render(request, 'pages/home.html')

# Workspace - create task
@login_required
def workspace(request):
    # Get the current user
    user = get_user(request)

    # Retrieve or create a session object for the user
    session = request.session

    if 'tasks' not in session:
        session['tasks'] = []

    tasks = session['tasks']

    if request.method == 'POST':
        task = request.POST.get('task')

        if task:
            tasks.append(task)
            session['tasks'] = tasks
            session.modified = True

            return redirect('workspace')

    return render(request, 'pages/workspace.html', {'tasks': tasks})


# Workspace - delete specific task
def delete_task(request, task_index):
    # Retrieve the tasks from the user's session
    tasks = request.session.get('tasks', [])

    if task_index >= 0 and task_index < len(tasks):
        tasks.pop(task_index)
        request.session['tasks'] = tasks

    referring_url = request.META.get('HTTP_REFERER')
    if referring_url:
        return redirect(referring_url)
    else:
        return redirect('workspace')


    
#Workspace - delete completed tasks
def delete_completed_tasks(request):
    if request.method == 'POST':
        
        if 'tasks' in request.session:
            del request.session['tasks']

    return redirect('workspace')


def register(request):
    if request.method == 'POST':
        form = RegisterForm(request.POST)

        if form.is_valid():
            form.save()

            # Create a new session for the user
            session = SessionStore()
            session.create()

            # Associate the session with the user
            request.session = session

        return redirect('workspace')
    else:
        form = RegisterForm()
        
    return render(request, 'registration/register.html', {"register_form": form})

