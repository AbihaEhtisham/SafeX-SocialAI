'use client';

import { useState } from 'react';
import PredictionForm from '@/components/PredictionForm';
import ResultsPanel from '@/components/ResultsPanel';
import AnalyticsPanel from '@/components/AnalyticsPanel';
import { getPrediction, PredictionInput, PredictionResult } from '@/lib/api';
import { Sparkles } from 'lucide-react';

export default function HomePage() {
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePredict = async (input: PredictionInput) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getPrediction(input);
      setResult(data);
    } catch {
      setError('Failed to get prediction. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-3">
          <Sparkles className="w-7 h-7 text-purple-400" />
          <h1 className="text-xl font-bold">
            SafeX <span className="text-purple-400">SocialAI</span>
          </h1>
          <span className="text-xs text-gray-500 ml-auto">AI-Powered Social Media Intelligence</span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Input Form */}
          <div className="space-y-6">
            <PredictionForm onSubmit={handlePredict} loading={loading} />
            {error && (
              <div className="p-4 bg-red-900/30 border border-red-700 rounded-xl text-red-300 text-sm">
                {error}
              </div>
            )}
          </div>

          {/* Right: Results */}
          <div className="space-y-6">
            {loading && (
              <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-400"></div>
              </div>
            )}
            {result && !loading && <ResultsPanel result={result} />}
            {!result && !loading && (
              <div className="flex items-center justify-center py-20 text-gray-500 text-sm">
                Enter post details and click Predict to see results
              </div>
            )}
          </div>
        </div>

        {/* Analytics Section */}
        {result && (
          <div className="mt-8">
            <AnalyticsPanel result={result} />
          </div>
        )}
      </main>
    </div>
  );
}