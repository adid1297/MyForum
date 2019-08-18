from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String


Base = declarative_base()

class SomeTable(Base):
    __tablename__ = 'sometable'
    id = Column(Integer, primary_key=True)
    val = Column(Integer)
