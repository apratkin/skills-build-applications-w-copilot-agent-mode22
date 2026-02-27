import { useEffect, useState } from 'react';

const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [query, setQuery] = useState('');
  const [selectedWorkout, setSelectedWorkout] = useState(null);

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

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const filteredWorkouts = workouts.filter((workout) => {
    const searchable = `${workout.title ?? ''} ${workout.focus_area ?? ''} ${workout.difficulty ?? ''}`.toLowerCase();
    return searchable.includes(query.toLowerCase());
  });

  return (
    <section className="data-section">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 mb-3">
        <h2 className="h4 mb-0">Workouts</h2>
        <a className="link-primary" href={endpoint} target="_blank" rel="noreferrer">
          View API endpoint
        </a>
      </div>

      <div className="card border-0 bg-body-tertiary">
        <div className="card-body">
          <form className="row g-2 align-items-end mb-3" onSubmit={(event) => event.preventDefault()}>
            <div className="col-md-8">
              <label className="form-label" htmlFor="workouts-filter">
                Filter workouts
              </label>
              <input
                id="workouts-filter"
                className="form-control"
                type="text"
                placeholder="Search by title, focus area, or difficulty"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
            <div className="col-md-4 d-flex gap-2">
              <button className="btn btn-primary" type="button" onClick={fetchWorkouts}>
                Refresh
              </button>
              <button className="btn btn-outline-secondary" type="button" onClick={() => setQuery('')}>
                Clear
              </button>
            </div>
          </form>

          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Focus Area</th>
                  <th scope="col">Difficulty</th>
                  <th scope="col">Duration (min)</th>
                  <th scope="col" className="text-end">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredWorkouts.length > 0 ? (
                  filteredWorkouts.map((workout) => (
                    <tr key={workout.id}>
                      <td>{workout.title || 'N/A'}</td>
                      <td>{workout.focus_area || 'N/A'}</td>
                      <td>{workout.difficulty || 'N/A'}</td>
                      <td>{workout.duration_minutes ?? 'N/A'}</td>
                      <td className="text-end">
                        <button
                          className="btn btn-sm btn-outline-primary"
                          type="button"
                          onClick={() => setSelectedWorkout(workout)}
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-secondary">
                      No workout suggestions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {selectedWorkout && (
        <>
          <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h3 className="modal-title h5 mb-0">Workout Details</h3>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={() => setSelectedWorkout(null)}
                  />
                </div>
                <div className="modal-body">
                  <p className="mb-2">
                    <strong>Title:</strong> {selectedWorkout.title || 'N/A'}
                  </p>
                  <p className="mb-2">
                    <strong>Focus Area:</strong> {selectedWorkout.focus_area || 'N/A'}
                  </p>
                  <p className="mb-2">
                    <strong>Difficulty:</strong> {selectedWorkout.difficulty || 'N/A'}
                  </p>
                  <p className="mb-0">
                    <strong>Duration:</strong> {selectedWorkout.duration_minutes ?? 'N/A'} minutes
                  </p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setSelectedWorkout(null)}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show" />
        </>
      )}
    </section>
  );
}

export default Workouts;