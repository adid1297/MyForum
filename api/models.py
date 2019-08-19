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
        nullable=False,
        default=uuid.uuid4
    )
    user_name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    password_salt = Column(LargeBinary, nullable=False)
    password_hash = Column(LargeBinary, nullable=False)
    date_removed = Column(DateTime)
    date_updated = Column(DateTime, default=datetime.utcnow)
    date_created = Column(
        DateTime,
        default=datetime.utcnow,
        nullable=False
    )

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
    session_id = Column(
        String,
        primary_key=True,
        default=uuid.uuid4
    )
    user_id = Column(
        String,
        ForeignKey('forum_user.user_id'),
        primary_key=True,
    )
    token = Column(LargeBinary, nullable=False)
    date_removed = Column(DateTime)
    date_created = Column(
        DateTime,
        default=datetime.utcnow,
        nullable=False
    )

    def is_valid(self):
        if self.date_removed:
            return False
 
        payload = jwt.decode(self.token, 'secret', algorithm='HS256')
        expiry_date = parse(payload.get('expires'))
        if expiry_date > datetime.utcnow():
            return True

        self.date_removed = datetime.utcnow()
        return False
