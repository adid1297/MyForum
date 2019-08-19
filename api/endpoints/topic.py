from flask import Blueprint, request, jsonify
from marshmallow import ValidationError

from db import session
from handlers.user import UserSessionHandler, InvalidSessionException
from handlers.topic import TopicHandler
from schema.topic import AuthInputSchema, TopicInputSchema, TopicSchema


topic_endpoints = Blueprint('topic_endpoints', __name__)


@topic_endpoints.route("/topic",  methods=['POST'])
def create_topic():
    try:
        payload = TopicInputSchema().load(request.json)
        user_id = UserSessionHandler.validate_from_token(payload.get('token'))
    except ValidationError as error:
        return error.messages, 422
    except InvalidSessionException as error:
        return {"error": "Invalid session token"}, 403

    new_topic = TopicHandler.create_topic(
        user_id=user_id,
        subject=payload.get('subject'),
        description=payload.get('description')
    )
    out = TopicSchema().dump(new_topic)

    return jsonify(out), 201


@topic_endpoints.route("/topics",  methods=['GET'])
def get_topics():
    try:
        payload = AuthInputSchema().load(request.json)
        UserSessionHandler.validate_from_token(payload.get('token'))
    except ValidationError as error:
        return error.messages, 422

    count = request.args.get('count', 5)
    offset = request.args.get('offset', 0)
    topics = TopicHandler.get_topics_alphabetically(count=count, offset=offset)
    out = TopicSchema().dump(topics, many=True)

    return jsonify({"data": out}), 200


@topic_endpoints.route("/topic/<topic_id>",  methods=['PATCH'])
def update_topic(id):
    pass


@topic_endpoints.route("/topic/<topic_id>",  methods=['DELETE'])
def delete_topic():
    pass


@topic_endpoints.route("/topic/<topic_id>/messages",  methods=['GET'])
def get_topic_messages():
    pass


@topic_endpoints.route("/topic/<topic_id>/message",  methods=['POST'])
def create_topic_message():
    pass
