import React from 'react';
import * as Sentry from '@sentry/react';

const SentryDebug: React.FC = () => {
  const throwError = () => {
    throw new Error('Sentry Frontend Test Error - This is intentional!');
  };

  const sendTestMessage = () => {
    console.log('Sending test message to Sentry...');
    Sentry.captureMessage('Test message from SentryDebug page');
    alert('Test message sent! Check Sentry dashboard.');
  };

  const sendTestException = () => {
    console.log('Sending test exception to Sentry...');
    Sentry.captureException(new Error('Manual test error from button'));
    alert('Test exception sent! Check Sentry dashboard.');
  };

  return (
    <div style={{ padding: '40px' }}>
      <h1>Sentry Debug Page</h1>
      <p>Test different ways to send errors to Sentry:</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px', marginTop: '20px' }}>
        <button
          onClick={throwError}
          style={{ padding: '12px', fontSize: '16px', cursor: 'pointer' }}
        >
          Throw Error (will crash component)
        </button>

        <button
          onClick={sendTestMessage}
          style={{ padding: '12px', fontSize: '16px', cursor: 'pointer', background: '#2196F3', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          Send Test Message
        </button>

        <button
          onClick={sendTestException}
          style={{ padding: '12px', fontSize: '16px', cursor: 'pointer', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          Send Test Exception
        </button>
      </div>

      <div style={{ marginTop: '30px', padding: '20px', background: '#f5f5f5', borderRadius: '4px' }}>
        <h3>Check:</h3>
        <ol>
          <li>Open browser console (F12)</li>
          <li>Click one of the buttons above</li>
          <li>Check for console logs</li>
          <li>Check Network tab for requests to sentry.io</li>
          <li>Check your Sentry dashboard</li>
        </ol>
      </div>
    </div>
  );
};

export default SentryDebug;
