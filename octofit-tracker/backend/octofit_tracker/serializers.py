from rest_framework import serializers

from .models import Activity, LeaderboardEntry, Team, UserProfile, WorkoutSuggestion


class ObjectIdStringMixin(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()

    def get_id(self, obj):
        return str(obj.pk)


class TeamSerializer(ObjectIdStringMixin):
    class Meta:
        model = Team
        fields = ['id', 'name', 'city']


class UserProfileSerializer(ObjectIdStringMixin):
    class Meta:
        model = UserProfile
        fields = ['id', 'name', 'email', 'team']


class ActivitySerializer(ObjectIdStringMixin):
    class Meta:
        model = Activity
        fields = ['id', 'user', 'activity_type', 'duration_minutes', 'calories_burned', 'performed_at']


class LeaderboardEntrySerializer(ObjectIdStringMixin):
    class Meta:
        model = LeaderboardEntry
        fields = ['id', 'user', 'points', 'rank']


class WorkoutSuggestionSerializer(ObjectIdStringMixin):
    class Meta:
        model = WorkoutSuggestion
        fields = ['id', 'user', 'title', 'difficulty', 'focus_area', 'duration_minutes']