"""
SafeX SocialAI — Model Training Pipeline
Trains Random Forest and XGBoost models to predict
likes, comments, shares, and reach.
"""

import pandas as pd
import numpy as np
import joblib
import warnings
warnings.filterwarnings('ignore')

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from xgboost import XGBRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from sklearn.preprocessing import LabelEncoder


def load_and_preprocess(csv_path):
    df = pd.read_csv(csv_path)
    print(f"Loaded: {df.shape[0]} rows × {df.shape[1]} columns")

    # Parse date
    df['post_datetime'] = pd.to_datetime(df['post_datetime'], errors='coerce')
    df['post_date'] = pd.to_datetime(df['post_date'], errors='coerce')

    # Encode categoricals
    label_cols = ['media_type', 'content_category', 'day_of_week', 'traffic_source', 'account_type']
    encoders = {}

    for col in label_cols:
        le = LabelEncoder()
        df[col + '_enc'] = le.fit_transform(df[col].astype(str))
        encoders[col] = le

    # Feature columns
    feature_cols = [
        'follower_count',
        'caption_length',
        'hashtags_count',
        'post_hour',
        'has_call_to_action',
        'media_type_enc',
        'content_category_enc',
        'day_of_week_enc',
        'traffic_source_enc',
        'account_type_enc',
    ]

    # Targets
    target_cols = ['likes', 'comments', 'shares', 'reach', 'impressions']

    data = df[feature_cols + target_cols].dropna()
    X = data[feature_cols]
    y = data[target_cols]

    print(f"After cleaning: {len(X)} rows")
    return X, y, feature_cols, target_cols, encoders


def train_models(X, y, target_cols):
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    models = {}
    results = {}

    for target in target_cols:
        print(f"\n{'='*50}")
        print(f"Training models for: {target}")
        print(f"{'='*50}")

        # Random Forest
        rf = RandomForestRegressor(n_estimators=100, max_depth=15, random_state=42, n_jobs=-1)
        rf.fit(X_train, y_train[target])
        rf_pred = rf.predict(X_test)

        # XGBoost
        xgb = XGBRegressor(n_estimators=100, max_depth=6, learning_rate=0.1, random_state=42, n_jobs=-1)
        xgb.fit(X_train, y_train[target])
        xgb_pred = xgb.predict(X_test)

        # Compare
        rf_mae = mean_absolute_error(y_test[target], rf_pred)
        xgb_mae = mean_absolute_error(y_test[target], xgb_pred)
        rf_r2 = r2_score(y_test[target], rf_pred)
        xgb_r2 = r2_score(y_test[target], xgb_pred)

        print(f"  RF   — MAE: {rf_mae:.2f}, R²: {rf_r2:.3f}")
        print(f"  XGB  — MAE: {xgb_mae:.2f}, R²: {xgb_r2:.3f}")

        # Pick best
        if rf_mae < xgb_mae:
            best_model = rf
            print(f"  ✓ Best: Random Forest")
        else:
            best_model = xgb
            print(f"  ✓ Best: XGBoost")

        models[target] = best_model
        results[target] = {
            'model': 'RandomForest' if rf_mae < xgb_mae else 'XGBoost',
            'MAE': min(rf_mae, xgb_mae),
            'R²': max(rf_r2, xgb_r2),
        }

    return models, results, X_test, y_test


def save_artifacts(models, encoders, feature_cols, target_cols, results):
    import os
    os.makedirs('../models', exist_ok=True)

    for target, model in models.items():
        joblib.dump(model, f'../models/{target}_model.pkl')

    joblib.dump(encoders, '../models/encoders.pkl')
    joblib.dump(feature_cols, '../models/feature_cols.pkl')
    joblib.dump(target_cols, '../models/target_cols.pkl')

    # Save results as CSV
    results_df = pd.DataFrame(results).T
    results_df.to_csv('../models/model_results.csv')
    print("\n✓ All artifacts saved to ../models/")


if __name__ == '__main__':
    print("=" * 60)
    print("   SafeX SocialAI — Model Training Pipeline")
    print("=" * 60)

    X, y, feature_cols, target_cols, encoders = load_and_preprocess('../data/raw/Instagram_Analytics.csv')
    models, results, X_test, y_test = train_models(X, y, target_cols)
    save_artifacts(models, encoders, feature_cols, target_cols, results)

    print("\n" + "=" * 60)
    print("   MODEL COMPARISON SUMMARY")
    print("=" * 60)
    for target, res in results.items():
        print(f"  {target:<15} → {res['model']:<15} MAE: {res['MAE']:.2f}, R²: {res['R²']:.3f}")
    print("=" * 60)
    print("✓ Training complete!")