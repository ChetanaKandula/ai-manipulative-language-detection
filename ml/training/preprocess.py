import pandas as pd
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parents[2]

INPUT_FILE = PROJECT_ROOT / "dataset" / "processed" / "final_dataset.csv"
OUTPUT_FILE = PROJECT_ROOT / "dataset" / "processed" / "model_ready_dataset.csv"

df = pd.read_csv(INPUT_FILE)

label_mapping = {
    "Normal": 0,
    "Gaslighting": 1,
    "Guilt Tripping": 2,
    "Emotional Blackmail": 3,
    "Love Bombing": 4
}

df["label_encoded"] = df["label"].map(label_mapping)

df.to_csv(OUTPUT_FILE, index=False)

print("Preprocessing Completed")
print("\nShape:", df.shape)

print("\nLabel Mapping:")
print(label_mapping)

print("\nEncoded Distribution:")
print(df["label_encoded"].value_counts())