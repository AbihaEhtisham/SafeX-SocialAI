'use client';

import { useState } from 'react';
import PredictionForm from '@/components/PredictionForm';
import ResultsPanel from '@/components/ResultsPanel';
import AnalyticsPanel from '@/components/AnalyticsPanel';
import { getPrediction, PredictionInput, PredictionResult } from '@/lib/api';
import { Sparkles, TrendingUp, BarChart3 } from 'lucide-react';

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
      setError('Failed to connect to AI engine. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f4ff] via-[#e8f0fe] to-[#dbeafe]">
      {/* Header */}
      <header className="bg-white/70 backdrop-blur-xl border-b border-[#20bef6]/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-3">
          {/* Logo Placeholder */}
          <div className="w-10 h-10 bg-gradient-to-br from-[#14438e] to-[#20bef6] rounded-xl flex items-center justify-center shadow-glow">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-[#14438e]">
            SafeX <span className="text-[#20bef6]">SocialAI</span>
          </h1>
          <span className="text-xs text-[#363738]/60 ml-auto hidden sm:block">
            AI-Powered Social Media Intelligence
          </span>
        </div>
      </header>

      {/* Hero */}
      <div className="max-w-7xl mx-auto px-6 pt-8 pb-4">
        <div className="text-center mb-8 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#14438e] mb-3">
            Predict Your Social Media Engagement
          </h2>
          <p className="text-[#363738]/70 text-lg max-w-2xl mx-auto">
            Enter your post details below and our AI engine will predict likes, comments, shares, reach, and give you optimization recommendations.
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left: Form */}
          <div className="lg:col-span-2 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <PredictionForm onSubmit={handlePredict} loading={loading} />
            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-sm animate-fade-in">
                ⚠ {error}
              </div>
            )}
          </div>

          {/* Right: Results */}
          <div className="lg:col-span-3">
            {loading && <LoadingState />}
            {result && !loading && (
              <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <ResultsPanel result={result} />
              </div>
            )}
            {!result && !loading && <EmptyState />}
          </div>
        </div>

        {/* Analytics */}
        {result && (
          <div className="mt-8 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <AnalyticsPanel result={result} />
          </div>
        )}
      </main>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="glass-card p-10 text-center animate-pulse-glow">
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#14438e] to-[#20bef6] animate-ai-thinking flex items-center justify-center">
        <Sparkles className="w-8 h-8 text-white" />
      </div>
      <p className="text-lg font-semibold text-[#14438e]">AI Engine Thinking...</p>
      <p className="text-sm text-[#363738]/60 mt-2">Analyzing patterns · Computing predictions · Generating recommendations</p>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="glass-card p-10 text-center">
      <TrendingUp className="w-16 h-16 text-[#20bef6]/30 mx-auto mb-4" />
      <p className="text-lg font-semibold text-[#363738]/60">Your predictions will appear here</p>
      <p className="text-sm text-[#363738]/40 mt-2">Fill in the post details and click Predict Engagement</p>
    </div>
  );
}