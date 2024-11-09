import numpy as np
import matplotlib.pyplot as plt
import base64
from io import BytesIO
from flask import Flask, jsonify, request
from flask_cors import CORS
import matplotlib
matplotlib.use('Agg')  # Use a non-interactive backend


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


def generate_interference_graph(interference_zones, signal_loss_per_zone):
    """Generate a bar chart showing signal loss in different interference zones."""
    # Use a dark theme for compatibility with the black background of your React app
    plt.style.use('dark_background')
    
    # Create the bar plot with improved aesthetics
    fig, ax = plt.subplots(figsize=(8, 5))
    ax.bar(interference_zones, signal_loss_per_zone, color='#FF6F61', edgecolor='white')

    # Adding labels and title with modern styling
    ax.set_xlabel("Interference Zone", color="white", fontsize=12)
    ax.set_ylabel("Signal Loss (%)", color="white", fontsize=12)
    ax.set_title("Impact of Interference Zones on Signal", color="white", fontsize=14, weight='bold')
    ax.grid(color="#555555", linestyle="--", linewidth=0.7)

    # Improve axes and tick visibility
    ax.spines['top'].set_color('#888888')
    ax.spines['right'].set_color('#888888')
    ax.spines['left'].set_color('#888888')
    ax.spines['bottom'].set_color('#888888')
    ax.tick_params(colors='white')

    # Save the plot to a BytesIO buffer
    buf = BytesIO()
    fig.savefig(buf, format='png', bbox_inches='tight', transparent=True)
    plt.close(fig)
    buf.seek(0)

    # Convert the image to a base64 string
    base64_img = base64.b64encode(buf.getvalue()).decode('utf-8')
    return base64_img

@app.route('/api/graph/interference', methods=['POST'])
def interference_graph():
    """
    API endpoint to generate the interference graph.
    Expects JSON input with 'interference_zones' and 'signal_loss_per_zone'.
    """
    data = request.json
    interference_zones = data.get("interference_zones", ['Star', 'Asteroid Field', 'Nebula'])
    signal_loss_per_zone = data.get("signal_loss_per_zone", [20, 10, 15])

    # Generate the graph using the received inputs
    base64_img = generate_interference_graph(interference_zones, signal_loss_per_zone)
    return jsonify({"graph": base64_img})



def generate_transmission_speed_graph(distances, transmission_speeds):
    """Generate a line graph showing transmission speed by data type over distance."""
    
    # Use a dark theme for compatibility with a black React background
    plt.style.use('dark_background')

    # Create the plot with enhanced styling
    fig, ax = plt.subplots(figsize=(8, 5))
    
    # Plot each data type with a unique color
    colors = ['#00FFFF', '#FF6F61', '#FFD700']
    for idx, (data_type, speeds) in enumerate(transmission_speeds.items()):
        ax.plot(distances, speeds, label=data_type, color=colors[idx], linewidth=2.5, marker='o')
    
    # Add labels, title, and grid with improved aesthetics
    ax.set_xlabel("Distance (light-years)", color="white", fontsize=12)
    ax.set_ylabel("Transmission Speed (bps)", color="white", fontsize=12)
    ax.set_title("Transmission Speed vs. Distance by Data Type", color="white", fontsize=14, weight='bold')
    ax.grid(color="#555555", linestyle="--", linewidth=0.7)
    ax.legend(facecolor='black', edgecolor='white')

    # Improve axes and tick visibility
    ax.spines['top'].set_color('#888888')
    ax.spines['right'].set_color('#888888')
    ax.spines['left'].set_color('#888888')
    ax.spines['bottom'].set_color('#888888')
    ax.tick_params(colors='white')

    # Save the plot to a BytesIO buffer
    buf = BytesIO()
    fig.savefig(buf, format='png', bbox_inches='tight', transparent=True)
    plt.close(fig)
    buf.seek(0)

    # Convert the image to a base64 string
    base64_img = base64.b64encode(buf.getvalue()).decode('utf-8')
    return base64_img

@app.route('/api/graph/transmission_speed', methods=['POST'])
def transmission_speed_graph():
    """
    API endpoint to generate the transmission speed graph.
    Expects JSON input with 'distances' and 'transmission_speeds'.
    """
    data = request.json
    distances = np.array(data.get("distances", [1, 3, 5, 7, 9]))
    transmission_speeds = data.get("transmission_speeds", {
        'Binary': [50, 40, 30, 20, 10],
        'Image': [40, 30, 25, 15, 5],
        'Text': [60, 50, 45, 35, 25]
    })

    # Generate the graph using the received inputs
    base64_img = generate_transmission_speed_graph(distances, transmission_speeds)
    return jsonify({"graph": base64_img})


def generate_cumulative_error_graph(transmission_time, initial_error_rate):
    """Generate a graph showing cumulative error over time."""
    
    # Use a dark theme to match the black React background
    plt.style.use('dark_background')
    
    # Simulated cumulative error increase using a power curve
    cumulative_error = initial_error_rate * transmission_time**1.2

    # Create the plot with enhanced aesthetics
    fig, ax = plt.subplots(figsize=(8, 5))
    ax.fill_between(transmission_time, cumulative_error, color='#FF6F61', alpha=0.7)

    # Add labels, title, and grid with improved styling
    ax.set_xlabel("Time", color="white", fontsize=12)
    ax.set_ylabel("Cumulative Error Rate (%)", color="white", fontsize=12)
    ax.set_title("Cumulative Error Over Time", color="white", fontsize=14, weight='bold')
    ax.grid(color="#555555", linestyle="--", linewidth=0.7)

    # Improve axes and tick visibility
    ax.spines['top'].set_color('#888888')
    ax.spines['right'].set_color('#888888')
    ax.spines['left'].set_color('#888888')
    ax.spines['bottom'].set_color('#888888')
    ax.tick_params(colors='white')

    # Save the plot to a BytesIO buffer
    buf = BytesIO()
    fig.savefig(buf, format='png', bbox_inches='tight', transparent=True)
    plt.close(fig)
    buf.seek(0)

    # Convert the image to a base64 string
    base64_img = base64.b64encode(buf.getvalue()).decode('utf-8')
    return base64_img

@app.route('/api/graph/cumulative_error', methods=['POST'])
def cumulative_error_graph():
    """
    API endpoint to generate the cumulative error graph.
    Expects JSON input with 'transmission_time' and 'initial_error_rate'.
    """
    data = request.json
    transmission_time = np.array(data.get("transmission_time", np.linspace(0, 10, 100)))
    initial_error_rate = data.get("initial_error_rate", 5)

    # Generate the graph using the received inputs
    base64_img = generate_cumulative_error_graph(transmission_time, initial_error_rate)
    return jsonify({"graph": base64_img})





if __name__ == '__main__':
    app.run(debug=True)
