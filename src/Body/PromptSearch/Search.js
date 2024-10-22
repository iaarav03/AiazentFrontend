import React, { useState } from 'react';
import axios from 'axios';

const SearchComponent = () => {
  const [query, setQuery] = useState(''); // Store user's input
  const [results, setResults] = useState([]); // Store search results
  const [loading, setLoading] = useState(false); // Show loading indicator while fetching
  const [showMoreCount, setShowMoreCount] = useState(10); // Control the number of results shown
  const [initial,setInitial]=useState(true);
  const [useCases, setUseCases] = useState([
    'Education helping tools',
    'Summarize documents',
    'Analyze videos',
    'Customer support automation',
    'AI for marketing strategies'
  ]); // Popular use cases

  // Handle search submission
  const handleSearch = async (searchQuery) => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/agents/search', {
        params: { query: searchQuery || query }, // Use the query or provided searchQuery
      });
      setResults(response.data);
    } catch (error) {
      console.error('Error fetching search results', error);
    }
    setLoading(false);
  };

  // Handle popular use case click
  const handleUseCaseClick = (useCase) => {
    setInitial(false);
    
    setQuery(useCase);
    handleSearch(useCase); // Trigger search based on use case
  };

  // Show more agents when the button is clicked
  const handleShowMore = () => {
    setShowMoreCount(showMoreCount + 10); // Show 10 more agents each time
  };

  return (
    <div className="w-full flex flex-col items-center justify-center py-10 bg-gray-50">
      <h1 className="text-4xl font-bold text-primaryBlue mb-8">Find the Perfect AI Agent</h1>

      {/* Search Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
        className="flex w-2/3 bg-white shadow-md rounded-full p-2 border border-gray-300"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter your use case, e.g. 'AI Assistant for customer support'"
          className="flex-grow p-3 rounded-l-full focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
        <button
          type="submit"
          className="bg-buttonbg text-white rounded-full px-6 py-3 hover:scale-95 transition duration-200"
        >
          Generate Recommendations
        </button>
      </form>

      {/* Popular Use Cases */}
      <div className="w-full max-w-4xl mt-8">
        <h2 className="text-lg font-semibold mb-4">Try popular use cases:</h2>
        <div className="flex flex-wrap gap-4">
          {useCases.map((useCase, index) => (
            <button
              key={index}
              onClick={() => handleUseCaseClick(useCase)}
              className="bg-gray-200 text-gray-600 px-4 py-2 rounded-full hover:bg-blue-100 transition duration-200"
            >
              {useCase}
            </button>
          ))}
        </div>
      </div>

      {/* Loading Spinner */}
      {loading && <div className="text-center mt-4">Loading...</div>}

      {/* Displaying Results */}
      <div className="w-full max-w-4xl mt-10">
        {results.length > 0  ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {results.slice(0, showMoreCount).map((agent) => (
              <div key={agent._id} className="bg-white p-6 rounded-lg shadow-lg flex flex-col space-y-4 items-start">
                <div className="flex items-center space-x-4">
                  <img
                    src={agent.logo || 'https://via.placeholder.com/80'}
                    alt={agent.name}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                  <div>
                    <h2 className="text-xl font-bold text-primaryBlue">{agent.name}</h2>
                    <p className="text-gray-600 line-clamp-2">{agent.shortDescription}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {agent.tags.map((tag, index) => (
                    <span key={index} className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
            initial===true?(<div></div>):(<div className="text-center mt-8 text-gray-500">No results found. Try a different query!</div>)
          
        )}
      </div>

      {/* Show More Button */}
      {results.length > showMoreCount && (
        <div className="flex justify-center w-full mt-6">
          <button
            onClick={handleShowMore}
            className="bg-primaryBlue text-white px-6 py-3 rounded-full hover:bg-blue-600 hover:scale-105 transition duration-200"
          >
            Show More Agents
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
