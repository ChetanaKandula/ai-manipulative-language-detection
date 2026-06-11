from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.models.schema import (
    PredictionRequest,
    PredictionResponse
)

from backend.routes.predict import (
    predict_message
)

from backend.routes.chat_analysis import analyze_chat

from backend.models.schema import (
    ChatAnalysisRequest,
    ChatAnalysisResponse
)

app = FastAPI(
    title="Manipulative Language Detection API"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {
        "message": "API Running Successfully"
    }


@app.post("/predict")
def predict(
    request: PredictionRequest
):

    result = predict_message(
        request.message
    )

    return PredictionResponse(
        prediction=result["prediction"],
        confidence=result["confidence"]
    )

@app.post("/analyze-chat")
def analyze_chat_endpoint(
    request: ChatAnalysisRequest
):

    result = analyze_chat(
        request.messages
    )

    return ChatAnalysisResponse(
        results=result["results"],
        summary=result["summary"]
    )