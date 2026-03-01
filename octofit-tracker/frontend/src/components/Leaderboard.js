import { useEffect, useState } from 'react';

const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [query, setQuery] = useState('');
  const [selectedEntry, setSelectedEntry] = useState(null);

  const fetchLeaderboard = async () => {
    try {
      console.log('Leaderboard endpoint:', endpoint);
      const response = await fetch(endpoint);
      const data = await response.json();
      console.log('Leaderboard fetched data:', data);

      const parsedEntries = Array.isArray(data)
        ? data
        : Array.isArray(data?.results)
          ? data.results
          : [];

      setEntries(parsedEntries);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const filteredEntries = entries.filter((entry) => {
    const searchable = `${entry.rank ?? ''} ${entry.user ?? ''} ${entry.points ?? ''}`.toLowerCase();
    return searchable.includes(query.toLowerCase());
  });

  return (
    <section className="data-section">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 mb-3">
        <h2 className="h4 mb-0">Leaderboard</h2>
        <a className="link-primary" href={endpoint} target="_blank" rel="noreferrer">
          View API endpoint
        </a>
      </div>

      <div className="card border-0 bg-body-tertiary">
        <div className="card-body">
          <form className="row g-2 align-items-end mb-3" onSubmit={(event) => event.preventDefault()}>
            <div className="col-md-8">
              <label className="form-label" htmlFor="leaderboard-filter">
                Filter leaderboard
              </label>
              <input
                id="leaderboard-filter"
                className="form-control"
                type="text"
                placeholder="Search by rank, user ID, or points"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
            <div className="col-md-4 d-flex gap-2">
              <button className="btn btn-primary" type="button" onClick={fetchLeaderboard}>
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
                  <th scope="col">Rank</th>
                  <th scope="col">User ID</th>
                  <th scope="col">Points</th>
                  <th scope="col" className="text-end">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredEntries.length > 0 ? (
                  filteredEntries.map((entry) => (
                    <tr key={entry.id}>
                      <td>{entry.rank ?? 'N/A'}</td>
                      <td>{entry.user ?? 'N/A'}</td>
                      <td>{entry.points ?? 'N/A'}</td>
                      <td className="text-end">
                        <button className="btn btn-sm btn-outline-primary" type="button" onClick={() => setSelectedEntry(entry)}>
                          Details
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-4 text-secondary">
                      No leaderboard entries found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {selectedEntry && (
        <>
          <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h3 className="modal-title h5 mb-0">Leaderboard Entry</h3>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={() => setSelectedEntry(null)}
                  />
                </div>
                <div className="modal-body">
                  <p className="mb-2">
                    <strong>Rank:</strong> {selectedEntry.rank ?? 'N/A'}
                  </p>
                  <p className="mb-2">
                    <strong>User ID:</strong> {selectedEntry.user ?? 'N/A'}
                  </p>
                  <p className="mb-0">
                    <strong>Points:</strong> {selectedEntry.points ?? 'N/A'}
                  </p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setSelectedEntry(null)}>
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

export default Leaderboard;