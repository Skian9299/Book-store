from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash


# Import `db` from your config or main app
from config import db

# Many-to-Many Association Table (Order & Book)
order_books = db.Table(
    'order_books',
    db.Column('order_id', db.Integer, db.ForeignKey('orders.id'), primary_key=True),
    db.Column('book_id', db.Integer, db.ForeignKey('books.id'), primary_key=True),
    db.Column('quantity', db.Integer, nullable=False)
)
# User Model
class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    password_hash = db.Column(db.String, nullable=False)

    # Relationship with Orders
    orders = db.relationship('Order', back_populates='user', lazy=True)

    # Add this relationship with Reviews
    reviews = db.relationship('Review', back_populates='user', cascade='all, delete-orphan', lazy=True)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)


    
# Book Model
class Book(db.Model, SerializerMixin):
    __tablename__ = 'books'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    genre = db.Column(db.String, nullable=False)
    published_date = db.Column(db.DateTime, nullable=False)
    price = db.Column(db.Float, nullable=False)
    image_url = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=True)  

    # Relationships
    reviews = db.relationship('Review', back_populates='book', cascade="all, delete-orphan")
    orders = db.relationship('Order', secondary=order_books, back_populates='books')

    # Serialization rules
    serialize_rules = ('-reviews.book', '-orders.books')

    def __repr__(self):
        return f"<Book(id={self.id}, title='{self.title}', genre='{self.genre}')>"
class Order(db.Model, SerializerMixin):
    __tablename__ = 'orders'

    id = db.Column(db.Integer, primary_key=True)
    order_date = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    total_price = db.Column(db.Float, nullable=False)

    # Many-to-One: Order → User
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    user = db.relationship('User', back_populates='orders')  # Ensure the back_populates is correct

    books = db.relationship('Book', secondary=order_books, back_populates='orders')

    serialize_rules = ('-user.orders', '-books.orders')

    def __repr__(self):
        return f"<Order(id={self.id}, order_date='{self.order_date}', total_price={self.total_price})>"
class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

    # Many-to-One: Review → User
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    user = db.relationship('User', back_populates='reviews')

    # Many-to-One: Review → Book
    book_id = db.Column(db.Integer, db.ForeignKey('books.id'), nullable=False)
    book = db.relationship('Book', back_populates='reviews')

    # Serialization rules
    serialize_rules = ('-user.reviews', '-book.reviews')  # Prevents circular references

#     #  Cart Model
# class CartItem(db.Model):
#     __tablename__ = "cart"

#     id = db.Column(db.Integer, primary_key=True)
#     title = db.Column(db.String, nullable=False)
#     price = db.Column(db.Float, nullable=False)
#     quantity = db.Column(db.Integer, default=1)

#     def to_dict(self):
#         return {
#             "id": self.id,
#             "title": self.title,
#             "price": self.price,
#             "quantity": self.quantity
#         }

#     def __repr__(self):
#         return f"<Review(id={self.id}, rating={self.rating}, comment='{self.comment}')>"
