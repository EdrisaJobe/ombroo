from .forms import RegisterForm
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required

# Create your views here.
def home(request):

    return render(request, 'pages/home.html')

# Workspace
@login_required
def workspace(request):

    return render(request, 'pages/workspace.html')


# Registration
def register(request):
    if request.method == "POST":
        form = RegisterForm(request.POST)

        if form.is_valid():
            form.save()

        return redirect('workspace')
    else:
        form = RegisterForm()
        
    return render(request, 'registration/register.html', {"register_form": form})