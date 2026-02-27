import { useEffect, useState } from 'react';

const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;

function Activities() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        console.log('Activities endpoint:', endpoint);
        const response = await fetch(endpoint);
        const data = await response.json();
        console.log('Activities fetched data:', data);

        const parsedActivities = Array.isArray(data)
          ? data
          : Array.isArray(data?.results)
            ? data.results
            : [];

        setActivities(parsedActivities);
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };

    fetchActivities();
  }, []);

  return (
    <section>
      <h2>Activities</h2>
      {activities.length === 0 ? (
        <p>No activities found.</p>
      ) : (
        <ul className="list-group">
          {activities.map((activity) => (
            <li className="list-group-item" key={activity.id}>
              <strong>{activity.activity_type}</strong> — {activity.duration_minutes} min, {activity.calories_burned} cal
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Activities;