import os
from dotenv import load_dotenv

# Load variables from backend/.env
load_dotenv()

COGNODB_URI = os.getenv("COGNODB_URI")
COGNODB_USERNAME = os.getenv("COGNODB_USERNAME", "cognodb")
COGNODB_PASSWORD = os.getenv("COGNODB_PASSWORD")

if not COGNODB_URI:
    raise ValueError("COGNODB_URI is missing from .env")

if not COGNODB_PASSWORD:
    raise ValueError("COGNODB_PASSWORD is missing from .env")