import pandas as pd
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parents[2]

RAW_DATA_PATH = PROJECT_ROOT / "dataset" / "raw"
OUTPUT_PATH = PROJECT_ROOT / "dataset" / "processed" / "final_dataset.csv"

files = [
    "gaslighting_samples.csv",
    "guilt_tripping_samples.csv",
    "emotional_blackmail_samples.csv",
    "love_bombing_samples.csv",
    "normal_samples.csv"
]

dfs = []

for file in files:
    df = pd.read_csv(RAW_DATA_PATH / file)
    dfs.append(df)

final_df = pd.concat(dfs, ignore_index=True)

final_df = final_df.sample(
    frac=1,
    random_state=42
).reset_index(drop=True)

final_df.to_csv(OUTPUT_PATH, index=False)

print("Dataset Created Successfully!")
print("\nShape:", final_df.shape)

print("\nClass Distribution:")
print(final_df["label"].value_counts())