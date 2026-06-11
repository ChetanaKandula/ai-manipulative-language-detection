from backend.routes.predict import predict_message


def analyze_chat(messages):

    results = []

    summary = {}

    for message in messages:

        result = predict_message(message)

        results.append({
            "message": message,
            "prediction": result["prediction"],
            "confidence": result["confidence"]
        })

        label = result["prediction"]

        summary[label] = summary.get(label, 0) + 1

    return {
        "results": results,
        "summary": summary
    }