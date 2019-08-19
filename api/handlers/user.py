import os
from hashlib import pbkdf2_hmac
from hmac import compare_digest

from db import session
from models import User

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
        return compare_digest(stored_hash, pw_hash)

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
