import { useEffect, useState } from 'react';

const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;

function Workouts() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        console.log('Workouts endpoint:', endpoint);
        const response = await fetch(endpoint);
        const data = await response.json();
        console.log('Workouts fetched data:', data);

        const parsedWorkouts = Array.isArray(data)
          ? data
          : Array.isArray(data?.results)
            ? data.results
            : [];

        setWorkouts(parsedWorkouts);
      } catch (error) {
        console.error('Error fetching workouts:', error);
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <section>
      <h2>Workouts</h2>
      {workouts.length === 0 ? (
        <p>No workout suggestions found.</p>
      ) : (
        <ul className="list-group">
          {workouts.map((workout) => (
            <li className="list-group-item" key={workout.id}>
              <strong>{workout.title}</strong> — {workout.difficulty}, {workout.focus_area}, {workout.duration_minutes} min
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Workouts;