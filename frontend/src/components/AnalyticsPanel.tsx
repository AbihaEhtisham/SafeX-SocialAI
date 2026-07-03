'use client';

import { BarChart3, Calendar, Clock, Hash, Zap } from 'lucide-react';
import { PredictionResult } from '@/lib/api';

interface AnalyticsPanelProps {
  result: PredictionResult;
}

export default function AnalyticsPanel({ result }: AnalyticsPanelProps) {
  const { best_posting_times, model_comparison, analytics } = result;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold flex items-center gap-2">
        <BarChart3 className="w-6 h-6 text-purple-400" />
        Analytics & Insights
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Best Posting Times */}
        <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-5 h-5 text-yellow-400" />
            <h3 className="font-semibold text-sm">Best Posting Times</h3>
          </div>
          <div className="space-y-2">
            <div>
              <span className="text-xs text-gray-500">Best Days:</span>
              <p className="text-sm text-white">{best_posting_times.best_days.join(', ')}</p>
            </div>
            <div>
              <span className="text-xs text-gray-500">Best Hours:</span>
              <p className="text-sm text-white">{best_posting_times.best_hours.join(', ')}</p>
            </div>
          </div>
        </div>

        {/* Content Insights */}
        <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-5 h-5 text-purple-400" />
            <h3 className="font-semibold text-sm">Content Insights</h3>
          </div>
          <div className="space-y-2 text-sm">
            <p className="text-gray-300">{analytics.best_post_type}</p>
            <p className="text-gray-300">Best hashtags: {analytics.best_hashtag_range}</p>
            <p className="text-gray-300">Caption: {analytics.optimal_caption_length}</p>
          </div>
        </div>

        {/* Model Performance */}
        <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <BarChart3 className="w-5 h-5 text-green-400" />
            <h3 className="font-semibold text-sm">Model Performance</h3>
          </div>
          <div className="space-y-1 text-sm">
            {Object.entries(model_comparison).slice(0, 3).map(([target, info]) => (
              <div key={target} className="flex justify-between">
                <span className="text-gray-400 capitalize">{target}</span>
                <span className="text-white">{info.model} (MAE: {info.MAE.toFixed(0)})</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Engagement by Day */}
      <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-blue-400" />
          <h3 className="font-semibold text-sm">Engagement by Day</h3>
        </div>
        <div className="grid grid-cols-7 gap-2">
          {Object.entries(analytics.engagement_by_day).map(([day, rate]) => (
            <div key={day} className="text-center">
              <div className="text-xs text-gray-500 mb-1">{day.slice(0, 3)}</div>
              <div
                className="h-20 bg-purple-600/30 rounded-lg flex items-end"
                style={{ height: `${(rate / 0.05) * 100}px` }}
              >
                <div
                  className="w-full bg-purple-500 rounded-lg"
                  style={{ height: `${(rate / 0.05) * 100}%` }}
                />
              </div>
              <div className="text-xs text-gray-400 mt-1">{rate.toFixed(2)}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}