from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from marshmallow import ValidationError

from db import session
from handlers.user import UserSessionHandler
from handlers.topic import (
    TopicHandler,
    UnauthorizedTopicEditException,
    TopicNotFoundException,
)
from schema.topic import (
    TopicInputSchema,
    TopicSchema,
    TopicMessageInputSchema,
    TopicMessageSchema,
)


topic_endpoints = Blueprint('topic_endpoints', __name__)


@topic_endpoints.route("/topic",  methods=['POST'])
@jwt_required
def create_topic():
    try:
        payload = TopicInputSchema().load(request.json)
    except ValidationError as error:
        return error.messages, 422

    user_id = get_jwt_identity()
    new_topic = TopicHandler.create_topic(
        user_id=user_id,
        subject=payload.get('subject'),
        description=payload.get('description')
    )
    out = TopicSchema().dump(new_topic)

    return jsonify(out), 201


@topic_endpoints.route("/topics",  methods=['GET'])
@jwt_required
def get_topics():
    user_id = get_jwt_identity()
    count = request.args.get('count')
    offset = request.args.get('offset')
    topics = TopicHandler.get_topics_alphabetically(count=count, offset=offset)
    out = TopicSchema().dump(topics, many=True)

    return jsonify({"data": out}), 200


@topic_endpoints.route("/topic/<topic_id>",  methods=['GET'])
@jwt_required
def get_topic(topic_id):
    user_id = get_jwt_identity()

    try:
        topic = TopicHandler.get_topic(topic_id)
    except TopicNotFoundException:
        return {"error": f"Topic #{topic_id} not found"}, 404

    out = TopicSchema().dump(topic)
    return jsonify(out), 200


@topic_endpoints.route("/topic/<topic_id>",  methods=['PATCH'])
@jwt_required
def update_topic(topic_id):
    try:
        payload = TopicInputSchema().load(request.json)
        user_id = get_jwt_identity()
        topic = TopicHandler.update_topic(
            topic_id=topic_id,
            user_id=user_id,
            updated_subject=payload.get('subject'),
            updated_desc=payload.get('description'),
        )
    except ValidationError as error:
        return error.messages, 422
    except UnauthorizedTopicEditException:
        return jsonify(error="Insufficient permissions for current action"), 403
    except TopicNotFoundException:
        return {"error": f"Topic #{topic_id} not found"}, 404

    out = TopicSchema().dump(topic)

    return jsonify(out), 201


@topic_endpoints.route("/topic/<topic_id>",  methods=['DELETE'])
@jwt_required
def delete_topic(topic_id):
    try:
        user_id = get_jwt_identity()
        topic = TopicHandler.delete_topic(topic_id=topic_id, user_id=user_id)
    except UnauthorizedTopicEditException:
        return jsonify(error="Insufficient permissions for current action"), 403
    except TopicNotFoundException:
        return jsonify(error=f"Topic #{topic_id} not found"), 404

    return jsonify(message=f"Deleted topic #{topic.topic_id}"), 201


@topic_endpoints.route("/topic/<topic_id>/message",  methods=['POST'])
@jwt_required
def create_topic_message(topic_id):
    try:
        payload = TopicMessageInputSchema().load(request.json)
        user_id = get_jwt_identity()
        new_topic_message = TopicHandler.create_topic_message(
            topic_id=topic_id,
            user_id=user_id,
            topic_message=payload.get('message'),
        )
    except ValidationError as error:
        return jsonify(error.messages), 422
    except UnauthorizedTopicEditException:
        return jsonify(error="Insufficient permissions for current action"), 403
    except TopicNotFoundException:
        return jsonify(error=f"Topic #{topic_id} not found"), 404

    out = TopicMessageSchema().dump(new_topic_message)

    return jsonify(out), 201

@topic_endpoints.route("/topic/<topic_id>/messages",  methods=['GET'])
@jwt_required
def get_topic_messages(topic_id):
    user_id = get_jwt_identity()
    count = request.args.get('count', 5)
    offset = request.args.get('offset', 0)

    try:
        messages = TopicHandler.get_topic_messages(topic_id, count, offset)
    except TopicNotFoundException:
        return jsonify(error=f"Topic #{topic_id} not found"), 404

    out = TopicMessageSchema().dump(messages, many=True)

    return jsonify({"data": out}), 200
