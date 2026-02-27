from rest_framework import viewsets

from .models import Activity, LeaderboardEntry, Team, UserProfile, WorkoutSuggestion
from .serializers import (
    ActivitySerializer,
    LeaderboardEntrySerializer,
    TeamSerializer,
    UserProfileSerializer,
    WorkoutSuggestionSerializer,
)


class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all().order_by('name')
    serializer_class = TeamSerializer


class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.select_related('team').all().order_by('name')
    serializer_class = UserProfileSerializer


class ActivityViewSet(viewsets.ModelViewSet):
    queryset = Activity.objects.select_related('user').all().order_by('-performed_at')
    serializer_class = ActivitySerializer


class LeaderboardEntryViewSet(viewsets.ModelViewSet):
    queryset = LeaderboardEntry.objects.select_related('user').all().order_by('rank')
    serializer_class = LeaderboardEntrySerializer


class WorkoutSuggestionViewSet(viewsets.ModelViewSet):
    queryset = WorkoutSuggestion.objects.select_related('user').all().order_by('title')
    serializer_class = WorkoutSuggestionSerializer