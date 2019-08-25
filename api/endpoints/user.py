from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from marshmallow import ValidationError

from db import session
from models import SomeTable
from handlers.user import (
    UserHandler, UserSessionHandler,
    UserNotFoundException,
    PasswordMismatchException
)
from schema.user import (
    NewUserInputSchema,
    UserSchema,
    UserLoginSchema
)


user_endpoints = Blueprint('user_endpoints', __name__)


@user_endpoints.route("/test", methods=['GET'])
def hello():
    first = session.query(SomeTable).first()
    return jsonify({"id": first.id, "val": first.val}), 200


@user_endpoints.route("/test", methods=['POST'])
def hello_2():
    x = SomeTable(val=14)
    session.add(x)
    session.commit()
    return jsonify({"id": x.id, "val": x.val}), 201


@user_endpoints.route("/testauth", methods=['GET'])
@jwt_required
def hello_3():
    person = get_jwt_identity()
    return jsonify({ "success": person }), 200


@user_endpoints.route("/register",  methods=['POST'])
def user_register():
    try:
        payload = NewUserInputSchema().load(request.json)
    except ValidationError as error:
        return error.messages, 422

    new_user = UserHandler.create_new_user(**payload)
    out = UserSchema().dump(new_user)
    return jsonify(out), 201


@user_endpoints.route("/login",  methods=['POST'])
def user_login():
    try:
        payload = UserLoginSchema().load(request.json)
        user = UserHandler.get_user_from_email(payload.get('email'))
        UserHandler.verify_password(
            password=payload.get('password'),
            stored_hash=user.password_hash,
            salt=user.password_salt
        )
    except ValidationError as error:
        return error.messages, 422
    except (UserNotFoundException, PasswordMismatchException) as e:
        return {"error": "Failed login attempt"}, 401

    UserSessionHandler.invalidate_active_sessions(user)
    token = UserSessionHandler.generate_session_jwt(user.user_id)

    return jsonify({"token": token}), 201


@user_endpoints.route("/",  methods=['GET'])
@jwt_required
def get_user_from_session():
    user_id = get_jwt_identity()
    return jsonify(user_id=user_id), 200
