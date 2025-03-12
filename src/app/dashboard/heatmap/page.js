"use client"
import React, { useState, useEffect } from 'react';

import { AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

const RiskHeatmap = () => {
  const [risks, setRisks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mapping functions to standardize API data to matrix format
  const mapProbability = (probability) => {
    const probabilityMap = {
      "very risky": "High",
      "risky": "High Medium",
      "moderate": "Medium",
      "low risk": "Low Medium",
      "very low risk": "Low"
    };
    return probabilityMap[probability.toLowerCase()] || "Medium";
  };

  const mapImpact = (impact) => {
    const impactMap = {
      "very high": "High",
      "high": "Next 2 years",
      "moderate": "Next 3 years",
      "low": "Next 4 years",
      "very low": "Next 5 years",
      "minimal": "Less than 10 years"
    };
    return impactMap[impact.toLowerCase()] || "Next 3 years";
  };

  useEffect(() => {
    const fetchRisks = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://202.4.109.211:5050/api/risk', {
          headers: {
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2M4MDczZGNjYmRlYzA0ODgyNDc3YmEiLCJlbWFpbCI6InJhZmluQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImFjbCI6WyJyaXNrLCBtaXRpZ2F0aW9uLCByZXBvcnQsIGxvZ2dpbmciXSwiaWF0IjoxNzQxNzYwMTY3LCJleHAiOjE3NDE4NDY1Njd9.-xL9_5dIMWsuxRhkpE3ZqfvstBqnq1DO1MBN73DQMMc`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch risks');
        }

        const data = await response.json();
        setRisks(data);
      } catch (err) {
        console.error("Error fetching risk data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRisks();
  }, []);

  // Define matrix dimensions
  const impactLabels = ["High", "Next 2 years", "Next 3 years", "Next 4 years", "Next 5 years", "Less than 10 years"];
  const probabilityLabels = ["Low", "Low Medium", "Medium", "High Medium", "High"];

  // Define cell colors based on risk level
  const getCellColor = (impact, probability) => {
    // High risk (red)
    if (
      (impact === "High" && probability === "High") ||
      (impact === "High" && probability === "High Medium") ||
      (impact === "High" && probability === "Medium") ||
      (impact === "Next 2 years" && probability === "High Medium") ||
      (impact === "Next 2 years" && probability === "High") ||
      (impact === "Next 3 years" && probability === "High") ||
      (impact === "Next 4 years" && probability === "High") ||
      (impact === "Next 4 years" && probability === "High Medium") ||
      (impact === "Next 5 years" && probability === "High") ||
      (impact === "Next 5 years" && probability === "High Medium")
    ) {
      return "bg-red-600 text-white";
    }

    // Medium-high risk (orange)
    if (
      (impact === "Next 3 years" && probability === "High Medium") ||
      (impact === "Next 5 years" && probability === "Medium")
    ) {
      return "bg-orange-500";
    }

    // Medium risk (yellow)
    if (
      (impact === "High" && probability === "Low Medium") ||
      (impact === "Next 2 years" && probability === "Medium") ||
      (impact === "Next 2 years" && probability === "Low Medium") ||
      (impact === "Next 3 years" && probability === "Medium") ||
      (impact === "Next 4 years" && probability === "Medium") ||
      (impact === "Next 5 years" && probability === "Low Medium")
    ) {
      return "bg-yellow-300";
    }

    // Low-medium risk (light green)
    if (
      (impact === "Next 3 years" && probability === "Low Medium") ||
      (impact === "Next 4 years" && probability === "Low Medium") ||
      (impact === "Next 5 years" && probability === "Low")
    ) {
      return "bg-green-400";
    }

    // Low risk (green)
    return "bg-green-500 text-white";
  };

  // Get risks for a specific cell
  const getRisksForCell = (impact, probability) => {
    return risks
      .filter(risk => {
        const mappedImpact = mapImpact(risk.impact);
        const mappedProbability = mapProbability(risk.probability);
        return mappedImpact === impact && mappedProbability === probability;
      })
      .map(risk => risk.risk_code);
  };

  // Get label for cell
  const getCellLabel = (impact, probability) => {
    if (impact === "Next 3 years") {
      if (probability === "Low") return "Monitor";
      if (probability === "Medium") return "Manage";
      if (probability === "High Medium") return "Mitigate";
    }
    if (impact === "Next 5 years") {
      if (probability === "Low") return "Monitor";
      if (probability === "Medium") return "Manage";
      if (probability === "High Medium") return "Mitigate";
    }
    return null;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Audit Risk Heatmap</CardTitle>
      </CardHeader>
      <CardContent>
        {loading && <div className="p-4 text-center">Loading risk data...</div>}

        {error && (
          <div className="p-4 flex items-center gap-2 text-red-500 border border-red-300 rounded bg-red-50 mb-4">
            <AlertCircle size={20} />
            <span>Error loading data: {error}</span>
          </div>
        )}

        {!loading && !error && (
          <>
            {risks.length === 0 ? (
              <div className="p-4 text-center">No risk data available</div>
            ) : (
              <div className="overflow-auto">
                <table className="w-full border-collapse border">
                  <thead>
                    <tr>
                      <th className="border p-2 bg-gray-200"></th>
                      {probabilityLabels.map(label => (
                        <th key={label} className="border p-2 bg-gray-200 text-center">
                          {label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {impactLabels.map(impact => (
                      <tr key={impact}>
                        <th className="border p-2 bg-gray-200">{impact}</th>
                        {probabilityLabels.map(probability => {
                          const cellRisks = getRisksForCell(impact, probability);
                          const cellLabel = getCellLabel(impact, probability);
                          const cellColor = getCellColor(impact, probability);

                          return (
                            <td 
                              key={`${impact}-${probability}`} 
                              className={`border p-2 ${cellColor} text-center`}
                            >
                              {cellLabel && <div className="font-bold mb-1">{cellLabel}</div>}
                              {cellRisks.length > 0 ? (
                                <div className="text-sm">{cellRisks.join(', ')}</div>
                              ) : null}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="mt-4 text-sm text-gray-500">
              Total risks: {risks.length}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default RiskHeatmap;