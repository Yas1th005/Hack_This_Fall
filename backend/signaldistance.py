import numpy as np
import matplotlib.pyplot as plt
import base64
from io import BytesIO
from flask import Flask, jsonify, request
from flask_cors import CORS

# Initialize Flask app and enable CORS
app = Flask(__name__)
CORS(app)

def generate_signal_integrity_graph(max_distance=10, initial_signal_strength=100):
    """Generate the signal integrity graph based on inputs."""
    
    # Dark theme setup for a modern look
    plt.style.use('dark_background')

    # Generate simulated data
    distances = np.linspace(0, max_distance, 100)
    signal_integrity = initial_signal_strength * np.exp(-0.1 * distances)

    # Create plot with enhanced styling
    fig, ax = plt.subplots(figsize=(8, 5))
    ax.plot(distances, signal_integrity, label="Signal Integrity", color="#00FFFF", linewidth=2.5)
    ax.set_xlabel("Distance (light-years)", color="#FFFFFF", fontsize=12)
    ax.set_ylabel("Signal Integrity (%)", color="#FFFFFF", fontsize=12)
    ax.set_title("Signal Integrity vs. Distance", color="#FFFFFF", fontsize=14, weight='bold')
    ax.grid(color="#555555", linestyle="--", linewidth=0.7)
    ax.legend(facecolor='black', edgecolor='white')

    # Improve axes visibility
    ax.spines['top'].set_color('#888888')
    ax.spines['right'].set_color('#888888')
    ax.spines['left'].set_color('#888888')
    ax.spines['bottom'].set_color('#888888')
    ax.tick_params(colors='white')

    # Save the plot to a BytesIO buffer
    buf = BytesIO()
    fig.savefig(buf, format="png", bbox_inches="tight", transparent=True)
    plt.close(fig)
    buf.seek(0)

    # Convert the image to a base64 string
    base64_img = base64.b64encode(buf.getvalue()).decode('utf-8')
    return base64_img

@app.route('/api/graph/signal_integrity', methods=['POST'])
def signal_integrity_graph():
    """
    API endpoint to generate the signal integrity graph.
    Expects JSON input with 'max_distance' and 'initial_signal_strength'.
    """
    data = request.json
    max_distance = data.get("max_distance", 10)
    initial_signal_strength = data.get("initial_signal_strength", 100)

    # Generate the graph using the received inputs
    base64_img = generate_signal_integrity_graph(max_distance, initial_signal_strength)
    return jsonify({"graph": base64_img})

if __name__ == '__main__':
    app.run(debug=True)
