from flask import Blueprint, jsonify, request

from ..models.products import Products
from ..repositories.product_repository import ProductRepository

bp = Blueprint('main', __name__)

@bp.route('/products', methods=['GET'])
def get_products():
    # parametros query
    name = request.args.get('name')
    category = request.args.get('category')
    sort_by = request.args.get('sort_by', 'name')
    sort_order = request.args.get('sort_order', 'asc')

    # dicionário de filtros
    query = {}
    if name:
        query['name'] = {'$regex': name, '$options': 'i'}
    if category:
        query['category'] = category

    products = ProductRepository.find(query=query, sort_by=sort_by, sort_order=sort_order)

    data = [product.dict() for product in products]
    return jsonify(data), 200


@bp.route('/products', methods=['POST'])
def add_product():
    data = request.get_json()
    try:
        product = Products(**data)

        ProductRepository.insert_product(product)
        return jsonify(product.model_dump()), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400


@bp.route('/products/<string:product_id>', methods=['DELETE'])
def delete_product(product_id):
    try:
        print(product_id)
        product_deleted = ProductRepository.delete_product(product_id)
        
        if product_deleted:
            return jsonify({'message': 'Produto deletado com sucesso!'}), 200
        return jsonify({'error': 'Produto não encontrado.'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 400
    