from django.shortcuts import render, redirect
from .forms import RegisterForm

# Create your views here.
def home(request):

    return render(request, 'pages/home.html')

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
        
    return render(request, 'register/register.html', {"form": form})