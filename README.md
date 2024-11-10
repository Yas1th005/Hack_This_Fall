# Intergalactic Data Transmission Project

## Overview

The *Intergalactic Data Transmission* project aims to estimate the likelihood of data transmission errors between celestial bodies, focusing primarily on the communication from Earth to distant locations like Jupiter. This project combines space weather, ephemeris data, and machine learning to predict data transmission errors and optimize signal clarity and accuracy for intergalactic communication systems.

The project uses real-time ephemeris data from the *Jet Propulsion Laboratory (JPL) Horizons system*, which provides accurate orbital and position information for celestial bodies, and applies machine learning models to classify error likelihood based on a set of input parameters.

## Key Features

- *Ephemeris Data*: The project integrates real-time orbital data from the JPL Horizons system, which includes parameters like apparent magnitude, surface brightness, distance, and more, for celestial bodies such as Mars, Jupiter, and other space objects.
- *Error Likelihood Classification: Using the provided ephemeris data, the system predicts the likelihood of transmission errors in data sent from Earth to distant locations (such as Mars, Jupiter), classifying errors as **low (0), **medium (1), or **high (2)*.
- *Mathematical Formula*: The project uses a custom mathematical formula that incorporates several key space weather and positional factors to estimate the probability of transmission errors. These factors include:
    - *Apparent Magnitude (APmag)*: A measure of brightness, impacting signal clarity.
    - *Surface Brightness (S-brt)*: Affects noise levels in the signal.
    - *Distance (delta)*: Directly influences signal strength and delay.
    - *Doppler Effects (deldot)*: Assesses the rate of distance change and its impact on signal reception.
    - *Solar Interference (S-O-T, S-T-O angles)*: Indicates potential interference from the Sun.
    - *Relative Position to the Sun (/r)*: Influences signal degradation, especially if the target body is closer or farther from the Sun.

  ## The formula used to estimate the likelihood of transmission errors is:

  
  Pe = k1 * e^(-APmag / c1) + k2 * (S_brt / C2) + k3 * (delta / C3)^2 + k4 * |deldot| + k5 * sin(SOT) + k6 * |\r|+ k7*cos(STO)
  

  - *k*: Coefficients representing the sensitivity of the error probability to each parameter.
  - *C*: Constants to normalize the values of each parameter for better scalability and accuracy.


![1](https://github.com/user-attachments/assets/4f71aae4-e4a0-414a-963b-20365f59069c)

![2](https://github.com/user-attachments/assets/c183b63d-36af-4832-bdd1-9639ba2d703b)

![3](https://github.com/user-attachments/assets/4d9710e7-30f6-44ff-bf33-2b4dfce79411)

![4](https://github.com/user-attachments/assets/f9f43ae2-0e24-4fbf-80ef-24db8058c639)



###  Explanation of Terms:
  - The exponential term for APmag reflects how increased brightness reduces visibility and increases error likelihood.
  - The ratio for S-brt shows that higher surface brightness directly correlates with increased noise.
  - The squared term for delta indicates that as distance increases, errors increase quadratically due to signal attenuation.
  - The absolute value of deldot captures the impact of relative motion on Doppler shifts.
  - The sine and cosine functions for angles capture periodic effects due to solar interference and phase angles.

## How the Formula Affects Data Transmission

The formula is designed to estimate the likelihood of transmission errors based on the influence of various space-related parameters. Here's how each component affects the data transmission:

1. *Apparent Magnitude (APmag)*: The brighter the celestial body (i.e., lower apparent magnitude), the clearer the signal, which reduces error likelihood. Higher magnitudes result in more transmission errors.
2. *Surface Brightness (S-brt)*: Higher surface brightness indicates higher noise levels in the signal, leading to higher error probability.
3. *Distance (delta)*: The greater the distance between Earth and the target body, the more signal degradation occurs, leading to higher errors.
4. *Doppler Effects (deldot)*: The rate at which the distance changes between Earth and the target body causes Doppler shifts, which can distort the signal, increasing the likelihood of transmission errors.
5. *Solar Interference (SOT, STO)*: Solar angles influence signal reflection or scattering. When the signal is closer to the Sun (either in the S-O-T angle or the S-T-O phase), interference increases, leading to a higher chance of transmission errors.
6. *Relative Position to the Sun (/r)*: Depending on whether the target body is trailing or leading the Sun in the sky, this parameter influences how much solar interference the signal encounters. The closer the target body is to the Sun, the higher the error likelihood.

Together, these parameters help calculate the error likelihood, which is classified into *low (0), **medium (1), or **high (2)* error categories.

## Synthetic Data Generation and Model Training

### Synthetic Data Generation

Due to the complexity of the system, actual data for all celestial bodies across different time periods may not be readily available. Therefore, *synthetic data* is generated using random values for each parameter within realistic ranges. This synthetic data mimics the real-world variability in space parameters and allows the system to generate a large dataset that can be used to train machine learning models.

Synthetic data generation includes:

- Randomly varying *Apparent Magnitude, **Surface Brightness, **Distance, **Doppler Effect*, and other parameters within predefined ranges.
- The generation of *error labels* (0, 1, or 2) for each synthetic data point using the previously discussed formula. These labels help train the model for future predictions.

### Training the Dataset

Once synthetic data is generated, it is used to train a *machine learning model* to predict error likelihood based on the input parameters. The training process involves the following steps:

1. *Data Preprocessing*: Cleaning and preparing the data by normalizing or standardizing the input parameters.
2. *Model Selection: Using a supervised learning approach such as **Random Forest, **Support Vector Machines (SVM), or **Gradient Boosting Machines* (GBM) to classify the error likelihood into categories (0, 1, 2).
3. *Model Training*: The model is trained using the labeled synthetic data to identify patterns and relationships between input parameters and error likelihood.
4. *Model Evaluation*: The model’s performance is evaluated using a test set (or cross-validation) to check how well it generalizes to unseen data.
5. *Model Tuning*: Hyperparameters of the model are tuned to optimize performance and improve classification accuracy.

### Classifying New Data

After the model is trained, it can be used to classify new ephemeris data from JPL Horizons. Given new parameters for a celestial body, the model will predict the likelihood of transmission errors and classify it into one of three categories:
- *0*: Low error likelihood
- *1*: Medium error likelihood
- *2*: High error likelihood

### Example

For instance, given the input data:

APmag = -4.339 ,Sbrt = 1.374 , delta = 0.81455566256830 ,deldot = 12.8800594, SOT = 45.6680 ,/r = "/L", STO = 80.2170



## Setup and Installation

### Requirements

1. Python 3.x
2. google-generativeai for using Gemini API (if integrating with Gemini for classification)
3. requests for API calls
4. pandas for data manipulation (e.g., handling ephemeris data)
5. scikit-learn for machine learning tasks

### Install Dependencies

Clone the repository and install the required dependencies using pip:

bash
git clone https://github.com/your-repository/intergalactic-data-transmission.git
cd intergalactic-data-transmission
pip install -r requirements.txt

## Configuration

- *API Key*: You'll need a valid Gemini API key (from Google Cloud) for generating responses using the Gemini model. Place it in the config.json file or configure it directly in the code using genai.configure(api_key="YOUR_API_KEY").

- *Ephemeris Data*: The system fetches ephemeris data from NASA’s JPL Horizons system. Make sure to specify the correct parameters and time ranges when fetching the data, and store it in a format (e.g., CSV) that the system can use for further processing.

- *Constants and Coefficients*: Adjust the coefficients (k1, k2, k3, etc.) and constants (c1, c2, c3, etc.) in the configuration file for the transmission error formula. These values may require empirical testing and tuning based on the results.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments


The ephemeris data is sourced from NASA’s Jet Propulsion Laboratory (JPL) Horizons system.



