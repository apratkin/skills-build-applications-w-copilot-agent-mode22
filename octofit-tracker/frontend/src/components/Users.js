import { useEffect, useState } from 'react';

const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;

function Users() {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    try {
      console.log('Users endpoint:', endpoint);
      const response = await fetch(endpoint);
      const data = await response.json();
      console.log('Users fetched data:', data);

      const parsedUsers = Array.isArray(data)
        ? data
        : Array.isArray(data?.results)
          ? data.results
          : [];

      setUsers(parsedUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    const searchable = `${user.name ?? ''} ${user.email ?? ''}`.toLowerCase();
    return searchable.includes(query.toLowerCase());
  });

  return (
    <section className="data-section">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 mb-3">
        <h2 className="h4 mb-0">Users</h2>
        <a className="link-primary" href={endpoint} target="_blank" rel="noreferrer">
          View API endpoint
        </a>
      </div>

      <div className="card border-0 bg-body-tertiary">
        <div className="card-body">
          <form className="row g-2 align-items-end mb-3" onSubmit={(event) => event.preventDefault()}>
            <div className="col-md-8">
              <label className="form-label" htmlFor="users-filter">
                Filter users
              </label>
              <input
                id="users-filter"
                className="form-control"
                type="text"
                placeholder="Search by name or email"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
            <div className="col-md-4 d-flex gap-2">
              <button className="btn btn-primary" type="button" onClick={fetchUsers}>
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
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col" className="text-end">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td>{user.name || 'N/A'}</td>
                      <td>{user.email || 'N/A'}</td>
                      <td className="text-end">
                        <button className="btn btn-sm btn-outline-primary" type="button" onClick={() => setSelectedUser(user)}>
                          Details
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center py-4 text-secondary">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {selectedUser && (
        <>
          <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h3 className="modal-title h5 mb-0">User Details</h3>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={() => setSelectedUser(null)}
                  />
                </div>
                <div className="modal-body">
                  <p className="mb-2">
                    <strong>Name:</strong> {selectedUser.name || 'N/A'}
                  </p>
                  <p className="mb-0">
                    <strong>Email:</strong> {selectedUser.email || 'N/A'}
                  </p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setSelectedUser(null)}>
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

export default Users;