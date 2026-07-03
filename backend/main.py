"""
SafeX SocialAI — FastAPI Backend
AI-Powered Social Media Intelligence Platform
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Optional
import predict
import utils

app = FastAPI(
    title="SafeX SocialAI API",
    description="AI-Powered Social Media Engagement Prediction",
    version="1.0.0"
)

# CORS — allow frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class PredictionRequest(BaseModel):
    follower_count: float = Field(default=5000, ge=0, description="Number of followers")
    caption_length: float = Field(default=100, ge=0, le=500, description="Caption character count")
    hashtags_count: float = Field(default=5, ge=0, le=30, description="Number of hashtags")
    post_hour: float = Field(default=12, ge=0, le=23, description="Hour of posting (0-23)")
    has_call_to_action: float = Field(default=0, ge=0, le=1, description="Has CTA? 0 or 1")
    media_type: str = Field(default="image", description="image, reel, or carousel")
    content_category: str = Field(default="Technology", description="Content category")
    day_of_week: str = Field(default="Wednesday", description="Day of the week")
    traffic_source: str = Field(default="Home Feed", description="Traffic source")
    account_type: str = Field(default="creator", description="creator or brand")


class PredictionResponse(BaseModel):
    predictions: dict
    engagement_score: float
    ai_insights: dict
    best_posting_times: dict
    model_comparison: dict
    analytics: dict


@app.get("/")
def root():
    return {"message": "SafeX SocialAI API is running", "version": "1.0.0"}


@app.post("/predict", response_model=PredictionResponse)
def make_prediction(request: PredictionRequest):
    try:
        data = request.model_dump()
        
        # Get predictions
        predictions = predict.predict(data)
        
        # Engagement score
        engagement_score = predict.get_engagement_score(predictions, data['follower_count'])
        
        # AI Insights
        ai_insights = predict.generate_recommendations(data, predictions)
        
        # Best posting times
        best_posting_times = predict.get_best_posting_times()
        
        # Model comparison
        model_comparison = utils.get_model_comparison()
        
        # Analytics
        analytics = utils.get_analytics()
        
        return PredictionResponse(
            predictions=predictions,
            engagement_score=engagement_score,
            ai_insights=ai_insights,
            best_posting_times=best_posting_times,
            model_comparison=model_comparison,
            analytics=analytics,
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/health")
def health_check():
    return {"status": "healthy", "models_loaded": len(predict.MODELS) > 0}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)