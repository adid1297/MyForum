from datetime import datetime
from sqlalchemy.orm.exc import NoResultFound
from sqlalchemy.exc import DataError

from db import session
from models import User, UserSession, Topic, TopicMessage


class TopicNotFoundException(Exception):
    pass


class UnauthorizedTopicEditException(Exception):
    pass


class TopicHandler:
    @staticmethod
    def get_topic(topic_id):
        try:
            return session.query(Topic).filter_by(topic_id=topic_id).one()
        except (NoResultFound, DataError):
            raise TopicNotFoundException()

    @classmethod
    def create_topic(cls, user_id, subject, description):
        new_topic = Topic(
            created_by=user_id,
            updated_by=user_id,
            topic_subject=subject,
            topic_description=description
        )

        session.add(new_topic)
        session.commit()

        return new_topic

    @staticmethod
    def get_topics_alphabetically(count, offset):
        query = session.query(Topic).filter_by(
            date_removed=None
        ).order_by(
            Topic.topic_subject
        )
        
        if offset:
            query = query.offset(offset)
            
        if count:
            query = query.limit(count)
            
        return query.all()
        
    @classmethod
    def get_topic_messages(cls, topic_id, count, offset):
        topic = cls.get_topic(topic_id)

        query = session.query(TopicMessage).filter_by(
            date_removed=None,
            topic_id=topic.topic_id
        ).order_by(
            TopicMessage.date_created
        )

        if offset:
            query = query.offset(offset)
            
        if count:
            query = query.limit(count)
            
        return query.all()

    @classmethod
    def update_topic(cls, topic_id, user_id, updated_subject, updated_desc):
        topic = cls.get_topic(topic_id)
        
        if str(topic.created_by) != user_id:
            raise UnauthorizedTopicEditException()

        topic.topic_subject = updated_subject
        topic.topic_description = updated_desc
        topic.date_updated = datetime.utcnow()
        topic.updated_by = user_id
        session.commit()

        return topic

    @classmethod
    def delete_topic(cls, topic_id, user_id):
        topic = cls.get_topic(topic_id)

        if str(topic.created_by) != user_id:
            raise UnauthorizedTopicEditException()

        topic.date_removed = datetime.utcnow()
        session.commit()

        return topic

    @classmethod
    def create_topic_message(cls, topic_id, user_id, topic_message):
        topic = cls.get_topic(topic_id)

        new_topic_message = TopicMessage(
            created_by=user_id,
            updated_by=user_id,
            topic_message=topic_message,
        )

        topic.messages.append(new_topic_message)
        session.commit()

        return new_topic_message
