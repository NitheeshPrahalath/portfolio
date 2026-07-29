export default async function GitHubFeed({ username }) {
  let events = [];

  try {
    const res = await fetch(
      `https://api.github.com/users/${username}/events/public`,
      { next: { revalidate: 3600 } } // cache for 1 hour
    );
    const data = await res.json();
    events = data.slice(0, 5); // only show last 5 events
  } catch {
    return null;
  }

  if (!events.length) return null;

  const getLabel = (event) => {
    switch (event.type) {
      case 'PushEvent':
        return `Pushed to ${event.repo.name.split('/')[1]}`;
      case 'CreateEvent':
        return `Created ${event.payload.ref_type} in ${event.repo.name.split('/')[1]}`;
      case 'WatchEvent':
        return `Starred ${event.repo.name}`;
      case 'ForkEvent':
        return `Forked ${event.repo.name}`;
      case 'IssuesEvent':
        return `${event.payload.action} an issue in ${event.repo.name.split('/')[1]}`;
      case 'PullRequestEvent':
        return `${event.payload.action} a PR in ${event.repo.name.split('/')[1]}`;
      default:
        return `Activity in ${event.repo.name.split('/')[1]}`;
    }
  };

  const getTimeAgo = (dateString) => {
    const diff = Date.now() - new Date(dateString).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return 'just now';
  };

  return (
    <div>
      {events.map((event, index) => (
        <div
          key={index}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px 0',
            borderBottom: '1px solid var(--border)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: 'var(--accent)',
              flexShrink: 0,
            }} />
            <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
              {getLabel(event)}
            </span>
          </div>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)', whiteSpace: 'nowrap', marginLeft: '12px' }}>
            {getTimeAgo(event.created_at)}
          </span>
        </div>
      ))}
    </div>
  );
}