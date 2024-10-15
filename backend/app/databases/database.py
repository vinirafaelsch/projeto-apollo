import os
from pymongo import MongoClient

def get_database():
    mongo_uri = os.environ.get('MONGO_URI', 'mongodb://mongodb:27017/apollo-solutions')
    db_name = os.environ.get('DB_NAME', 'apollo-solutions')

    try:
        client = MongoClient(mongo_uri, serverSelectionTimeoutMS=5000)
        # Testar a conexão com bd
        client.server_info()
        print("Conexão com o MongoDB realizada com sucesso!")
        return client[db_name]
    except Exception as e:
        print(f"Falha na conexão com o MongoDB: {e}")
        raise e
