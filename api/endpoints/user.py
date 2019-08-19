from flask import Blueprint, request, jsonify
from marshmallow import ValidationError

from db import session
from models import SomeTable
from handlers.user import UserHandler
from schema.user import NewUserInputSchema, UserSchema


user_endpoints = Blueprint('user_endpoints', __name__)

@user_endpoints.route("/test")
def hello():
    first = session.query(SomeTable).first()

    # x = SomeTable(val=14)
    # session.add(x)
    # session.commit()

    # html = (
    #     f"<h3>Fetched ID {x.id}!</h3>"
    #     f"<b>Val:</b> {x.val}<br/>"
    # )

    return jsonify({"id": first.id, "val": first.val}), 200


@user_endpoints.route("/register",  methods=['POST'])
def user_register():
    try:
        payload = NewUserInputSchema().load(request.json)
    except ValidationError as error:
        return error.messages, 422

    new_user = UserHandler.create_new_user(**payload)
    out = UserSchema().dump(new_user)
    return jsonify(out), 201
