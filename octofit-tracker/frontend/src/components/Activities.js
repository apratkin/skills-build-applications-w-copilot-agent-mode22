import { useEffect, useState } from 'react';

const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;

function Activities() {
  const [activities, setActivities] = useState([]);
  const [query, setQuery] = useState('');
  const [selectedActivity, setSelectedActivity] = useState(null);

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

  useEffect(() => {
    fetchActivities();
  }, []);

  const filteredActivities = activities.filter((activity) => {
    const searchable = `${activity.activity_type ?? ''}`.toLowerCase();
    return searchable.includes(query.toLowerCase());
  });

  return (
    <section className="data-section">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 mb-3">
        <h2 className="h4 mb-0">Activities</h2>
        <a className="link-primary" href={endpoint} target="_blank" rel="noreferrer">
          View API endpoint
        </a>
      </div>

      <div className="card border-0 bg-body-tertiary">
        <div className="card-body">
          <form className="row g-2 align-items-end mb-3" onSubmit={(event) => event.preventDefault()}>
            <div className="col-md-8">
              <label className="form-label" htmlFor="activities-filter">
                Filter activities
              </label>
              <input
                id="activities-filter"
                className="form-control"
                type="text"
                placeholder="Search by activity type"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
            <div className="col-md-4 d-flex gap-2">
              <button className="btn btn-primary" type="button" onClick={fetchActivities}>
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
                  <th scope="col">Activity Type</th>
                  <th scope="col">Duration (min)</th>
                  <th scope="col">Calories</th>
                  <th scope="col" className="text-end">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredActivities.length > 0 ? (
                  filteredActivities.map((activity) => (
                    <tr key={activity.id}>
                      <td>{activity.activity_type || 'N/A'}</td>
                      <td>{activity.duration_minutes ?? 'N/A'}</td>
                      <td>{activity.calories_burned ?? 'N/A'}</td>
                      <td className="text-end">
                        <button
                          className="btn btn-sm btn-outline-primary"
                          type="button"
                          onClick={() => setSelectedActivity(activity)}
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-4 text-secondary">
                      No activities found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {selectedActivity && (
        <>
          <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h3 className="modal-title h5 mb-0">Activity Details</h3>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={() => setSelectedActivity(null)}
                  />
                </div>
                <div className="modal-body">
                  <p className="mb-2">
                    <strong>Type:</strong> {selectedActivity.activity_type || 'N/A'}
                  </p>
                  <p className="mb-2">
                    <strong>Duration:</strong> {selectedActivity.duration_minutes ?? 'N/A'} minutes
                  </p>
                  <p className="mb-0">
                    <strong>Calories:</strong> {selectedActivity.calories_burned ?? 'N/A'}
                  </p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setSelectedActivity(null)}>
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

export default Activities;