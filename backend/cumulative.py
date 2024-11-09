import matplotlib.pyplot as plt
import numpy as np

# Dark theme setup
plt.style.use('dark_background')

# Inputs
transmission_time = np.linspace(0, 10, 100)  # in arbitrary units
initial_error_rate = 5  # initial error rate in %

# Simulated cumulative error increase
cumulative_error = initial_error_rate * transmission_time**1.2  # power curve for error accumulation

# Plot
plt.figure(figsize=(8, 5))
plt.fill_between(transmission_time, cumulative_error, color="orangered", alpha=0.7)
plt.xlabel("Time", color="white")
plt.ylabel("Cumulative Error Rate (%)", color="white")
plt.title("Cumulative Error Over Time", color="white")
plt.grid(color="gray", linestyle="--", linewidth=0.5)
plt.show()




