from . import bp as api
from flask import make_response

@api.get('/string')
def string():
    return make_response("This is a string", 200)

@api.get('/list')
def list():
    return make_response([1,2,3,4,5], 200)

@api.get('/dictionary')
def dictionary():
    return make_response({"a":[1,2,3,4,5], "b":123, "c":55.5}, 200)