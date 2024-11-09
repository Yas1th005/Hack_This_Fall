# from flask import Flask, request, jsonify, send_file
# from flask_cors import CORS
# import matplotlib.pyplot as plt
# from mpl_toolkits.mplot3d import Axes3D
# import numpy as np
# from io import BytesIO

# app = Flask(__name__)
# CORS(app)  # Enable CORS for all routes

# # Route to generate and return the 3D graph image
# @app.route('/interferezones', methods=['POST'])
# def generate_graph():
#     data = request.json
#     interference_zones = data.get('interference_zones', ['Star', 'Asteroid Field', 'Nebula'])
#     signal_loss_per_zone = data.get('signal_loss_per_zone', [20, 10, 15])

#     # Generate the 3D bar plot
#     fig = plt.figure(figsize=(10, 7))
#     ax = fig.add_subplot(111, projection="3d")

#     x_pos = np.arange(len(interference_zones))
#     y_pos = np.zeros(len(interference_zones))
#     z_pos = [0] * len(interference_zones)
#     dx = np.ones(len(interference_zones))
#     dy = np.ones(len(interference_zones))
#     dz = signal_loss_per_zone

#     # Create the 3D bars
#     ax.bar3d(x_pos, y_pos, z_pos, dx, dy, dz, color="dodgerblue", edgecolor="cyan", shade=True)

#     # Customize the plot for a dark theme
#     ax.set_xticks(x_pos)
#     ax.set_xticklabels(interference_zones, color="white", fontsize=12, fontweight='bold')

#     # Add x-axis labels below each bar
#     for i, zone in enumerate(interference_zones):
#         ax.text(x_pos[i], -0.2, dz[i] / 2, zone, color='white', ha='center', fontsize=12, fontweight='bold')

#     ax.set_yticks([])
#     ax.set_zticks(range(0, max(signal_loss_per_zone) + 10, 5))
#     ax.set_zlabel("Signal Loss (%)", color="white", fontsize=14, fontweight='bold')
#     ax.set_title("Impact of Interference Zones on Signal (3D View)", color="white", fontsize=16, fontweight='bold')

#     # Set background and grid
#     ax.xaxis.pane.fill = False
#     ax.yaxis.pane.fill = False
#     ax.zaxis.pane.fill = False
#     fig.patch.set_facecolor("#1a1a1a")

#     # Save the plot to a BytesIO object
#     img = BytesIO()
#     plt.savefig(img, format='png', bbox_inches='tight', facecolor=fig.get_facecolor())
#     img.seek(0)
#     plt.close()

#     # Send the image back as a response
#     return send_file(img, mimetype='image/png')

# if __name__ == '__main__':
#     app.run(port=5000, debug=True)





import numpy as np
import matplotlib.pyplot as plt
import base64
from io import BytesIO
from flask import Flask, jsonify

app = Flask(__name__)

# Custom function for modern gradient background
def add_gradient(ax, color1, color2):
    ax.set_facecolor('none')
    ax.patch.set_alpha(0)
    fig = ax.figure
    gradient = np.linspace(0, 1, 256).reshape(-1, 1)
    fig.figimage(gradient, cmap=plt.get_cmap('viridis'), alpha=0.08, zorder=-1)

def generate_signal_integrity_graph():
    # Dark theme setup
    plt.style.use('dark_background')

    # Inputs
    max_distance = 10  # in light-years
    initial_signal_strength = 100  # in %

    # Simulated data
    distances = np.linspace(0, max_distance, 100)
    signal_integrity = initial_signal_strength * np.exp(-0.1 * distances)

    # Create plot
    fig, ax = plt.subplots(figsize=(10, 6))
    ax.plot(distances, signal_integrity, label="Signal Integrity", color="#00FFFF", linewidth=3)

    # Add gradient
    add_gradient(ax, '#002b36', '#073642')

    # Enhancing aesthetics
    ax.fill_between(distances, signal_integrity, color="#00FFFF", alpha=0.2)
    ax.set_xlabel("Distance (light-years)", color="white", fontsize=12)
    ax.set_ylabel("Signal Integrity (%)", color="white", fontsize=12)
    ax.set_title("Signal Integrity vs. Distance", color="#FFD700", fontsize=16, fontweight='bold')
    ax.grid(color="gray", linestyle="--", linewidth=0.5)
    ax.legend(facecolor='black', edgecolor='gray')

    # Save plot to BytesIO buffer
    buf = BytesIO()
    fig.savefig(buf, format="png", bbox_inches="tight", dpi=200)
    plt.close(fig)
    buf.seek(0)

    # Encode the image as base64 string
    base64_img = base64.b64encode(buf.getvalue()).decode('utf-8')
    return base64_img

@app.route('/api/graph/signal_integrity', methods=['GET'])
def signal_integrity_graph():
    base64_img = generate_signal_integrity_graph()
    return jsonify({"graph": base64_img})


def generate_interference_zone_graph():
    # Dark theme setup
    plt.style.use('dark_background')

    # Inputs
    interference_zones = ['Star', 'Asteroid Field', 'Nebula']
    signal_loss_per_zone = [20, 10, 15]

    # Create plot
    fig, ax = plt.subplots(figsize=(10, 6))
    bars = ax.bar(interference_zones, signal_loss_per_zone, color=['#FF6347', '#FFD700', '#32CD32'])

    # Add gradient
    add_gradient(ax, '#1a1a1a', '#333333')

    # Enhancing aesthetics
    for bar in bars:
        bar.set_edgecolor("white")
        bar.set_linewidth(1.5)
        bar.set_alpha(0.85)

    ax.set_xlabel("Interference Zone", color="white", fontsize=12)
    ax.set_ylabel("Signal Loss (%)", color="white", fontsize=12)
    ax.set_title("Impact of Interference Zones on Signal", color="#FFD700", fontsize=16, fontweight='bold')
    ax.grid(color="gray", linestyle="--", axis="y", linewidth=0.5)

    # Save plot to BytesIO buffer
    buf = BytesIO()
    fig.savefig(buf, format="png", bbox_inches="tight", dpi=200)
    plt.close(fig)
    buf.seek(0)

    # Encode the image as base64 string
    base64_img = base64.b64encode(buf.getvalue()).decode('utf-8')
    return base64_img

@app.route('/api/graph/interference_zone', methods=['GET'])
def interference_zone_graph():
    base64_img = generate_interference_zone_graph()
    return jsonify({"graph": base64_img})


if __name__ == '__main__':
    app.run(debug=True)

