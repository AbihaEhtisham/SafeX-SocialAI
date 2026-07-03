'use client';

import { TrendingUp, Heart, MessageCircle, Share2, Eye, BarChart3, Star, Lightbulb, AlertCircle } from 'lucide-react';
import { PredictionResult } from '@/lib/api';

interface ResultsPanelProps {
  result: PredictionResult;
}

export default function ResultsPanel({ result }: ResultsPanelProps) {
  const { predictions, engagement_score, ai_insights } = result;

  const metrics = [
    { label: 'Likes', value: predictions.likes.toLocaleString(), icon: Heart, color: 'text-red-400' },
    { label: 'Comments', value: predictions.comments.toLocaleString(), icon: MessageCircle, color: 'text-blue-400' },
    { label: 'Shares', value: predictions.shares.toLocaleString(), icon: Share2, color: 'text-green-400' },
    { label: 'Reach', value: predictions.reach.toLocaleString(), icon: Eye, color: 'text-yellow-400' },
    { label: 'Impressions', value: predictions.impressions.toLocaleString(), icon: BarChart3, color: 'text-purple-400' },
  ];

  return (
    <div className="space-y-4">
      {/* Engagement Score */}
      <div className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 border border-purple-700/50 rounded-2xl p-6 text-center">
        <Star className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
        <div className="text-4xl font-bold text-white">{engagement_score}</div>
        <div className="text-sm text-gray-400">/ 10 Engagement Score</div>
      </div>

      {/* Prediction Metrics */}
      <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-purple-400" />
          <h3 className="font-semibold">Predicted Engagement</h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {metrics.map((metric) => (
            <div key={metric.label} className="bg-gray-800/50 rounded-xl p-3">
              <div className="flex items-center gap-2 mb-1">
                <metric.icon className={`w-4 h-4 ${metric.color}`} />
                <span className="text-xs text-gray-400">{metric.label}</span>
              </div>
              <div className="text-lg font-bold">{metric.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="w-5 h-5 text-yellow-400" />
          <h3 className="font-semibold">AI Decision Engine</h3>
          <span className="text-xs bg-purple-600 px-2 py-0.5 rounded-full ml-auto">
            {ai_insights.confidence}% confidence
          </span>
        </div>

        {/* Factors */}
        <div className="space-y-2 mb-4">
          <p className="text-xs text-gray-500 uppercase">Top Factors</p>
          {ai_insights.factors.map((factor, i) => (
            <div key={i} className="text-sm text-gray-300 flex items-start gap-2">
              <span className="mt-0.5">{factor.startsWith('✓') ? '✅' : '⚠️'}</span>
              {factor}
            </div>
          ))}
        </div>

        {/* Recommendations */}
        {ai_insights.recommendations.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs text-gray-500 uppercase">Recommendations</p>
            {ai_insights.recommendations.map((rec, i) => (
              <div key={i} className="text-sm text-purple-300 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                {rec}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}