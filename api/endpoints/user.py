from flask import Blueprint

from db import session
from models import SomeTable


user_endpoints = Blueprint('user_endpoints', __name__)

@user_endpoints.route("/")
def hello():
    first = session.query(SomeTable).first()

    x = SomeTable(val=14)
    session.add(x)
    session.commit()

    html = (
        f"<h3>Fetched ID {x.id}!</h3>"
        f"<b>Val:</b> {x.val}<br/>"
    )

    return html
