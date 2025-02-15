from flask_wtf import FlaskForm
from wtforms.validators import DataRequired,Length

class VoterForm(FlaskForm):
    username = StringField('Username',validators=[DataRequired(),Length(min=2,max=20)])
    nin = IntegerField('Country Code', [validators.required()])

    submit = SubmitField('Add Voter')