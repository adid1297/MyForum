import os
from datetime import datetime, timedelta
from hashlib import pbkdf2_hmac
from hmac import compare_digest

from flask import jsonify
from flask_jwt_extended import create_access_token, get_jti
from sqlalchemy.orm.exc import NoResultFound

from db import session
from models import User, UserSession


class UserNotFoundException(Exception):
    pass


class RepeatEmailException(Exception):
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
        try:
            user_with_email = cls.get_user_from_email(email)
            raise RepeatEmailException()
        except UserNotFoundException:
            pass

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

    @classmethod
    def get_user_from_id(cls, user_id):
        try:
            return session.query(User).filter_by(user_id=user_id).one()
        except NoResultFound:
            raise UserNotFoundException()


class UserSessionHandler:
    @staticmethod
    def create_user_session(user_id, jti):
        new_user_session = UserSession(user_id=user_id, jti=jti)
        session.add(new_user_session)
        session.commit()

        return new_user_session

    @classmethod
    def generate_session_jwt(cls, user_id):
        token = create_access_token(identity=user_id, expires_delta=False)
        user_session = cls.create_user_session(user_id, get_jti(token)) 

        return token

    @staticmethod
    def invalidate_active_sessions(user):
        for user_session in user.active_sessions:
            user_session.date_revoked = datetime.utcnow()

        session.commit()
