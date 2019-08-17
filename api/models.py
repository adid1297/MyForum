import flask_sqlalchemy

db = flask_sqlalchemy.SQLAlchemy()

class SomeTable(db.Model):
    __tablename__ = 'sometable'
    id = db.Column(db.Integer, primary_key=True)
    val = db.Column(db.Integer)
