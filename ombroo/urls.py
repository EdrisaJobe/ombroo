"""ombroo URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from app import views

urlpatterns = [
    path('admin/', admin.site.urls),

    ### REGISTRATION ###
    path('register/', views.register, name ='register'),
    path('', include('django.contrib.auth.urls')),

    ### PAGES ###
    path('', views.home, name='home'),
    path('workspace/', views.workspace, name='workspace'),
    path('workspace/delete/<int:task_index>/', views.delete_task, name='delete_task'), # delete task
    path('delete-all-tasks/', views.delete_completed_tasks, name='delete_completed_tasks'), # delete all tasks
]
