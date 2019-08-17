from flask import Flask
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from models import SomeTable


app = Flask(__name__)
engine = create_engine("postgresql://postgres@db/postgres")
session = sessionmaker(bind=engine)()

@app.route("/")
def hello():
    first = session.query(SomeTable).first()

    html = (
        f"<h3>Fetched ID {first.id}!</h3>"
        f"<b>Val:</b> {first.val}<br/>"
    )
    return html

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
