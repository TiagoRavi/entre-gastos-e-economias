"""add month year to budgets

Revision ID: 450284705b15
Revises: 39ca04cba5e3
Create Date: 2026-03-05 22:17:16.365600
"""

from alembic import op
import sqlalchemy as sa

revision = "450284705b15"
down_revision = "39ca04cba5e3"
branch_labels = None
depends_on = None


def upgrade():

    op.add_column(
        "budgets",
        sa.Column("month", sa.Integer(), nullable=False, server_default="1")
    )

    op.add_column(
        "budgets",
        sa.Column("year", sa.Integer(), nullable=False, server_default="2026")
    )


def downgrade():

    op.drop_column("budgets", "month")
    op.drop_column("budgets", "year")