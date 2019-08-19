from datetime import datetime
import uuid
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, DateTime, LargeBinary


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
    date_created = Column(
        DateTime,
        default=datetime.utcnow,
        nullable=False
    )
