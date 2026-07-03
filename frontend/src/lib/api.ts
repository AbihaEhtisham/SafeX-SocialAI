const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface PredictionInput {
  follower_count: number;
  caption_length: number;
  hashtags_count: number;
  post_hour: number;
  has_call_to_action: number;
  media_type: string;
  content_category: string;
  day_of_week: string;
  traffic_source: string;
  account_type: string;
}

export interface PredictionResult {
  predictions: {
    likes: number;
    comments: number;
    shares: number;
    reach: number;
    impressions: number;
  };
  engagement_score: number;
  ai_insights: {
    factors: string[];
    recommendations: string[];
    confidence: number;
  };
  best_posting_times: {
    best_days: string[];
    best_hours: string[];
    best_windows: { day: string; hour: number; score: number }[];
  };
  model_comparison: Record<string, { model: string; MAE: number; 'R²': number }>;
  analytics: {
    best_post_type: string;
    best_hashtag_range: string;
    optimal_caption_length: string;
    top_content_categories: string[];
    engagement_by_day: Record<string, number>;
  };
}

export async function getPrediction(input: PredictionInput): Promise<PredictionResult> {
  const response = await fetch(`${API_URL}/predict`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw new Error('Prediction failed');
  }

  return response.json();
}

export async function checkHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_URL}/health`);
    return response.ok;
  } catch {
    return false;
  }
}