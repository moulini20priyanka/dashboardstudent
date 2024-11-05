import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './Dashboard';
import './index.css';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Ensure FontAwesome is imported

const App = () => {
    return (
        <div>
            <Dashboard />
        </div>
    );
};

export default App;

// Render the App
ReactDOM.render(<App />, document.getElementById('root'));
