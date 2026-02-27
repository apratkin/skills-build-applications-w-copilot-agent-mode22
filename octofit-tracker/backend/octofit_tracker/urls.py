import os

from django.contrib import admin
from django.urls import include, path
from rest_framework import routers
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse

from .views import (
    ActivityViewSet,
    LeaderboardEntryViewSet,
    TeamViewSet,
    UserProfileViewSet,
    WorkoutSuggestionViewSet,
)

codespace_name = os.environ.get('CODESPACE_NAME')
if codespace_name:
    base_url = f"https://{codespace_name}-8000.app.github.dev"
else:
    base_url = "http://localhost:8000"

router = routers.DefaultRouter()
router.register(r'users', UserProfileViewSet, basename='users')
router.register(r'teams', TeamViewSet, basename='teams')
router.register(r'activities', ActivityViewSet, basename='activities')
router.register(r'leaderboard', LeaderboardEntryViewSet, basename='leaderboard')
router.register(r'workouts', WorkoutSuggestionViewSet, basename='workouts')


@api_view(['GET'])
def api_root(request, format=None):
    return Response(
        {
            'base_url': base_url,
            'users': reverse('users-list', request=request, format=format),
            'teams': reverse('teams-list', request=request, format=format),
            'activities': reverse('activities-list', request=request, format=format),
            'leaderboard': reverse('leaderboard-list', request=request, format=format),
            'workouts': reverse('workouts-list', request=request, format=format),
        }
    )

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', api_root, name='api-root'),
    path('api/', include(router.urls)),
]
