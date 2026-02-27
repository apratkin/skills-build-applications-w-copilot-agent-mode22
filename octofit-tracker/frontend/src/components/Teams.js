import { useEffect, useState } from 'react';

const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;

function Teams() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
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

    fetchTeams();
  }, []);

  return (
    <section>
      <h2>Teams</h2>
      {teams.length === 0 ? (
        <p>No teams found.</p>
      ) : (
        <ul className="list-group">
          {teams.map((team) => (
            <li className="list-group-item" key={team.id}>
              <strong>{team.name}</strong>
              {team.city ? ` — ${team.city}` : ''}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Teams;