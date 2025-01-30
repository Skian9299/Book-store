# Standard library imports

# Remote library imports
from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from flask_bcrypt import Bcrypt # type: ignore


# Local imports

# Instantiate app, set attributes
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'  
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

# Define metadata, instantiate db
metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})
db = SQLAlchemy(metadata=metadata)
db.init_app(app)

# Set up Flask-Migrate
migrate = Migrate(app, db)

# Instantiate REST API
api = Api(app)

# Initialize bcrypt
bcrypt = Bcrypt(app)

# Instantiate CORS
CORS(app, origins="http://localhost:3000")

# Import models after db initialization
from models import User, Book, Order, Order, Review  

if __name__ == "__main__":
    app.run(debug=True)
