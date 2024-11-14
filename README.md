# House Price Predictor

In this project, I used a dataset containing various features related to house characteristics to predict the selling price of a house. By applying Lasso Regression with scikit-learn, I developed a predictive model that helps identify which features most impact house prices while reducing the influence of less relevant factors. Lasso is particularly effective here as it not only fits a linear model but also applies regularization, which can shrink coefficients for less impactful features toward zero, enhancing model simplicity and interpretability. This model can be deployed to estimate house prices based on inputs like area, number of bedrooms, presence of a basement, and more.

## Table of Contents
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Running the Application](#usage)

## Technologies Used

- **React** - For building the user interface.
- **Flask** - For handling routes and connecting to the frontend.
- **Python** - For training the ai prediction model on the data
- **CSS3** - For styling the layout.

## Getting Started

### Prerequisites

- **Node.js**, **npm**, and **python** installed on your system.

### Installation

- To get started, clone the repository and install dependencies
  
   ```bash
   git clone git@github.com:dellis2cs/HousePricePredictor.git
   ```
   ```bash
   cd HousePricePredictor
   ```
   ```bash
   npm install
   ```
   ```bash
   pip install flask
   pip install pandas
   pip install scikit-learn
   pip install flask_cors
   ```

## Usage

Run the application
```bash
cd frontend
npm run dev
   ```
```bash
cd backend
python3 app.py
   ```
