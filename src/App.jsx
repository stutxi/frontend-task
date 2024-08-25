import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import './App.css'; 

const App = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async () => {
    try {
      const parsedData = JSON.parse(jsonInput);
      
      const res = await axios.post('https://backend-task-bajaj.vercel.app/bfhl', parsedData);
      setResponse(res.data);
      setError(null);
    } catch (err) {
      setError('Invalid JSON or Request Error');
    }
  };

  const handleSelectChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
  };

  const renderResponse = () => {
    if (!response) return null;
    
    const options = selectedOptions.map(option => option.value);
    let dataToRender = {};

    if (options.includes('Numbers')) {
      dataToRender.numbers = response.numbers;
    }
    if (options.includes('Alphabets')) {
      dataToRender.alphabets = response.alphabets;
    }
    if (options.includes('Highest lowercase alphabet')) {
      dataToRender.highest_lowercase_alphabet = response.highest_lowercase_alphabet;
    }

    return (
      <div className="filtered-response">
        {options.includes('Numbers') && dataToRender.numbers && (
          <div>
            <strong>Filtered Response Number:</strong> {dataToRender.numbers.join(', ')}
          </div>
        )}
        {options.includes('Alphabets') && dataToRender.alphabets && (
          <div>
            <strong>Filtered Response Alphabets:</strong> {dataToRender.alphabets.join(', ')}
          </div>
        )}
        {options.includes('Highest lowercase alphabet') && dataToRender.highest_lowercase_alphabet && (
          <div>
            <strong>Filtered Response Highest Lowercase Alphabet:</strong> {dataToRender.highest_lowercase_alphabet.join(', ')}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="container">
      <h1>Frontend Task</h1>
      <textarea
        rows="10"
        cols="50"
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder='Enter JSON here, e.g., { "data": ["A", "C", "z"] }'
      />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p className="error">{error}</p>}
      {response && (
        <div>
          <Select
            isMulti
            options={[
              { value: 'Alphabets', label: 'Alphabets' },
              { value: 'Numbers', label: 'Numbers' },
              { value: 'Highest lowercase alphabet', label: 'Highest lowercase alphabet' },
            ]}
            onChange={handleSelectChange}
            className="select-dropdown"
            placeholder="Select filters"
          />
          <div className="response-container">
            {renderResponse()}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
