import { useState, useEffect } from 'react';
import { apiService } from '../services/api';

function ExampleComponent() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const testConnection = async () => {
      try {
        const response = await apiService.test();
        setMessage(response.message);
      } catch (err) {
        setError(err.message);
      }
    };

    testConnection();
  }, []);

  return (
    <div>
      {message && <p>Message from backend: {message}</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
}

export default ExampleComponent; 