from pydantic import BaseModel
from typing import List

class PredictionRequest(BaseModel):
    message: str


class PredictionResponse(BaseModel):
    prediction: str
    confidence: float

class ChatAnalysisRequest(BaseModel):
    messages: List[str]

class ChatAnalysisResponse(BaseModel):
    results: list
    summary: dict