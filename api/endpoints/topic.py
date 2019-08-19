from flask import Blueprint, request, jsonify

from db import session


topic_endpoints = Blueprint('topic_endpoints', __name__)


@topic_endpoints.route("/topics",  methods=['GET'])
def get_topics():
    pass


@topic_endpoints.route("/topic",  methods=['POST'])
def create_topic():
    pass


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
