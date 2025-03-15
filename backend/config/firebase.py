import firebase_admin
from firebase_admin import credentials, firestore, auth

# Initialize Firebase
cred = credentials.Certificate("config/config.json")
firebase_admin.initialize_app(cred)

# Firestore database instance
db = firestore.client()
