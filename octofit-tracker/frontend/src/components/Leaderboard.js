import { useEffect, useState } from 'react';

const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;

function Leaderboard() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
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

    fetchLeaderboard();
  }, []);

  return (
    <section>
      <h2>Leaderboard</h2>
      {entries.length === 0 ? (
        <p>No leaderboard entries found.</p>
      ) : (
        <ul className="list-group">
          {entries.map((entry) => (
            <li className="list-group-item" key={entry.id}>
              Rank {entry.rank} — {entry.points} points (User ID: {entry.user})
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Leaderboard;