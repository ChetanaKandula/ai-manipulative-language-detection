import pickle
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parents[2]

MODEL_PATH = PROJECT_ROOT / "ml" / "models" / "logistic_model.pkl"
VECTORIZER_PATH = PROJECT_ROOT / "ml" / "models" / "tfidf_vectorizer.pkl"

with open(MODEL_PATH, "rb") as f:
    model = pickle.load(f)

with open(VECTORIZER_PATH, "rb") as f:
    vectorizer = pickle.load(f)

label_mapping = {
    0: "Normal",
    1: "Gaslighting",
    2: "Guilt Tripping",
    3: "Emotional Blackmail",
    4: "Love Bombing"
}

while True:
    text = input("\nEnter a message (or type quit): ")

    if text.lower() == "quit":
        break

    text_vector = vectorizer.transform([text])

    prediction = model.predict(text_vector)[0]

    probabilities = model.predict_proba(text_vector)[0]

    confidence = max(probabilities) * 100

    print("\nPrediction:", label_mapping[prediction])

    print(f"Confidence: {confidence:.2f}%")