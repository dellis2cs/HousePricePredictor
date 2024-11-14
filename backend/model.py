# Import necessary libraries
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import Lasso
from sklearn.preprocessing import LabelEncoder
import pickle

# Load the housing dataset
housing_data = pd.read_csv('Housing Prices Dataset.csv')

# Encoding Categorical Columns
# Binary columns (mainroad, guestroom, basement, hotwaterheating, airconditioning, prefarea)
binary_columns = ['mainroad', 'guestroom', 'basement', 'hotwaterheating', 'airconditioning', 'prefarea']
housing_data[binary_columns] = housing_data[binary_columns].apply(lambda x: x.map({'yes': 1, 'no': 0}))

# Encoding 'furnishingstatus' as it has multiple categories
housing_data['furnishingstatus'] = LabelEncoder().fit_transform(housing_data['furnishingstatus'])

# Prepare Features (X) and Target Variable (Y)
X = housing_data.drop(['price'], axis=1)  # Drop the target variable
Y = housing_data['price']  # Target variable

# Train-Test Split
X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.1, random_state=2)

# Initialize and Train the Lasso Regression Model
model = Lasso()
model.fit(X_train, Y_train)

# Export the Trained Model using Pickle
pickle.dump(model, open('ml_model.pkl', 'wb'))

print("Model trained and saved as ml_model.pkl")
