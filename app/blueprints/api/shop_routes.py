from . import bp as api
from app.blueprints.auth.authy import token_auth
from flask import make_response, g, abort, request
from app.models import Item, Category
from helpers import require_admin


############
##
##  CATEGORY API ROUTES
##
############

# Get All the Cats
@api.get('/category')
def get_category():
    cats = Category.query.all()
    cats_dicts= [cat.to_dict() for cat in cats]
    return make_response({"categories":cats_dicts},200)

# {
#     "name":STRING
# }

# Create a Cat
@api.post('/category')
@token_auth.login_required()
@require_admin
def post_category():
    cat_name=request.get_json().get('name')
    if not cat_name:
        abort(406)
    cat = Category(name = cat_name)
    cat.save()
    return make_response(f"success {cat.id} created" ,200)

# {
#     "name":STRING
# }

# Edit a cat
@api.put('/category/<int:id>')
@token_auth.login_required()
@require_admin
def put_category(id):
    cat_name=request.get_json().get('name')
    cat = Category.query.get(id)
    if not cat:
        abort(404)
    cat.name = cat_name
    cat.save()
    return make_response(f"success {cat.id} edited" ,200)


# Delete a category
@api.delete('/category/<int:id>')
@token_auth.login_required()
@require_admin
def delete_category(id):
    cat = Category.query.get(id)
    if not cat:
        abort(404)
    cat.delete()
    return make_response(f"success {id} deleted" ,200)


############
##
##  ITEM API ROUTES
##
############

# Get All items in the shop
@api.get('/item')
def get_items():
    items = Item.query.all()
    item_dicts = [item.to_dict() for item in items]
    return make_response({"items":item_dicts},200)

# Get an item by its id
@api.get('/item/<int:id>')
def get_item(id):
    item = Item.query.get(id)
    # Item.query.filter(Item.id==id).first()
    # Item.query.filter_by(id=id).first()
    if not item:
        abort(404)
    return make_response(item.to_dict(), 200)

# Get all items in a Category by the cat_id
@api.get('/item/category/<int:id>')
def get_items_by_cat(id):
    cat = Category.query.get(id)
    if not cat:
        abort(404)
    all_items_in_cat = [item.to_dict() for item in cat.products]    
    return make_response({"items":all_items_in_cat}, 200)

# {
#     name:STRING
#     desc:STRING
#     price:FLOAT
#     img:STRING
#     category_id:INTe:STRING
#     desc:STRING
#     price:FLOAT
#     img
# }

# Create an Item
@api.post('/item')
@token_auth.login_required()
@require_admin
def post_item():
    # get the payload
    item_dict = request.get_json()
    # Ensure the payload has all the appro. values
    if not all(key in item_dict for key in ('name', 'desc','price', 'img', 'category_id')):
        abort(406)
    item = Item()
    item.from_dict(item_dict)
    item.save()
    return make_response(f"{item.name} was created", 200)

# Edit an Item
#payload will be a dictionary with any number of the following keys:
# {name: STring
# desc:string
# price:float
# img:string
# category_id:int}

@api.put('/item/<int:id>')
@token_auth.login_required()
@require_admin
def put_item(id):
    item = Item.query.get(id)
    if not item:
        abort(404)
    item_dict = request.get_json()
    if not any(key in item_dict for key in ('name', 'desc','price', 'img', 'category_id')):
        abort(406)
    item.from_dict(item_dict)
    item.save()
    return make_response(f"{item.name} was updated", 200)

# Delete an Item
@api.delete('/item/<int:id>')
@token_auth.login_required()
@require_admin
def delete_item(id):
    item_to_delete = Item.query.get(id)
    if not item_to_delete:
        abort(404)
    item_to_delete.delete()
    return make_response(f"{id} was deleted", 200)

