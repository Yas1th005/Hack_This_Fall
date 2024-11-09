import matplotlib.pyplot as plt
import numpy as np
# Inputs
distances = np.array([1, 3, 5, 7, 9])  # in light-years
transmission_speeds = {
    'Binary': [50, 40, 30, 20, 10],
    'Image': [40, 30, 25, 15, 5],
    'Text': [60, 50, 45, 35, 25]
}

# Plot
plt.figure(figsize=(8, 5))
for data_type, speeds in transmission_speeds.items():
    plt.plot(distances, speeds, label=data_type)
plt.xlabel("Distance (light-years)")
plt.ylabel("Transmission Speed (bps)")
plt.title("Transmission Speed vs. Distance by Data Type")
plt.legend()
plt.grid(True)
plt.show()
