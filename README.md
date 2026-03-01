# Build Applications with GitHub Copilot Agent Mode

<img src="https://octodex.github.com/images/Professortocat_v2.png" align="right" height="200px" />

Hey apratkin!

Mona here. I'm done preparing your exercise. Hope you enjoy! 💚

Remember, it's self-paced so feel free to take a break! ☕️

[![](https://img.shields.io/badge/Go%20to%20Exercise-%E2%86%92-1f883d?style=for-the-badge&logo=github&labelColor=197935)](https://github.com/apratkin/skills-build-applications-w-copilot-agent-mode22/issues/1)

---

## OctoFit DB setup and verification

Use the existing virtual environment and run commands from the repository root:

```bash
ps aux | grep mongod
source octofit-tracker/backend/venv/bin/activate
pip install -r octofit-tracker/backend/requirements.txt
/workspaces/skills-build-applications-w-copilot-agent-mode22/octofit-tracker/backend/venv/bin/python /workspaces/skills-build-applications-w-copilot-agent-mode22/octofit-tracker/backend/manage.py makemigrations octofit_tracker
/workspaces/skills-build-applications-w-copilot-agent-mode22/octofit-tracker/backend/venv/bin/python /workspaces/skills-build-applications-w-copilot-agent-mode22/octofit-tracker/backend/manage.py migrate
/workspaces/skills-build-applications-w-copilot-agent-mode22/octofit-tracker/backend/venv/bin/python /workspaces/skills-build-applications-w-copilot-agent-mode22/octofit-tracker/backend/manage.py populate_db
```

Create/verify unique email index and inspect sample data:

```bash
mongosh --quiet --eval 'db = db.getSiblingDB("octofit_db"); printjson(db.users.createIndex({ email: 1 }, { unique: true })); printjson(db.getCollectionNames()); printjson(db.users.find().limit(2).toArray()); printjson(db.teams.find().limit(2).toArray()); printjson(db.activities.find().limit(2).toArray()); printjson(db.leaderboard.find().limit(2).toArray()); printjson(db.workouts.find().limit(2).toArray());'
```

Quick API check:

```bash
source octofit-tracker/backend/venv/bin/activate
/workspaces/skills-build-applications-w-copilot-agent-mode22/octofit-tracker/backend/venv/bin/python /workspaces/skills-build-applications-w-copilot-agent-mode22/octofit-tracker/backend/manage.py runserver 0.0.0.0:8000
```

In another terminal:

```bash
curl -sS http://127.0.0.1:8000/api/
curl -sS http://127.0.0.1:8000/api/users/
curl -sS http://127.0.0.1:8000/api/teams/
curl -sS http://127.0.0.1:8000/api/activities/
curl -sS http://127.0.0.1:8000/api/leaderboard/
curl -sS http://127.0.0.1:8000/api/workouts/
```

&copy; 2025 GitHub &bull; [Code of Conduct](https://www.contributor-covenant.org/version/2/1/code_of_conduct/code_of_conduct.md) &bull; [MIT License](https://gh.io/mit)

