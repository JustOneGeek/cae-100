from . import bp as api
from app.models import Post
from flask import make_response, request, g, abort
from app.blueprints.auth.authy import token_auth

## Retrieve

# Return all the posts the user follows and his own posts
@api.get('/post')
@token_auth.login_required()
def get_posts():
    posts = g.current_user.followed_posts()
    posts = [post.to_dict() for post in posts]
    return make_response({"posts":posts},200)

# get a single post by id
@api.get('/post/<int:id>')
@token_auth.login_required()
def get_post(id):
    post = Post.query.get(id)
    if not post:
        abort(404)
    if not g.current_user.is_following(post.author) \
        and not post.author.id == g.current_user.id:
        abort(403)
    return make_response(post.to_dict(), 200)

# Create

# {
#     "body": STRING
# }

@api.post('/post')
@token_auth.login_required()
def post_post():
    # WE know the Id already its from the g.current_user
    # I needa body still!??!!?!
    posted_data = request.get_json()
    post = Post(user_id = g.current_user.id, body = posted_data["body"])
    post.save()
    return make_response('success', 200)

# {
#     "body": STRING
# }

# Edit a Post
@api.put('/post/<int:id>')
@token_auth.login_required()
def put_post(id):
    # post Id <-- Slug
    # new_body <-- from the payload
    put_data = request.get_json()
    post = Post.query.get(id)
    if not post:
        abort(404)
    # the user id of the editor  <-- from token auth
    # verify that the post being edited belogns to the person trying to edit it
    if g.current_user.id != post.author.id:
        abort(403)
    post.edit(put_data['body'])
    post.save()
    return make_response('success', 200)

# Delete a Post
@api.delete('/post/<int:id>')
@token_auth.login_required()
def delete_post(id):
    post = Post.query.get(id)
    if not post:
        abort(404)
    if post.author.id != g.current_user.id:
        abort(403)
    post.delete()
    # post Id <-- Slug
    # the user id of the editor  <-- from token auth
    return make_response('success', 200)