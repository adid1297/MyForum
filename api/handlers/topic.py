from datetime import datetime
from sqlalchemy.orm.exc import NoResultFound

from db import session
from models import User, UserSession, Topic, TopicInfo, TopicMessage


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
        return session.query(Topic).outerjoin(TopicInfo).filter_by(
            Topic.date_removed == None,
            TopicInfo.date_removed == None,
        ).offset(offset).limit(count).all()
        
    @classmethod
    def get_topic_messages(cls, topic_id):
        topic = cls.get_topic_messages(topic_id)
        return topic.topic_messages

    @staticmethod
    def create_topic_info(topic_id, title, description):
        new_topic_info = TopicInfo(
            topic_id=topic_id,
            topic_title=title,
            topic_description=description
        )
        session.add(new_topic)
        session.commit()

        return new_topic_info

    @classmethod
    def create_topic(cls, title, description, user_id):
        new_topic = Topic(created_by=user_id)
        session.add(new_topic)
        session.commit()

        cls.create_topic_info(new_topic.topic_id, title, description)

        return new_topic
    
    @staticmethod
    def create_topic_message(topic_id, message, user_id):
        new_message = TopicMessage(
            topic_id=topic_id,
            topic_message=message,
            created_by=user_id
        )

        session.add(new_message)
        session.commit()

        return new_message

    @classmethod
    def update_topic(cls, topic_id, updated_title, updated_desc):
        topic = cls.get_topic(topic_id)
        topic.latest_topic_info.date_removed = datetime.utcnow()
        cls.create_topic_info(topic_id, updated_title, updated_desc)

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
            topic_message=topic_message
        )
        topic.topic_messages.append(new_topic_message)

        return new_topic_message
