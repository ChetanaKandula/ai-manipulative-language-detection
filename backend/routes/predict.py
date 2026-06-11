from backend.model_loader import model, vectorizer

label_mapping = {
    0: "Normal",
    1: "Gaslighting",
    2: "Guilt Tripping",
    3: "Emotional Blackmail",
    4: "Love Bombing"
}


def predict_message(message: str):

    text_vector = vectorizer.transform([message])

    prediction = model.predict(text_vector)[0]

    confidence = (
        max(model.predict_proba(text_vector)[0]) * 100
    )

    return {
        "prediction": label_mapping[prediction],
        "confidence": round(confidence, 2)
    }