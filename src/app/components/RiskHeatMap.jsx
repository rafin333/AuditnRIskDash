import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

const RiskHeatmap = () => {
  const [riskData, setRiskData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRisk, setSelectedRisk] = useState(null);

  const probabilities = ['Remote', 'Rare', 'Unlikely', 'Possible', 'Probable'];
  const impacts = ['Low', 'Moderate', 'High', 'Significant', 'Critical'];

  const riskLevelColors = {
    low: 'bg-emerald-200',
    medium: 'bg-amber-200',
    high: 'bg-red-300',
    critical: 'bg-red-500',
  };

  useEffect(() => {
    const fetchRiskData = async () => {
      try {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2M4MDczZGNjYmRlYzA0ODgyNDc3YmEiLCJlbWFpbCI6InJhZmluQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImFjbCI6WyJyaXNrLCBtaXRpZ2F0aW9uLCByZXBvcnQsIGxvZ2dpbmciXSwiaWF0IjoxNzQxNzYwMTY3LCJleHAiOjE3NDE4NDY1Njd9.-xL9_5dIMWsuxRhkpE3ZqfvstBqnq1DO1MBN73DQMMc';
        
        const response = await fetch('http://202.4.109.211:5050/api/risk', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch risk data');
        }
        
        const data = await response.json();
        setRiskData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRiskData();
  }, []);

  const getCellColor = (probability, impact) => {
    const probIndex = probabilities.indexOf(probability);
    const impactIndex = impacts.indexOf(impact);
    
    if (
      (probIndex <= 1 && impactIndex <= 2) || 
      (probIndex <= 2 && impactIndex <= 1) ||
      (probIndex === 0 && impactIndex <= 3)
    ) {
      return riskLevelColors.low;
    }
    
    if (
      (probIndex <= 3 && impactIndex <= 1) ||
      (probIndex <= 2 && impactIndex <= 3) ||
      (probIndex <= 0 && impactIndex === 4) ||
      (probIndex <= 1 && impactIndex === 3)
    ) {
      return riskLevelColors.medium;
    }
    
    if (
      (probIndex <= 4 && impactIndex <= 3) ||
      (probIndex <= 3 && impactIndex === 4)
    ) {
      return riskLevelColors.high;
    }
    
    return riskLevelColors.critical;
  };

  const getRisksForCell = (probability, impact) => {
    return riskData.filter(risk => 
      risk.probability === probability && risk.impact === impact
    );
  };

  const handleRiskClick = (risk) => {
    setSelectedRisk(risk);
  };

  if (loading) return <div className="p-4 text-center">Loading risk data...</div>;
  if (error) return <div className="p-4 text-center text-red-500">Error: {error}</div>;

  return (
    <div className="w-full p-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-center">Risk Heatmap</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative overflow-x-auto">
            <div className="flex">
              <div className="w-32 font-bold"></div>
              <div className="flex-1 grid grid-cols-5">
                {impacts.map(impact => (
                  <div key={impact} className="py-2 text-center font-semibold">
                    {impact}
                  </div>
                ))}
              </div>
            </div>
            
            {probabilities.slice().reverse().map(probability => (
              <div key={probability} className="flex border-t">
                <div className="w-32 flex items-center font-semibold">
                  {probability}
                </div>
                <div className="flex-1 grid grid-cols-5">
                  {impacts.map(impact => {
                    const cellRisks = getRisksForCell(probability, impact);
                    return (
                      <div 
                        key={`${probability}-${impact}`} 
                        className={`border p-2 min-h-16 ${getCellColor(probability, impact)}`}
                      >
                        {cellRisks.map(risk => (
                          <div 
                            key={risk._id}
                            className="inline-block m-1 p-1 bg-white bg-opacity-80 rounded-full w-8 h-8 text-xs text-center leading-6 cursor-pointer hover:bg-opacity-100"
                            onClick={() => handleRiskClick(risk)}
                          >
                            {risk.risk_code.replace('Risk ', '')}
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 flex items-center gap-4">

            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full border border-gray-300"></div>
              <span>Market Risk</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-gray-500"></div>
              <span>Credit Risk</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full border border-gray-300"></div>
              <span>Finantial Risk</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full border border-gray-300"></div>
              <span>Technology Risk</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full border border-gray-300"></div>
              <span>Stratigic Risk</span>
            </div>
          </div>
          
          {selectedRisk && (
            <div className="mt-6 p-4 border rounded-md bg-purple-100">
              <div className="flex justify-between">
                <h3 className="font-bold text-lg">{selectedRisk.risk_code}: {selectedRisk.risk_type}</h3>
                <button 
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setSelectedRisk(null)}
                >
                  ×
                </button>
              </div>
              <p className="mt-2">Issue: {selectedRisk.issue_details?.issue_title}</p>
              <p>Owner: {selectedRisk.owner_details?.fullname}</p>
              <p>Impact: {selectedRisk.impact}</p>
              <p>Probability: {selectedRisk.probability}</p>
              <p>Status: {selectedRisk.risk_status}</p>
              <p className="mt-2 text-sm">
                Poor governance impacts the organization&apos;s ability to set policy and make decisions that impact performance. 
                Failure to make decisions regarding important security issues leads to unreasonable levels of risk.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RiskHeatmap;