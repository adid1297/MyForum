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

    active_sessions = relationship(
        'UserSession',
        lazy=True,
        primaryjoin=(
            "and_(UserSession.user_id==User.user_id,"
            "UserSession.date_removed==None)"
        )
    )


class UserSession(Base):
    __tablename__ = 'user_session'
    session_id = Column(String, primary_key=True, default=uuid.uuid4)
    user_id = Column(String, ForeignKey('forum_user.user_id'), primary_key=True)
    token = Column(String, nullable=False)
    date_created = Column(DateTime, default=datetime.utcnow, nullable=False)
    date_removed = Column(DateTime)

    def is_valid(self):
        if self.date_removed:
            return False
 
        payload = jwt.decode(
            self.token.encode('utf-8'),
            'secret',
            algorithm='HS256'
        )


        expiry_date = parse(payload.get('expires'))
        if expiry_date > datetime.utcnow():
            return True

        self.date_removed = datetime.utcnow()
        return False


class Topic(Base):
    __tablename__ = 'topic'
    topic_id = Column(String, primary_key=True, default=uuid.uuid4)
    topic_subject = Column(String, nullable=False)
    topic_description = Column(String, nullable=False)
    created_by = Column(String, ForeignKey('forum_user.user_id'))
    updated_by = Column(String, ForeignKey('forum_user.user_id'))
    date_created = Column(DateTime, default=datetime.utcnow, nullable=False)
    date_updated = Column(DateTime, default=datetime.utcnow, nullable=False)
    date_removed = Column(DateTime)

    messages = relationship('TopicMessage', backref='topic', lazy=True)


class TopicMessage(Base):
    __tablename__ = 'topic_message'
    topic_message_id = Column(String, primary_key=True, default=uuid.uuid4)
    topic_id = Column(String, ForeignKey('topic.topic_id'), primary_key=True)
    created_by = Column(String, ForeignKey('forum_user.user_id'))
    topic_message = Column(String, nullable=False)
    date_created = Column(DateTime, default=datetime.utcnow, nullable=False)
    date_removed = Column(DateTime)
