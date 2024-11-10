import random
import numpy as np
from flask_cors import CORS
from flask import Flask, request, jsonify

app = Flask(__name__)

CORS(app)


import numpy as np
import random

def string_to_3d_matrix(binary_string, dim_size=2):
    cube_size = dim_size**3
    padded_length = ((len(binary_string) + cube_size - 1) // cube_size) * cube_size
    padded_binary = binary_string.ljust(padded_length, "0")
    matrix = np.zeros((dim_size, dim_size, dim_size), dtype=int)
    for i in range(dim_size):
        for j in range(dim_size):
            for k in range(dim_size):
                index = i * dim_size * dim_size + j * dim_size + k
                if index < len(padded_binary):
                    matrix[i][j][k] = int(padded_binary[index])
    return matrix

def calculate_checksums(matrix):
    dim_size = matrix.shape[0]
    xy_sums = np.sum(matrix, axis=2) % 2
    xz_sums = np.sum(matrix, axis=1) % 2
    yz_sums = np.sum(matrix, axis=0) % 2
    return xy_sums, xz_sums, yz_sums

def introduce_random_errors(matrix, error_percentage):
    dim_size = matrix.shape[0]
    total_bits = dim_size**3
    num_errors = int(total_bits * error_percentage / 100)
    corrupted_matrix = matrix.copy()
    for _ in range(num_errors):
        x = random.randint(0, dim_size - 1)
        y = random.randint(0, dim_size - 1)
        z = random.randint(0, dim_size - 1)
        corrupted_matrix[x][y][z] = 1 - corrupted_matrix[x][y][z]
    return corrupted_matrix

def introduce_clustered_errors(matrix, clusters=1):
    dim_size = matrix.shape[0]
    corrupted_matrix = matrix.copy()
    for _ in range(clusters):
        x = random.randint(0, dim_size - 2)
        y = random.randint(0, dim_size - 2)
        z = random.randint(0, dim_size - 2)
        for dx in range(2):
            for dy in range(2):
                for dz in range(2):
                    corrupted_matrix[x + dx][y + dy][z + dz] = 1 - corrupted_matrix[x + dx][y + dy][z + dz]
    return corrupted_matrix

def introduce_plane_errors(matrix):
    dim_size = matrix.shape[0]
    corrupted_matrix = matrix.copy()
    plane = random.choice(['xy', 'xz', 'yz'])
    index = random.randint(0, dim_size - 1)
    if plane == 'xy':
        corrupted_matrix[:, :, index] = 1 - corrupted_matrix[:, :, index]
    elif plane == 'xz':
        corrupted_matrix[:, index, :] = 1 - corrupted_matrix[:, index, :]
    else:  # 'yz'
        corrupted_matrix[index, :, :] = 1 - corrupted_matrix[index, :, :]
    return corrupted_matrix

def detect_and_recover(corrupted_matrix, original_checksums, method="Checksum", max_iterations=3):
    xy_sums_orig, xz_sums_orig, yz_sums_orig = original_checksums
    dim_size = corrupted_matrix.shape[0]
    recovered_matrix = corrupted_matrix.copy()
    corrections_made = 0

    for _ in range(max_iterations):
        xy_sums_curr, xz_sums_curr, yz_sums_curr = calculate_checksums(recovered_matrix)
        corrected = False

        for i in range(dim_size):
            for j in range(dim_size):
                for k in range(dim_size):
                    errors = 0
                    if xy_sums_curr[i][j] != xy_sums_orig[i][j]:
                        errors += 1
                    if xz_sums_curr[i][k] != xz_sums_orig[i][k]:
                        errors += 1
                    if yz_sums_curr[j][k] != yz_sums_orig[j][k]:
                        errors += 1
                    
                    # Weighted error correction based on the chosen method
                    if errors >= 2:
                        recovered_matrix[i][j][k] = 1 - recovered_matrix[i][j][k]
                        corrected = True
                        corrections_made += 1
        
        if not corrected:
            break

    return recovered_matrix, corrections_made

def matrix_to_string(matrix):
    result = ""
    dim_size = matrix.shape[0]
    for i in range(dim_size):
        for j in range(dim_size):
            for k in range(dim_size):
                result += str(matrix[i][j][k])
    return result

def calculate_recovery_rate(original, recovered):
    total_bits = len(original)
    correct_bits = sum(1 for i in range(total_bits) if original[i] == recovered[i])
    return (correct_bits / total_bits) * 100

def ERRORdet(original_binary, error_percentage, clusters=1):
    matrix = string_to_3d_matrix(original_binary)
    original_checksums = calculate_checksums(matrix)

    # Introduce multiple types of errors
    corrupted_matrix_1 = introduce_random_errors(matrix, error_percentage)
    corrupted_matrix_2 = introduce_clustered_errors(corrupted_matrix_1, clusters)
    corrupted_matrix = introduce_plane_errors(corrupted_matrix_2)

    recovery_methods = ["Checksum", "Majority Voting", "Iterative Refinement"]
    results = {}

    original_str = matrix_to_string(matrix)
    corrupted_str = matrix_to_string(corrupted_matrix)

    for method in recovery_methods:
        recovered_matrix, corrections = detect_and_recover(corrupted_matrix, original_checksums, method)
        recovered_str = matrix_to_string(recovered_matrix)
        recovery_rate = calculate_recovery_rate(original_str, recovered_str)
        results[method] = {
            "Recovered": recovered_str,
            "Recovery Rate (%)": f"{recovery_rate:.2f}",  # Show with 2 decimal points
            "Corrections Made": corrections
        }

    # Print detailed output with decimal precision
    result = {
        "Original": original_str,
        "Corrupted": corrupted_str,
        "Results": results
    }
    print(result)
    return result


# ERRORdet("10101011",50,2)

@app.route('/error', methods=['POST'])
def process_request():
    data = request.json  # Get JSON data from the request
    if not data or 'inputValue' not in data:
        return jsonify({'error': 'Invalid input'}), 400

    input_value = data.get("inputValue")

    # Call your function and get the result
    result = ERRORdet(input_value,50,2)  

    # Send the result back to the React frontend in JSON format
    return jsonify({'result': result})

if __name__ == '__main__':
    app.run(debug=True,port=5001)