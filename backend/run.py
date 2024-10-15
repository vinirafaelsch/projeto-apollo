from app import create_app
from flask_cors import CORS

from app.databases.initialize import initialize_discounts_database

app = create_app()

# Permite request do front
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# Cria collection com os descontos e popula ela caso collection ainda não exista
try:
    initialize_discounts_database()
except Exception as e:
    print("Erro ao popular collection discounts: ", e)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port = 5000)
