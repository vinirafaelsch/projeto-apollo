from .database import get_database

def initialize_discounts_database():
    db = get_database()
    collections = db.list_collection_names()
    
    if 'discounts' not in collections:
        db.create_collection('discounts')
        # Dados iniciais de desconto
        db.discounts.insert_many([
            { 'category': 'Smartphones', 'discount': 0.9745 },
            { 'category': 'Móveis', 'discount': 0.97 },
            { 'category': 'Eletrônicos', 'discount': 0.957 },
            { 'category': 'Eletroportáteis', 'discount': 0.95 },
            { 'category': 'Geladeiras', 'discount': 0.925 }
        ])
