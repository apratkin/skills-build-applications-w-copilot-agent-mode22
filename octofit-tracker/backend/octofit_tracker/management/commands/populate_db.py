from datetime import timedelta

from django.core.management.base import BaseCommand
from django.utils import timezone

from octofit_tracker.models import (
    Activity,
    LeaderboardEntry,
    Team,
    UserProfile,
    WorkoutSuggestion,
)


class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        self.stdout.write('Cleaning existing data...')
        Activity.objects.all().delete()
        LeaderboardEntry.objects.all().delete()
        WorkoutSuggestion.objects.all().delete()
        UserProfile.objects.all().delete()
        Team.objects.all().delete()

        self.stdout.write('Creating teams...')
        team_marvel = Team.objects.create(name='Team Marvel', city='New York')
        team_dc = Team.objects.create(name='Team DC', city='Gotham')

        self.stdout.write('Creating users...')
        users = [
            UserProfile.objects.create(name='Spider-Man', email='spiderman@octofit.dev', team=team_marvel),
            UserProfile.objects.create(name='Iron Man', email='ironman@octofit.dev', team=team_marvel),
            UserProfile.objects.create(name='Captain Marvel', email='captainmarvel@octofit.dev', team=team_marvel),
            UserProfile.objects.create(name='Batman', email='batman@octofit.dev', team=team_dc),
            UserProfile.objects.create(name='Wonder Woman', email='wonderwoman@octofit.dev', team=team_dc),
            UserProfile.objects.create(name='Flash', email='flash@octofit.dev', team=team_dc),
        ]

        self.stdout.write('Creating activities, leaderboard entries, and workouts...')
        now = timezone.now()
        activity_templates = [
            ('Running', 45, 520),
            ('Cycling', 35, 410),
            ('Strength Training', 50, 600),
            ('Yoga', 30, 220),
            ('Swimming', 40, 480),
            ('HIIT', 25, 430),
        ]

        workout_templates = [
            ('Hero Endurance Circuit', 'Intermediate', 'Cardio', 35),
            ('Power Core Blast', 'Advanced', 'Core', 30),
            ('Mobility Reset Flow', 'Beginner', 'Flexibility', 25),
            ('Strength Superset Session', 'Intermediate', 'Strength', 40),
            ('Speed Force Intervals', 'Advanced', 'Agility', 20),
            ('Recovery Hero Stretch', 'Beginner', 'Recovery', 15),
        ]

        leaderboard_points = [980, 920, 875, 840, 790, 760]

        for index, user in enumerate(users):
            activity_type, duration, calories = activity_templates[index]
            Activity.objects.create(
                user=user,
                activity_type=activity_type,
                duration_minutes=duration,
                calories_burned=calories,
                performed_at=now - timedelta(days=index),
            )

            LeaderboardEntry.objects.create(
                user=user,
                points=leaderboard_points[index],
                rank=index + 1,
            )

            title, difficulty, focus_area, workout_duration = workout_templates[index]
            WorkoutSuggestion.objects.create(
                user=user,
                title=title,
                difficulty=difficulty,
                focus_area=focus_area,
                duration_minutes=workout_duration,
            )

        self.stdout.write(self.style.SUCCESS('octofit_db test data populated successfully.'))
