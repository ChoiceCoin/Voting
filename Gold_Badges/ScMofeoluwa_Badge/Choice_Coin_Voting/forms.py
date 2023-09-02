from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, IntegerField
from wtforms.validators import DataRequired, Length


class ProjectForm(FlaskForm):
    name = StringField(
        "Project Name", validators=[DataRequired(), Length(min=2, max=20)]
    )
    category = StringField("Category", validators=[DataRequired()])
    admin_key = StringField("Admin Key", validators=[DataRequired()])
    target = IntegerField("Target", validators=[DataRequired()])
    submit = SubmitField("Add Project")


class VoterForm(FlaskForm):
    social_number = StringField(
        "Social Number", validators=[DataRequired(), Length(min=6, max=20)]
    )
    license_id = StringField(
        "License ID", validators=[DataRequired(), Length(min=6, max=20)]
    )
    admin_key = StringField("Admin Key", validators=[DataRequired()])
    submit = SubmitField("Create User")


class VoteForm(FlaskForm):
    address = StringField("Address", validators=[DataRequired()])
    submit = SubmitField("Vote")


class EndForm(FlaskForm):
    project_id = IntegerField("Project ID", validators=[DataRequired()])
    admin_key = StringField("Admin Key", validators=[DataRequired()])
    submit = SubmitField("End Vote")
