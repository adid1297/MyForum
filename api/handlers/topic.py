from datetime import datetime
from sqlalchemy.orm.exc import NoResultFound

from db import session
from models import User, UserSession, Topic, TopicMessage


class TopicNotFoundException(Exception):
    pass


class TopicHandler:
    @staticmethod
    def get_topic(topic_id):
        try:
            return session.query(Topic).filter_by(topic_id=topic_id).one()
        except NoResultFound:
            raise TopicNotFoundException()

    @staticmethod
    def get_topics_alphabetically(offset = 0, count = 5):
        return session.query(Topic).filter_by(
            date_removed=None
        ).order_by(
            Topic.topic_title
        ).offset(offset).limit(count).all()
        
    @classmethod
    def get_topic_messages(cls, topic_id):
        topic = cls.get_topic_messages(topic_id)

        return topic.topic_messages

    @classmethod
    def create_topic(cls, title, description, user_id):
        new_topic = Topic(
            created_by=user_id,
            topic_title=title,
            topic_description=description
        )

        session.add(new_topic)
        session.commit()

        return new_topic

    @classmethod
    def update_topic(cls, topic_id, updated_title, updated_desc):
        topic = cls.get_topic(topic_id)

        topic.topic_title = updated_title
        topic.topic_description = updated_desc
        topic.date_updated = datetime.utcnow()

        return topic

    @classmethod
    def delete_topic(cls, topic_id):
        topic = cls.get_topic(topic_id)

        topic.date_removed = datetime.utcnow()

        return topic

    @classmethod
    def create_topic_message(cls, topic_id, user_id, topic_message):
        topic = cls.get_topic(topic_id)

        new_topic_message = TopicMessage(
            created_by=user_id,
            topic_message=topic_message,
        )

        topic.messages.append(new_topic_message)

        return new_topic_message
