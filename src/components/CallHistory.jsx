const CallHistory = () => {
  const callLogs = [
    { id: 1, number: "1234567890", duration: 120, status: "completed" },
    { id: 2, number: "9876543210", duration: 60, status: "missed" },
  ];

  return (
    <div className="call-history">
      <h2>Call History</h2>
      <ul>
        {callLogs.map((log) => (
          <li key={log.id}>
            {log.number} - Duration: {log.duration}s - Status: {log.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CallHistory;
