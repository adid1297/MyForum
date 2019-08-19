import uuid
from datetime import datetime
from dateutil.parser import parse

import jwt
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy import (
    Column, Integer, String, DateTime, LargeBinary,
    ForeignKey
)

Base = declarative_base()


class SomeTable(Base):
    __tablename__ = 'sometable'
    id = Column(Integer, primary_key=True)
    val = Column(Integer)


class User(Base):
    __tablename__ = 'forum_user'
    user_id = Column(
        String,
        primary_key=True,
        default=uuid.uuid4
    )
    user_name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    password_salt = Column(LargeBinary, nullable=False)
    password_hash = Column(LargeBinary, nullable=False)
    date_created = Column(DateTime, default=datetime.utcnow, nullable=False)
    date_updated = Column(DateTime, default=datetime.utcnow)
    date_removed = Column(DateTime)

    sessions = relationship('UserSession', backref='user', lazy=True)
    active_sessions = relationship(
        'UserSession',
        primaryjoin=(
            "and_(UserSession.user_id==User.user_id,"
            "UserSession.date_removed==None)"
        )
    )


class UserSession(Base):
    __tablename__ = 'user_session'
    session_id = Column(String, primary_key=True, default=uuid.uuid4)
    user_id = Column(String, ForeignKey('forum_user.user_id'), primary_key=True)
    token = Column(LargeBinary, nullable=False)
    date_created = Column(DateTime, default=datetime.utcnow, nullable=False)
    date_removed = Column(DateTime)

    def is_valid(self):
        if self.date_removed:
            return False
 
        payload = jwt.decode(self.token, 'secret', algorithm='HS256')
        expiry_date = parse(payload.get('expires'))
        if expiry_date > datetime.utcnow():
            return True

        self.date_removed = datetime.utcnow()
        return False


class Topic(Base):
    __tablename__ = 'topic'
    topic_id = Column(String, primary_key=True, default=uuid.uuid4)
    created_by = Column(String, ForeignKey('forum_user.user_id'))
    date_created = Column(DateTime, default=datetime.utcnow, nullable=False)
    date_removed = Column(DateTime)

    topic_messages = relationship('TopicMessage', backref='topic', lazy=True)
    latest_topic_info = relationship(
        'TopicInfo',
        backref='topic',
        uselist=False,
        lazy=True,
        order_by="TopicInfo.date_created",
        primaryjoin=(
            "and_(Topic.topic_id==TopicInfo.topic_id,"
            "TopicInfo.date_removed==None)"
        )
    )


class TopicInfo(Base):
    __tablename__ = 'topic_info'
    topic_info_id = Column(String, primary_key=True, default=uuid.uuid4)
    topic_id = Column(String, ForeignKey('topic.topic_id'), primary_key=True)
    topic_title = Column(String, nullable=False)
    topic_description = Column(String, nullable=False)
    date_created = Column(DateTime, default=datetime.utcnow, nullable=False)
    date_removed = Column(DateTime)


class TopicMessage(Base):
    __tablename__ = 'topic_message'
    topic_message_id = Column(String, primary_key=True, default=uuid.uuid4)
    topic_id = Column(String, ForeignKey('topic.topic_id'), primary_key=True)
    created_by = Column(String, ForeignKey('forum_user.user_id'))
    topic_message = Column(String, nullable=False)
    date_created = Column(DateTime, default=datetime.utcnow, nullable=False)
    date_removed = Column(DateTime)
