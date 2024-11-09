import matplotlib.pyplot as plt
import base64
from io import BytesIO
from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes and origins

def generate_interference_zone_graph(interference_zones, signal_loss_per_zone):
    plt.style.use('dark_background')
    fig, ax = plt.subplots(figsize=(8, 5))
    ax.bar(interference_zones, signal_loss_per_zone, color='dodgerblue')
    ax.set_xlabel("Interference Zone", color="white")
    ax.set_ylabel("Signal Loss (%)", color="white")
    ax.set_title("Impact of Interference Zones on Signal", color="white")
    ax.grid(color="gray", linestyle="--", axis="y", linewidth=0.5)

    buf = BytesIO()
    fig.savefig(buf, format="png", bbox_inches="tight")
    plt.close(fig)
    buf.seek(0)

    base64_img = base64.b64encode(buf.getvalue()).decode('utf-8')
    return base64_img

@app.route('/api/graph/interference_zone', methods=['POST'])
def interference_zone_graph():
    data = request.get_json()
    interference_zones = data.get("interference_zones", ["Star", "Asteroid Field", "Nebula"])
    signal_loss_per_zone = data.get("signal_loss_per_zone", [20, 10, 15])
    base64_img = generate_interference_zone_graph(interference_zones, signal_loss_per_zone)
    return jsonify({"graph": base64_img})

if __name__ == '__main__':
    app.run(debug=True)
