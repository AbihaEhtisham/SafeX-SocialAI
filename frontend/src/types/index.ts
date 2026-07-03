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

export interface PredictionOutput {
  likes: number;
  comments: number;
  shares: number;
  reach: number;
  impressions: number;
}

export interface AIInsights {
  factors: string[];
  recommendations: string[];
  confidence: number;
}