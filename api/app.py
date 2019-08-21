from flask import Flask
from flask_cors import CORS, cross_origin
import flask_sqlalchemy

from db import session
from endpoints import user_endpoints, topic_endpoints

app = Flask(__name__)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.register_blueprint(user_endpoints, url_prefix='/user')
app.register_blueprint(topic_endpoints)
CORS(app, support_credentials=True, resources={r"/*": {"origins": "*"}})

@app.teardown_appcontext
def cleanup(resp_or_exc):
    session.remove()

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True, port=5000)
