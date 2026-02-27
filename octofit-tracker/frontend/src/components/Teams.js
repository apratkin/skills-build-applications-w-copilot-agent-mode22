import { useEffect, useState } from 'react';

const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;

function Teams() {
  const [teams, setTeams] = useState([]);
  const [query, setQuery] = useState('');
  const [selectedTeam, setSelectedTeam] = useState(null);

  const fetchTeams = async () => {
    try {
      console.log('Teams endpoint:', endpoint);
      const response = await fetch(endpoint);
      const data = await response.json();
      console.log('Teams fetched data:', data);

      const parsedTeams = Array.isArray(data)
        ? data
        : Array.isArray(data?.results)
          ? data.results
          : [];

      setTeams(parsedTeams);
    } catch (error) {
      console.error('Error fetching teams:', error);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const filteredTeams = teams.filter((team) => {
    const searchable = `${team.name ?? ''} ${team.city ?? ''}`.toLowerCase();
    return searchable.includes(query.toLowerCase());
  });

  return (
    <section className="data-section">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 mb-3">
        <h2 className="h4 mb-0">Teams</h2>
        <a className="link-primary" href={endpoint} target="_blank" rel="noreferrer">
          View API endpoint
        </a>
      </div>

      <div className="card border-0 bg-body-tertiary">
        <div className="card-body">
          <form className="row g-2 align-items-end mb-3" onSubmit={(event) => event.preventDefault()}>
            <div className="col-md-8">
              <label className="form-label" htmlFor="teams-filter">
                Filter teams
              </label>
              <input
                id="teams-filter"
                className="form-control"
                type="text"
                placeholder="Search by team name or city"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
            <div className="col-md-4 d-flex gap-2">
              <button className="btn btn-primary" type="button" onClick={fetchTeams}>
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
                  <th scope="col">Team Name</th>
                  <th scope="col">City</th>
                  <th scope="col" className="text-end">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredTeams.length > 0 ? (
                  filteredTeams.map((team) => (
                    <tr key={team.id}>
                      <td>{team.name || 'N/A'}</td>
                      <td>{team.city || 'N/A'}</td>
                      <td className="text-end">
                        <button className="btn btn-sm btn-outline-primary" type="button" onClick={() => setSelectedTeam(team)}>
                          Details
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center py-4 text-secondary">
                      No teams found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {selectedTeam && (
        <>
          <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h3 className="modal-title h5 mb-0">Team Details</h3>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={() => setSelectedTeam(null)}
                  />
                </div>
                <div className="modal-body">
                  <p className="mb-2">
                    <strong>Name:</strong> {selectedTeam.name || 'N/A'}
                  </p>
                  <p className="mb-0">
                    <strong>City:</strong> {selectedTeam.city || 'N/A'}
                  </p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setSelectedTeam(null)}>
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

export default Teams;