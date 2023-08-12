import pandas as pd
from sys import argv

if argv[1] == "-h":
    print(
        """Syntax: python gen_random_data INPUT_PATH OUTPUT_PATH OUTPUT_LEN
    INPUT_PATH: Path of the file to be sampled
    OUTPUT_PATH = Path of the file that contains the samples
    OUTPUT_LEN = Sample size"""
    )
    exit()

INPUT_PATH = argv[1]
OUTPUT_PATH = argv[2]
OUTPUT_LEN = argv[3]

df = pd.read_csv(INPUT_PATH).drop(columns=["id", "measurement_id"])
example_data = df.sample(int(OUTPUT_LEN))
output = (
    example_data.sort_values(by="altitude", ascending=False)
    .reset_index()
    .drop(columns=["index"])
)

output.to_csv(OUTPUT_PATH, index=False)
