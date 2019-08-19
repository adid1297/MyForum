import os
from datetime import datetime, timedelta
from hashlib import pbkdf2_hmac
from hmac import compare_digest

import jwt
from flask import jsonify
from sqlalchemy.orm.exc import NoResultFound

from db import session
from models import User, UserSession


class UserNotFoundException(Exception):
    pass


class PasswordMismatchException(Exception):
    pass


class UserHandler:
    @staticmethod
    def generate_password_salt():
        return os.urandom(16)

    @staticmethod
    def generate_password_hash(password, salt):
        return pbkdf2_hmac('sha256', password.encode(), salt, 100000)

    @staticmethod
    def verify_password(password, stored_hash, salt):
        pw_hash = pbkdf2_hmac('sha256', password.encode(), salt, 100000)
        if compare_digest(stored_hash, pw_hash):
            return True

        raise PasswordMismatchException()

    @classmethod
    def create_new_user(cls, name, email, password):
        salt = cls.generate_password_salt()

        new_user = User(
            user_name=name,
            email=email,
            password_salt=salt,
            password_hash=cls.generate_password_hash(password, salt),
        )

        session.add(new_user)
        session.commit()

        return new_user

    @classmethod
    def get_user_from_email(cls, email):
        try:
            return session.query(User).filter_by(email=email).one()
        except NoResultFound:
            raise UserNotFoundException()


class UserSessionHandler:
    @staticmethod
    def generate_token_payload(user_id):
        return {
            'user_id': str(user_id),
            'expires': str(datetime.utcnow() + timedelta(days=1))
        }

    @staticmethod
    def create_user_session(user_id, token):
        new_user_session = UserSession(user_id=user_id, token=token)
        session.add(new_user_session)
        session.commit()
        return new_user_session

    @classmethod
    def generate_session_jwt(cls, user_id):
        payload = cls.generate_token_payload(user_id)
        token = jwt.encode(payload, 'secret', algorithm='HS256')
        print(token)
        cls.create_user_session(user_id, token)
        return token.decode('utf-8')

    @staticmethod
    def invalidate_active_sessions(active_sessions):
        for user_session in active_sessions:
            user_session.date_removed = datetime.utcnow()
