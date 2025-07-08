// src/pages/TemporaryContentPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../../Components/routes/route'; // Adjust the path to your routes file

const TemporaryContentPage = () => {
  return (
    <div
      style={{
        fontFamily: "'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
       
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column', // Align children vertically
        justifyContent: 'flex-start', // Start content from the top
        alignItems: 'center',
        padding: '20px',
        boxSizing: 'border-box',
      }}
    >
  

      {/* Main Content Box - THIS IS WHERE THE MISSING STYLES WERE! */}
      <div
        style={{
        
          color: '#f8f9fa', // Light text color for dark background
        }}
      >
        <h1
          style={{
            color: '#f8f9fa', // Light color for heading
            fontSize: '2.5em',
            marginBottom: '15px',
            fontWeight: '600',
          }}
        >
          <span role="img" aria-label="Flask" style={{ marginRight: '10px' }}>🧪</span>
          Welcome to Our Testing Environment
        </h1>

        <p
          style={{
            fontSize: '1.1em',
            lineHeight: '1.6',
            color: '#adb5bd', // Slightly darker light color for paragraphs
            marginBottom: '25px',
          }}
        >
          Thank you for exploring our application in its **testing phase**. This version is
          actively under development, and we appreciate your help in identifying any issues.
        </p>

        <ul
          style={{
            listStyle: 'none',
            padding: '0',
            marginBottom: '30px',
            textAlign: 'left',
            maxWidth: '500px',
            margin: '0 auto 30px auto',
            color: '#f8f9fa', // Your existing white color for list items
          }}
        >
          <li style={{ marginBottom: '10px', fontSize: '0.95em' }}>
            <span role="img" aria-label="Warning" style={{ marginRight: '8px' }}>⚠️</span>
            **Temporary Data:** Any data you create or modify here might be reset at any time. Please do not use real sensitive information.
          </li>
          <li style={{ marginBottom: '10px', fontSize: '0.95em' }}>
            <span role="img" aria-label="Bug" style={{ marginRight: '8px' }}>🐞</span>
            **Potential Bugs:** You may encounter unexpected behavior, errors, or incomplete features.
          </li>
          <li style={{ fontSize: '0.95em' }}>
            <span role="img" aria-label="Tools" style={{ marginRight: '8px' }}>🛠️</span>
            **Features Under Development:** Some functionalities may not work as expected or might be missing entirely.
          </li>
        </ul>

        <p
          style={{
            fontSize: '1.1em',
            lineHeight: '1.6',
           
            marginBottom: '30px',
          }}
        >
          Your feedback is extremely valuable! If you discover any bugs or have suggestions,
          please report them to our development team.
        </p>

        <Link
          to={routes.home}
          style={{
            display: 'inline-block',
            padding: '12px 25px',
            backgroundColor: '#e4063b', // Your specified button color
            color: 'white',
            textDecoration: 'none',
            borderRadius: '5px',
            fontSize: '1.05em',
            fontWeight: 'bold',
            transition: 'background-color 0.3s ease, transform 0.2s ease',
            cursor: 'pointer',
            border: 'none',
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#c20430')} // Darker red on hover
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#e4063b')} // Back to original on mouse out
        >
          Back to Main Application
        </Link>
      </div>
    </div>
  );
};

export default TemporaryContentPage;