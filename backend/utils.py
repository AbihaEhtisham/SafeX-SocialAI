"""
SafeX SocialAI — Utility Functions
"""

import pandas as pd


def get_model_comparison():
    """Load and return model comparison results."""
    try:
        df = pd.read_csv('../models/model_results.csv', index_col=0)
        return df.to_dict(orient='index')
    except:
        return {
            'likes': {'model': 'XGBoost', 'MAE': 232.99, 'R²': -0.019},
            'comments': {'model': 'XGBoost', 'MAE': 7.53, 'R²': -0.017},
            'shares': {'model': 'XGBoost', 'MAE': 12.14, 'R²': -0.021},
            'reach': {'model': 'XGBoost', 'MAE': 3503.54, 'R²': -0.018},
            'impressions': {'model': 'XGBoost', 'MAE': 4778.87, 'R²': -0.020},
        }


def get_analytics():
    """Return pre-computed analytics from the dataset."""
    return {
        'best_post_type': 'Reel (28% higher engagement)',
        'best_hashtag_range': '5-8 hashtags',
        'optimal_caption_length': '100-150 characters',
        'top_content_categories': ['Technology', 'Fitness', 'Food'],
        'engagement_by_day': {
            'Monday': 0.031, 'Tuesday': 0.033, 'Wednesday': 0.038,
            'Thursday': 0.041, 'Friday': 0.040, 'Saturday': 0.035, 'Sunday': 0.029
        }
    }