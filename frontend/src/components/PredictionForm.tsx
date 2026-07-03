'use client';

import { useState } from 'react';
import { Send, Sliders } from 'lucide-react';
import { PredictionInput } from '@/types';

interface PredictionFormProps {
  onSubmit: (input: PredictionInput) => void;
  loading: boolean;
}

const MEDIA_TYPES = ['image', 'reel', 'carousel'];
const CATEGORIES = ['Technology', 'Fitness', 'Beauty', 'Food', 'Music', 'Photography', 'Travel', 'Fashion'];
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const SOURCES = ['Home Feed', 'Hashtags', 'Explore', 'Reels Feed', 'Profile', 'External'];

export default function PredictionForm({ onSubmit, loading }: PredictionFormProps) {
  const [form, setForm] = useState<PredictionInput>({
    follower_count: 5000,
    caption_length: 100,
    hashtags_count: 5,
    post_hour: 12,
    has_call_to_action: 0,
    media_type: 'image',
    content_category: 'Technology',
    day_of_week: 'Wednesday',
    traffic_source: 'Home Feed',
    account_type: 'creator',
  });

  const updateField = (field: keyof PredictionInput, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6 space-y-5">
      <div className="flex items-center gap-2 mb-2">
        <Sliders className="w-5 h-5 text-purple-400" />
        <h2 className="text-lg font-semibold">Post Details</h2>
      </div>

      {/* Follower Count */}
      <div>
        <label className="block text-sm text-gray-400 mb-1">Follower Count</label>
        <input
          type="number"
          value={form.follower_count}
          onChange={(e) => updateField('follower_count', Number(e.target.value))}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
        />
      </div>

      {/* Caption Length */}
      <div>
        <label className="block text-sm text-gray-400 mb-1">Caption Length (characters)</label>
        <input
          type="range"
          min="0"
          max="300"
          value={form.caption_length}
          onChange={(e) => updateField('caption_length', Number(e.target.value))}
          className="w-full accent-purple-500"
        />
        <div className="text-right text-sm text-purple-400">{form.caption_length} chars</div>
      </div>

      {/* Hashtags */}
      <div>
        <label className="block text-sm text-gray-400 mb-1">Number of Hashtags</label>
        <input
          type="range"
          min="0"
          max="20"
          value={form.hashtags_count}
          onChange={(e) => updateField('hashtags_count', Number(e.target.value))}
          className="w-full accent-purple-500"
        />
        <div className="text-right text-sm text-purple-400">{form.hashtags_count} hashtags</div>
      </div>

      {/* Post Hour */}
      <div>
        <label className="block text-sm text-gray-400 mb-1">Posting Hour (24h)</label>
        <input
          type="range"
          min="0"
          max="23"
          value={form.post_hour}
          onChange={(e) => updateField('post_hour', Number(e.target.value))}
          className="w-full accent-purple-500"
        />
        <div className="text-right text-sm text-purple-400">{form.post_hour}:00</div>
      </div>

      {/* Media Type */}
      <div>
        <label className="block text-sm text-gray-400 mb-1">Media Type</label>
        <div className="grid grid-cols-3 gap-2">
          {MEDIA_TYPES.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => updateField('media_type', type)}
              className={`px-3 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                form.media_type === type
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Content Category */}
      <div>
        <label className="block text-sm text-gray-400 mb-1">Content Category</label>
        <select
          value={form.content_category}
          onChange={(e) => updateField('content_category', e.target.value)}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Day of Week */}
      <div>
        <label className="block text-sm text-gray-400 mb-1">Day of Week</label>
        <select
          value={form.day_of_week}
          onChange={(e) => updateField('day_of_week', e.target.value)}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
        >
          {DAYS.map((day) => (
            <option key={day} value={day}>{day}</option>
          ))}
        </select>
      </div>

      {/* Traffic Source */}
      <div>
        <label className="block text-sm text-gray-400 mb-1">Traffic Source</label>
        <select
          value={form.traffic_source}
          onChange={(e) => updateField('traffic_source', e.target.value)}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
        >
          {SOURCES.map((src) => (
            <option key={src} value={src}>{src}</option>
          ))}
        </select>
      </div>

      {/* Account Type */}
      <div>
        <label className="block text-sm text-gray-400 mb-1">Account Type</label>
        <div className="grid grid-cols-2 gap-2">
          {['creator', 'brand'].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => updateField('account_type', type)}
              className={`px-3 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                form.account_type === type
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* CTA Toggle */}
      <div>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={form.has_call_to_action === 1}
            onChange={(e) => updateField('has_call_to_action', e.target.checked ? 1 : 0)}
            className="w-5 h-5 rounded accent-purple-500"
          />
          <span className="text-sm text-gray-300">Has Call to Action</span>
        </label>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 py-3 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 rounded-xl font-semibold transition-all"
      >
        {loading ? (
          <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Predict Engagement
          </>
        )}
      </button>
    </form>
  );
}