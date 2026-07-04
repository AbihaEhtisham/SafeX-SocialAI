'use client';

import { useState } from 'react';
import { Send, Sliders, Hash, Type, Clock, Image, Tag, Users, Globe } from 'lucide-react';
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

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(form); }} className="glass-card p-6 space-y-5">
      <div className="flex items-center gap-2 mb-1">
        <Sliders className="w-5 h-5 text-[#20bef6]" />
        <h2 className="text-lg font-bold text-[#14438e]">Post Details</h2>
      </div>

      {/* Follower Count */}
      <FieldWrapper icon={Users} label="Follower Count">
        <input
          type="number"
          value={form.follower_count}
          onChange={(e) => updateField('follower_count', Number(e.target.value))}
          className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-[#363738] focus:outline-none focus:border-[#20bef6] focus:ring-2 focus:ring-[#20bef6]/20 transition-all"
        />
      </FieldWrapper>

      {/* Caption Length */}
      <FieldWrapper icon={Type} label="Caption Length">
        <input
          type="range" min="0" max="300"
          value={form.caption_length}
          onChange={(e) => updateField('caption_length', Number(e.target.value))}
          className="w-full"
        />
        <div className="text-right text-sm font-semibold text-[#20bef6]">{form.caption_length} chars</div>
      </FieldWrapper>

      {/* Hashtags */}
      <FieldWrapper icon={Hash} label="Number of Hashtags">
        <input
          type="range" min="0" max="20"
          value={form.hashtags_count}
          onChange={(e) => updateField('hashtags_count', Number(e.target.value))}
          className="w-full"
        />
        <div className="text-right text-sm font-semibold text-[#20bef6]">{form.hashtags_count} hashtags</div>
      </FieldWrapper>

      {/* Post Hour */}
      <FieldWrapper icon={Clock} label="Posting Hour">
        <input
          type="range" min="0" max="23"
          value={form.post_hour}
          onChange={(e) => updateField('post_hour', Number(e.target.value))}
          className="w-full"
        />
        <div className="text-right text-sm font-semibold text-[#20bef6]">{form.post_hour}:00</div>
      </FieldWrapper>

      {/* Media Type */}
      <FieldWrapper icon={Image} label="Media Type">
        <div className="grid grid-cols-3 gap-2">
          {MEDIA_TYPES.map((type) => (
            <button
              key={type} type="button"
              onClick={() => updateField('media_type', type)}
              className={`px-3 py-2 rounded-xl text-sm font-semibold capitalize transition-all ${
                form.media_type === type
                  ? 'bg-gradient-to-r from-[#14438e] to-[#235bcc] text-white shadow-md'
                  : 'bg-gray-100 text-[#363738] hover:bg-gray-200'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </FieldWrapper>

      {/* Content Category */}
      <FieldWrapper icon={Tag} label="Content Category">
        <select
          value={form.content_category}
          onChange={(e) => updateField('content_category', e.target.value)}
          className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-[#363738] focus:outline-none focus:border-[#20bef6]"
        >
          {CATEGORIES.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
        </select>
      </FieldWrapper>

      {/* Day of Week */}
      <FieldWrapper icon={Clock} label="Day of Week">
        <select
          value={form.day_of_week}
          onChange={(e) => updateField('day_of_week', e.target.value)}
          className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-[#363738] focus:outline-none focus:border-[#20bef6]"
        >
          {DAYS.map((day) => <option key={day} value={day}>{day}</option>)}
        </select>
      </FieldWrapper>

      {/* Traffic Source */}
      <FieldWrapper icon={Globe} label="Traffic Source">
        <select
          value={form.traffic_source}
          onChange={(e) => updateField('traffic_source', e.target.value)}
          className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-[#363738] focus:outline-none focus:border-[#20bef6]"
        >
          {SOURCES.map((src) => <option key={src} value={src}>{src}</option>)}
        </select>
      </FieldWrapper>

      {/* Account Type */}
      <FieldWrapper icon={Users} label="Account Type">
        <div className="grid grid-cols-2 gap-2">
          {['creator', 'brand'].map((type) => (
            <button
              key={type} type="button"
              onClick={() => updateField('account_type', type)}
              className={`px-3 py-2 rounded-xl text-sm font-semibold capitalize transition-all ${
                form.account_type === type
                  ? 'bg-gradient-to-r from-[#14438e] to-[#235bcc] text-white shadow-md'
                  : 'bg-gray-100 text-[#363738] hover:bg-gray-200'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </FieldWrapper>

      {/* CTA */}
      <label className="flex items-center gap-3 cursor-pointer bg-gray-50 rounded-xl p-3">
        <input
          type="checkbox"
          checked={form.has_call_to_action === 1}
          onChange={(e) => updateField('has_call_to_action', e.target.checked ? 1 : 0)}
          className="w-5 h-5 rounded accent-[#20bef6]"
        />
        <span className="text-sm font-medium text-[#363738]">Has Call to Action</span>
      </label>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-[#14438e] to-[#235bcc] hover:from-[#235bcc] hover:to-[#1b7fd2] text-white rounded-2xl font-bold text-lg shadow-md hover:shadow-xl transform hover:scale-[1.02] transition-all disabled:opacity-60"
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

function FieldWrapper({ icon: Icon, label, children }: { icon: any; label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-1.5">
        <Icon className="w-4 h-4 text-[#20bef6]" />
        <label className="text-sm font-semibold text-[#363738]">{label}</label>
      </div>
      {children}
    </div>
  );
}