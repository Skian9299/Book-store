#!/usr/bin/env python3

# Remote library imports
from blinker import Signal
from flask import Flask, jsonify, request, make_response
from flask_restful import Api, Resource
from config import app, db
from models import User, Book, Order, Review
from datetime import datetime
from werkzeug.security import check_password_hash
from flask_jwt_extended import create_access_token # type: ignore

# Initialize Flask-RESTful API
api = Api(app)


# BOOK RESOURCE (Full CRUD)
class Books(Resource):
    def get(self):
        genre = request.args.get('genre')  # Get the genre from query params
        if genre:
            books = [book.to_dict() for book in Book.query.filter_by(genre=genre).all()]
        else:
            books = [book.to_dict() for book in Book.query.all()]
        return make_response(books, 200)

        
    def post(self):
        # Get the JSON data from the request
        data = request.get_json()

        # Return an error if no data is provided
        if not data:
            return make_response({"error": "No data provided"}, 400)

        # Validate that all required fields are in the data
        required_fields = ['title', 'genre', 'published_date', 'price', 'image_url']
        for field in required_fields:
            if field not in data or not data[field]:
                return make_response({"error": f"Missing field: {field}"}, 400)

        # Try to convert the published_date to a datetime object
        try:
            published_date = datetime.strptime(data['published_date'], '%Y-%m-%d')
        except ValueError:
            return make_response({"error": "Invalid date format. Use YYYY-MM-DD"}, 400)

        # Create a new Book instance and add it to the database
        new_book = Book(
            title=data['title'],
            genre=data['genre'],
            published_date=published_date,
            price=float(data['price']),
            image_url=data['image_url']  # Added image_url field
        )

        db.session.add(new_book)
        db.session.commit()

        # Return the newly created book as a dictionary with a 201 status code
        return make_response(new_book.to_dict(), 201)

# Adding the resource to the API with the route '/books'
api.add_resource(Books, '/books')

class BookByID(Resource):
    def get(self, id):
        book = Book.query.filter_by(id=id).first()
        if not book:
            return make_response({"message": "Book not found"}, 404)
        return make_response(book.to_dict(), 200)

    def delete(self, id):
        book = Book.query.filter_by(id=id).first()
        if not book:
            return make_response({"message": "Book not found"}, 404)
        db.session.delete(book)
        db.session.commit()
        return make_response({"message": "Book deleted"}, 200)

api.add_resource(BookByID, '/books/<int:id>')

# USER RESOURCE (Create & Read)
class Users(Resource):
    def get(self):
        users = [user.to_dict() for user in User.query.all()]
        return make_response(users, 200)

    def post(self):
        new_user = User(
            name=request.form.get('name'),
            email=request.form.get('email'),
            password=request.form.get('password')
        )
        db.session.add(new_user)
        db.session.commit()
        return make_response(new_user.to_dict(), 201)

api.add_resource(Users, '/users')

class UserByID(Resource):
    def get(self, id):
        user = User.query.filter_by(id=id).first()
        if not user:
            return make_response({"message": "User not found"}, 404)
        return make_response(user.to_dict(), 200)

api.add_resource(UserByID, '/users/<int:id>')


# ORDER RESOURCE (Create & Read)
class Orders(Resource):
    def get(self):
        orders = [order.to_dict() for order in Order.query.all()]
        return make_response(orders, 200)

    def post(self):
        new_order = Order(
            user_id=request.form.get('user_id'),
            total_price=float(request.form.get('total_price'))
        )
        db.session.add(new_order)
        db.session.commit()
        return make_response(new_order.to_dict(), 201)

api.add_resource(Orders, '/orders')

class OrderByID(Resource):
    def get(self, id):
        order = Order.query.filter_by(id=id).first()
        if not order:
            return make_response({"message": "Order not found"}, 404)
        return make_response(order.to_dict(), 200)

api.add_resource(OrderByID, '/orders/<int:id>')


# REVIEW RESOURCE (Create & Read)
class Reviews(Resource):
    def get(self):
        reviews = [review.to_dict() for review in Review.query.all()]
        return make_response(reviews, 200)

    def post(self):
        new_review = Review(
            user_id=request.form.get('user_id'),
            book_id=request.form.get('book_id'),
            rating=int(request.form.get('rating')),
            comment=request.form.get('comment')
        )
        db.session.add(new_review)
        db.session.commit()
        return make_response(new_review.to_dict(), 201)

api.add_resource(Reviews, '/reviews')

class ReviewByID(Resource):
    def get(self, id):
        review = Review.query.filter_by(id=id).first()
        if not review:
            return make_response({"message": "Review not found"}, 404)
        return make_response(review.to_dict(), 200)

api.add_resource(ReviewByID, '/reviews/<int:id>')

# Route for User Signup
@app.route("/signup", methods=["POST"])
def register():
    data = request.get_json()
    if not data:
        return jsonify({"message": "No input data provided"}), 400

    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    if not name or not email or not password:
        return jsonify({"message": "Name, email, and password are required"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"message": "User already exists"}), 400

    try:
        new_user = User(name=name, email=email)
        new_user.set_password(password)  # Hash password before saving
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"message": "User registered successfully"}), 201
    except IntegrityError:
        db.session.rollback()
        return jsonify({"message": "User already exists"}), 400
    except Exception as e:
        return jsonify({"message": f"Error: {str(e)}"}), 500
    # **User Login**
class Login(Resource):
    def post(self):
        data = request.get_json()
        if not data:
            return {"message": "No input data provided"}, 400

        email = data.get("email")
        password = data.get("password")

        if not email or not password:
            return {"message": "Email and password are required"}, 400

        user = User.query.filter_by(email=email).first()
        if user and user.check_password(password):  # Ensure the password is correct
            access_token = create_access_token(identity=user.id)
            return {"access_token": access_token}, 200

        return {"message": "Invalid email or password"}, 401
    

# # Routes for Cart Resource
# @app.route("/cart", methods=["GET"])
# def get_cart():
#     cart_items = CartItem.query.all()
#     return jsonify([item.to_dict() for item in cart_items]), 200

# @app.route("/cart", methods=["POST"])
# def add_to_cart():
#     data = request.get_json()
#     title = data.get("title")
#     price = data.get("price")
#     quantity = data.get("quantity", 1)

#     if not title or not price:
#         return jsonify({"message": "Title and price are required"}), 400

#     existing_item = CartItem.query.filter_by(title=title).first()
#     if existing_item:
#         existing_item.quantity += quantity
#     else:
#         new_item = CartItem(title=title, price=price, quantity=quantity)
#         db.session.add(new_item)

#     db.session.commit()
#     return jsonify({"message": "Item added to cart"}), 201

# @app.route("/cart/<int:id>", methods=["PATCH"])
# def update_quantity(id):
#     data = request.get_json()
#     new_quantity = data.get("quantity")

#     item = CartItem.query.get(id)
#     if not item:
#         return jsonify({"message": "Item not found"}), 404

#     if new_quantity and new_quantity > 0:
#         item.quantity = new_quantity
#         db.session.commit()
#         return jsonify({"message": "Quantity updated"}), 200
#     else:
#         return jsonify({"message": "Invalid quantity"}), 400

# @app.route("/cart/<int:id>", methods=["DELETE"])
# def remove_item(id):
#     item = CartItem.query.get(id)
#     if not item:
#         return jsonify({"message": "Item not found"}), 404

#     db.session.delete(item)
#     db.session.commit()
#     return jsonify({"message": "Item removed from cart"}), 200

if __name__ == "__main__":
    app.run(debug=True, port=5000) 
