from flask import Blueprint, request, jsonify
from marshmallow import ValidationError

from db import session
from handlers.user import UserSessionHandler, InvalidSessionException
from handlers.topic import (
    TopicHandler,
    UnauthorizedTopicEditException,
    TopicNotFoundException,
)
from schema.topic import (
    AuthInputSchema,
    TopicInputSchema,
    TopicSchema,
    TopicMessageInputSchema,
    TopicMessageSchema,
)


topic_endpoints = Blueprint('topic_endpoints', __name__)


@topic_endpoints.route("/topic",  methods=['POST'])
def create_topic():
    try:
        payload = TopicInputSchema().load(request.json)
        user_id = UserSessionHandler.validate_from_token(payload.get('token'))
    except ValidationError as error:
        return error.messages, 422
    except InvalidSessionException:
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
        user_id = UserSessionHandler.validate_from_token(payload.get('token'))
    except ValidationError as error:
        return error.messages, 422
    except InvalidSessionException:
        return {"error": "Invalid session token"}, 403

    count = request.args.get('count', 5)
    offset = request.args.get('offset', 0)
    topics = TopicHandler.get_topics_alphabetically(count=count, offset=offset)
    out = TopicSchema().dump(topics, many=True)

    return jsonify({"data": out}), 200


@topic_endpoints.route("/topic/<topic_id>",  methods=['PATCH'])
def update_topic(topic_id):
    try:
        payload = TopicInputSchema().load(request.json)
        user_id = UserSessionHandler.validate_from_token(payload.get('token'))
        topic = TopicHandler.update_topic(
            topic_id=topic_id,
            user_id=user_id,
            updated_subject=payload.get('subject'),
            updated_desc=payload.get('description'),
        )
    except ValidationError as error:
        return error.messages, 422
    except (InvalidSessionException, UnauthorizedTopicEditException) as error:
        return {"error": "Invalid session token"}, 403
    except TopicNotFoundException:
        return {"error": f"Topic #{topic_id} not found"}, 404

    out = TopicSchema().dump(topic)

    return jsonify(out), 201


@topic_endpoints.route("/topic/<topic_id>",  methods=['DELETE'])
def delete_topic(topic_id):
    try:
        payload = AuthInputSchema().load(request.json)
        user_id = UserSessionHandler.validate_from_token(payload.get('token'))
        topic = TopicHandler.delete_topic(topic_id=topic_id, user_id=user_id)
    except ValidationError as error:
        return error.messages, 422
    except (InvalidSessionException, UnauthorizedTopicEditException) as error:
        return {"error": "Invalid session token"}, 403
    except TopicNotFoundException:
        return {"error": f"Topic #{topic_id} not found"}, 404

    return {"message": f"Deleted topic #{topic.topic_id}"}, 201


@topic_endpoints.route("/topic/<topic_id>/message",  methods=['POST'])
def create_topic_message(topic_id):
    try:
        payload = TopicMessageInputSchema().load(request.json)
        user_id = UserSessionHandler.validate_from_token(payload.get('token'))
        new_topic_message = TopicHandler.create_topic_message(
            topic_id=topic_id,
            user_id=user_id,
            topic_message=payload.get('message'),
        )
    except ValidationError as error:
        return error.messages, 422
    except (InvalidSessionException, UnauthorizedTopicEditException) as error:
        return {"error": "Invalid session token"}, 403
    except TopicNotFoundException:
        return {"error": f"Topic #{topic_id} not found"}, 404

    out = TopicMessageSchema().dump(new_topic_message)

    return jsonify(out), 201

@topic_endpoints.route("/topic/<topic_id>/messages",  methods=['GET'])
def get_topic_messages(topic_id):
    try:
        payload = AuthInputSchema().load(request.json)
        user_id = UserSessionHandler.validate_from_token(payload.get('token'))

        count = request.args.get('count', 5)
        offset = request.args.get('offset', 0)
        messages = TopicHandler.get_topic_messages(topic_id, count, offset)
    except ValidationError as error:
        return error.messages, 422
    except InvalidSessionException:
        return {"error": "Invalid session token"}, 403
    except TopicNotFoundException:
        return {"error": f"Topic #{topic_id} not found"}, 404

    out = TopicMessageSchema().dump(messages, many=True)

    return jsonify({"data": out}), 200
