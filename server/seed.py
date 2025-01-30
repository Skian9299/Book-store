from faker import Faker
from datetime import datetime
import random
from app import app, db  
from models import User, Book, Order, Review  

fake = Faker()

def seed_data():
    with app.app_context():
        db.drop_all()
        db.create_all()

        # Seed Users
        users = []
        for _ in range(10):
            user = User(
                name=fake.name(),
                email=fake.email(),
                password=fake.password(length=10)  
            )
            users.append(user)

        db.session.add_all(users)
        db.session.commit()  

        # Seed Books with image URLs
        books = []
        for _ in range(10):
            book = Book(
                title=fake.sentence(nb_words=3),  
                genre=random.choice(["Fiction", "Mystery", "Sci-Fi", "Romance", "Horror", "Biography"]),
                published_date=fake.date_between(start_date="-100y", end_date="today"),
                price=round(random.uniform(5.99, 30.99), 2),
                image_url=fake.image_url(width=200, height=300) 
            )
            books.append(book)

        db.session.add_all(books)
        db.session.commit()  

        # Seed Orders
        orders = [
            Order(user_id=random.choice(users).id, total_price=round(random.uniform(15, 100), 2))
            for _ in range(5)
        ]
        db.session.add_all(orders)

        # Seed Reviews
        reviews = [
            Review(
                user_id=random.choice(users).id,
                book_id=random.choice(books).id,
                rating=random.randint(1, 5),
                comment=fake.sentence()
            )
            for _ in range(10)
        ]
        db.session.add_all(reviews)

        db.session.commit()

        print("✅ Database successfully seeded with 10 users, 20 books, 5 orders, and 10 reviews!")

if __name__ == "__main__":
    seed_data()
