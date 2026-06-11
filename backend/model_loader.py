import pickle
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parents[1]

MODEL_PATH = PROJECT_ROOT / "ml" / "models" / "logistic_model.pkl"

VECTORIZER_PATH = PROJECT_ROOT / "ml" / "models" / "tfidf_vectorizer.pkl"


with open(MODEL_PATH, "rb") as f:
    model = pickle.load(f)

with open(VECTORIZER_PATH, "rb") as f:
    vectorizer = pickle.load(f)