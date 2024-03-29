from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker

engine = create_engine("postgresql://dbuser:dbpass@db/dbmain")
session = scoped_session(sessionmaker(bind=engine))
