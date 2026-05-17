from django.urls import path

from .views import (submit_assessment, test_api,register_user,login_user,profile,assessment_history,dashboard_stats)

urlpatterns = [

    path('test/', test_api),

    path('register/', register_user),

    path('login/', login_user),

    path('profile/', profile),
    path('assessment/', submit_assessment),
    path('assessment/history/', assessment_history),
    path('dashboard/', dashboard_stats),
]