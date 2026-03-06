"""add status to transactions"""

from alembic import op
import sqlalchemy as sa


# revision identifiers
revision = "f87b9969002f"
down_revision = None
branch_labels = None
depends_on = None


def upgrade():

    op.add_column(
        "transactions",
        sa.Column(
            "status",
            sa.String(length=20),
            nullable=False,
            server_default="pending"
        )
    )


def downgrade():

    op.drop_column(
        "transactions",
        "status"
    )