# app/repositories/category_repository.py

from sqlalchemy.orm import Session

from app.models.category import Category


def create_category(
    db: Session,
    user_id: int,
    name: str,
    type: str
) -> Category:

    category = Category(
        user_id=user_id,
        name=name,
        type=type
    )

    db.add(category)
    db.commit()
    db.refresh(category)

    return category


def get_categories_by_user(db: Session, user_id: int):
    return db.query(Category).filter(Category.user_id == user_id).all()


def get_category_by_id(db: Session, category_id: int):
    return db.query(Category).filter(Category.id == category_id).first()


def delete_category(db: Session, category_id: int):

    category = db.query(Category).filter(Category.id == category_id).first()

    if not category:
        return None

    db.delete(category)
    db.commit()

    return category