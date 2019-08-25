from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
import flask_sqlalchemy

from db import session
from models import UserSession
from endpoints import user_endpoints, topic_endpoints

app = Flask(__name__)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'why-is-a-raven-like-a-writing-desk'
app.config['JWT_BLACKLIST_ENABLED'] = True
app.config['JWT_BLACKLIST_TOKEN_CHECKS'] = ['access']
app.config['JWT_ERROR_MESSAGE_KEY'] = 'jwt_auth_error'

app.register_blueprint(user_endpoints, url_prefix='/user')
app.register_blueprint(topic_endpoints)
CORS(app, support_credentials=True, resources={r"/*": {"origins": "*"}})

jwt = JWTManager(app)
@jwt.token_in_blacklist_loader
def is_token_revoked(decrypted_token):
    jti = decrypted_token['jti']
    user_session = session.query(UserSession).filter_by(jti=jti).first()
    return user_session.date_revoked is not None

@app.teardown_appcontext
def cleanup(resp_or_exc):
    session.remove()

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True, port=5000)
