"""${message}

Revision ID: ${up_revision}
Revises: ${down_revision | comma,n}
Create Date: ${create_date}
"""

from alembic import op
import sqlalchemy as sa

revision = "${up_revision}"
down_revision = ${repr(down_revision)}
branch_labels = None
depends_on = None

def upgrade():
% if upgrades:
${upgrades}
% else:
pass
% endif

def downgrade():
% if downgrades:
${downgrades}
% else:
pass
% endif
