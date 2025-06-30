import React, { useState, useEffect } from 'react';
import { RefreshCw, Trophy, Clock, CheckCircle, Play, Calendar } from 'lucide-react';

const CricketInformer = () => {
  const [liveMatches, setLiveMatches] = useState([]);
  const [allMatches, setAllMatches] = useState([]);
  const [pointsTable, setPointsTable] = useState([]);
  const [activeTab, setActiveTab] = useState('live');
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  const API_BASE_URL = 'http://localhost:8080/match';

  // Fetch live matches
  const fetchLiveMatches = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/live`);
      const data = await response.json();
      setLiveMatches(data);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (error) {
      console.error('Error fetching live matches:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all matches
  const fetchAllMatches = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}`);
      const data = await response.json();
      setAllMatches(data);
    } catch (error) {
      console.error('Error fetching all matches:', error);
    }
  };

  // Fetch points table
  const fetchPointsTable = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/point-table`);
      const data = await response.json();
      setPointsTable(data);
    } catch (error) {
      console.error('Error fetching points table:', error);
    }
  };

  // Initial load
  useEffect(() => {
    fetchLiveMatches();
    fetchAllMatches();
    fetchPointsTable();
  }, []);

  // Auto-refresh live matches every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (activeTab === 'live') {
        fetchLiveMatches();
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [activeTab]);

  // Filter completed matches
  const completedMatches = allMatches.filter(match => match.status === 'COMPLETE');

  const MatchCard = ({ match, isLive = false }) => (
    <div className={`bg-white rounded-lg shadow-sm p-4 mb-3 border-l-4 ${isLive ? 'border-green-500' : 'border-gray-400'}`}>
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="text-base font-bold text-gray-800 mb-1">{match.teamHeading}</h3>
          <p className="text-xs text-gray-600 mb-2">{match.matchNumberVenue}</p>
        </div>
        <div className="flex items-center">
          {isLive ? (
            <div className="flex items-center text-green-600">
              <Play className="w-3 h-3 mr-1" />
              <span className="text-xs font-medium">LIVE</span>
            </div>
          ) : (
            <div className="flex items-center text-gray-600">
              <CheckCircle className="w-3 h-3 mr-1" />
              <span className="text-xs font-medium">COMPLETED</span>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        {/* Batting Team */}
        <div className="bg-blue-50 p-3 rounded">
          <h4 className="text-xs font-medium text-blue-800 mb-1">Batting</h4>
          <p className="text-sm font-bold text-blue-900">{match.battingTeam}</p>
          <p className="text-lg font-bold text-blue-700">{match.battingTeamScore}</p>
        </div>

        {/* Bowling Team */}
        <div className="bg-red-50 p-3 rounded">
          <h4 className="text-xs font-medium text-red-800 mb-1">Bowling</h4>
          <p className="text-sm font-bold text-red-900">{match.bowlTeam}</p>
          <p className="text-lg font-bold text-red-700">{match.bowlTeamScore}</p>
        </div>
      </div>

      {/* Match Status */}
      {match.liveText && (
        <div className="bg-green-100 p-2 rounded mb-3">
          <p className="text-green-800 text-sm font-medium">{match.liveText}</p>
        </div>
      )}

      {match.textComplete && (
        <div className="bg-gray-100 p-2 rounded mb-3">
          <p className="text-gray-800 text-sm font-medium">{match.textComplete}</p>
        </div>
      )}

      {/* Match Link */}
      {match.matchLink && (
        <a
          href={`https://www.cricbuzz.com${match.matchLink}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 text-white px-3 py-1 text-sm rounded hover:bg-blue-700 transition-colors"
        >
          View Details
        </a>
      )}
    </div>
  );

  const PointsTableComponent = () => {
    console.log('Points table data:', pointsTable); // Debug log
    
    if (pointsTable.length === 0) {
      return (
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center">
            <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No points table data available</p>
            <button
              onClick={fetchPointsTable}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Refresh Points Table
            </button>
          </div>
        </div>
      );
    }

    const headers = pointsTable[0];
    const rows = pointsTable.slice(1);

    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold flex items-center">
              <Trophy className="w-6 h-6 mr-2" />
              Points Table
            </h2>
            <button
              onClick={fetchPointsTable}
              className="px-3 py-1 bg-white/20 text-white rounded hover:bg-white/30 text-sm"
            >
              Refresh
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {headers && headers.map((header, index) => (
                  <th key={index} className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {rows && rows.map((row, rowIndex) => (
                <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                      {cellIndex === 0 ? (
                        <span className="font-medium">{cell}</span>
                      ) : (
                        cell
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h1 className="ml-3 text-3xl font-bold text-gray-900">Cricket Informer</h1>
            </div>
            {lastUpdated && (
              <div className="text-sm text-gray-600">
                Last updated: {lastUpdated}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('live')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'live'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <Play className="w-4 h-4 mr-2" />
                Live Matches
              </div>
            </button>
            <button
              onClick={() => setActiveTab('points')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'points'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <Trophy className="w-4 h-4 mr-2" />
                Points Table
              </div>
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'completed'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                Completed Matches
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'live' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Live Matches</h2>
              <button
                onClick={fetchLiveMatches}
                disabled={loading}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>

            {loading && liveMatches.length === 0 ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading live matches...</p>
              </div>
            ) : liveMatches.length === 0 ? (
              <div className="text-center py-8">
                <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No live matches at the moment</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {liveMatches.map((match, index) => (
                  <MatchCard key={index} match={match} isLive={true} />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'points' && <PointsTableComponent />}

        {activeTab === 'completed' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Completed Matches</h2>
            {completedMatches.length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No completed matches found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {completedMatches.map((match, index) => (
                  <MatchCard key={index} match={match} isLive={false} />
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default CricketInformer;