from typing import List
from pymongo.collection import Collection

from ..models.products import Products
from ..databases.database import get_database

db = get_database()
products_collection: Collection = db['products']
discounts: Collection = db['discounts']

class ProductRepository:
    def insert_product(product: Products) -> str:
        # busca o desconto da categoria do produto
        discount_product = discounts.find_one({ 'category': product.category })
        
        if discount_product:
            discount_product = discount_product['discount']
        else: 
            discount_product = 1
        
        # aplica desconto
        product.promotional_price = round(product.price * discount_product, 2)

        result = products_collection.insert_one(product.model_dump())
        return str(result.inserted_id)
    
    def find(query: dict = None, sort_by: str = 'name', sort_order: str = 'asc') -> List[Products]:
        if query is None:
            query = {}

        # ordenação dos produtos
        sort_direction = 1 if sort_order == 'asc' else -1
        cursor = products_collection.find(query).sort(sort_by, sort_direction)

        return [Products(**item) for item in cursor]
    
    def delete_product(product_id: str) -> bool:
        result = products_collection.delete_one({ 'id': product_id })
        
        if result.deleted_count == 1:
            return True
        
        return False
