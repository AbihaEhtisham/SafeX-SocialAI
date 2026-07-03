"""
SafeX SocialAI — Prediction Engine
Loads trained models and makes predictions with explanations.
"""

import joblib
import numpy as np
import pandas as pd

# Load artifacts once at module level
MODELS = {}
ENCODERS = {}
FEATURE_COLS = []
TARGET_COLS = []

def load_models():
    global MODELS, ENCODERS, FEATURE_COLS, TARGET_COLS
    
    import os
    model_dir = os.path.join(os.path.dirname(__file__), '..', 'models')
    
    TARGET_COLS = joblib.load(f'{model_dir}/target_cols.pkl')
    FEATURE_COLS = joblib.load(f'{model_dir}/feature_cols.pkl')
    ENCODERS = joblib.load(f'{model_dir}/encoders.pkl')
    
    for target in TARGET_COLS:
        MODELS[target] = joblib.load(f'{model_dir}/{target}_model.pkl')
    
    print(f"✓ Loaded {len(MODELS)} models for: {TARGET_COLS}")


def prepare_features(data: dict):
    """Convert user input to model features."""
    features = {}
    
    # Numeric features
    features['follower_count'] = float(data.get('follower_count', 5000))
    features['caption_length'] = float(data.get('caption_length', 100))
    features['hashtags_count'] = float(data.get('hashtags_count', 5))
    features['post_hour'] = float(data.get('post_hour', 12))
    features['has_call_to_action'] = float(data.get('has_call_to_action', 0))
    
    # Encode categoricals
    for col in ['media_type', 'content_category', 'day_of_week', 'traffic_source', 'account_type']:
        val = str(data.get(col, 'image'))
        le = ENCODERS.get(col)
        if le and val in le.classes_:
            features[col + '_enc'] = float(le.transform([val])[0])
        else:
            features[col + '_enc'] = 0.0
    
    # Build array in correct order
    feature_array = np.array([[features.get(c, 0) for c in FEATURE_COLS]])
    return feature_array


def predict(data: dict):
    """Make predictions for all targets."""
    X = prepare_features(data)
    predictions = {}
    
    for target in TARGET_COLS:
        model = MODELS.get(target)
        if model:
            pred = float(model.predict(X)[0])
            predictions[target] = max(0, round(pred))
    
    return predictions


def get_engagement_score(predictions: dict, followers: float):
    """Calculate custom engagement score (0-10)."""
    if followers <= 0:
        return 0.0
    
    likes = predictions.get('likes', 0)
    comments = predictions.get('comments', 0)
    shares = predictions.get('shares', 0)
    reach = predictions.get('reach', 1)
    
    engagement_rate = (likes + 2 * comments + 3 * shares) / followers * 100
    engagement_rate = min(engagement_rate, 15)  # Cap at 15%
    
    score = (engagement_rate / 15) * 10
    return round(min(score, 10), 1)


def generate_recommendations(data: dict, predictions: dict):
    """Rule-based AI Decision Engine."""
    recommendations = []
    factors = []
    
    hour = int(data.get('post_hour', 12))
    hashtags = int(data.get('hashtags_count', 5))
    caption_len = int(data.get('caption_length', 100))
    media_type = str(data.get('media_type', 'image'))
    followers = float(data.get('follower_count', 5000))
    
    # Posting time analysis
    if 9 <= hour <= 11:
        factors.append("✓ Good posting time (morning peak)")
    elif 17 <= hour <= 20:
        factors.append("✓ Excellent posting time (evening peak)")
    elif 0 <= hour <= 5:
        factors.append("⚠ Late night posting — lower engagement expected")
        recommendations.append("Try posting between 5-8 PM for better reach")
    
    # Hashtag analysis
    if hashtags < 3:
        recommendations.append("Add 2-3 more hashtags to increase discoverability")
    elif hashtags > 10:
        recommendations.append("Consider reducing hashtags to 5-8 for optimal reach")
    else:
        factors.append("✓ Optimal hashtag count")
    
    # Caption length
    if caption_len < 50:
        recommendations.append("Longer captions (100-150 chars) tend to drive more engagement")
    elif caption_len > 200:
        recommendations.append("Consider a more concise caption under 180 characters")
    else:
        factors.append("✓ Caption length is optimal")
    
    # Media type
    if media_type == 'reel':
        factors.append("✓ Reels typically get higher reach")
    elif media_type == 'carousel':
        factors.append("✓ Carousels drive strong engagement")
    elif media_type == 'image' and followers > 10000:
        recommendations.append("Try carousel or reel format — they often outperform images")
    
    # Follower-based
    if followers < 1000:
        recommendations.append("Engage with similar accounts to grow your follower base")
    
    # Confidence
    confidence = 85 if len(factors) >= 3 else 65 if len(factors) >= 1 else 50
    
    return {
        'factors': factors[:4],
        'recommendations': recommendations[:3],
        'confidence': confidence,
    }


def get_best_posting_times():
    """Return best posting times based on data analysis."""
    return {
        'best_days': ['Wednesday', 'Thursday', 'Friday'],
        'best_hours': ['9-11 AM', '5-8 PM'],
        'best_windows': [
            {'day': 'Thursday', 'hour': 18, 'score': 9.2},
            {'day': 'Wednesday', 'hour': 10, 'score': 8.7},
            {'day': 'Friday', 'hour': 17, 'score': 8.5},
        ]
    }


# Auto-load on import
try:
    load_models()
except Exception as e:
    print(f"⚠ Models not loaded yet: {e}")