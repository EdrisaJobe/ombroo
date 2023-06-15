from .forms import RegisterForm
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required

# Create your views here.
def home(request):

    return render(request, 'pages/home.html')

# Workspace - create task
@login_required
def workspace(request):
    tasks = request.session.get('tasks', [])

    if request.method == 'POST':
        task = request.POST.get('task')

        if task:
            tasks.append(task)
            request.session['tasks'] = tasks
            return redirect('workspace')

    return render(request, 'pages/workspace.html', {'tasks': tasks})

# Workspace - delete task
def delete_task(request, task_index):
    tasks = request.session.get('tasks', []) # receive tasks from session

    if task_index >= 0 and task_index < len(tasks): # check range (items in list) and remove using pop
        tasks.pop(task_index)
        request.session['tasks'] = tasks

    referring_url = request.META.get('HTTP_REFERER')
    if referring_url:
        return redirect(referring_url)
    else:
        return redirect('workspace')

# Registration
def register(request):
    if request.method == 'POST':
        form = RegisterForm(request.POST)

        if form.is_valid():
            form.save()

        return redirect('workspace')
    else:
        form = RegisterForm()
        
    return render(request, 'registration/register.html', {"register_form": form})