
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import Email, DataRequired, EqualTo, ValidationError
from app import app

class LoginForm(FlaskForm):
    email=StringField('Email Address', validators=[DataRequired(), Email()])
    password=PasswordField('Password', validators=[DataRequired()])
    submit=SubmitField('Login')

class RegisterForm(FlaskForm):
    first_name = StringField("First Name", validators=[DataRequired()])
    last_name = StringField("Last Name", validators=[DataRequired()])
    email = StringField("Email Address", validators=[DataRequired(), Email()])
    password = PasswordField("Password", validators=[DataRequired()])
    confirm_password = PasswordField("Confirm Password", validators=[DataRequired(), EqualTo('password', message="Passwords must Match")])
    submit = SubmitField('Register')

    #has to be named like validate_COLUMNNAME
    def validate_email(form, field):
        print(field.data)
        print(app.config.get("REGISTERED_USERS"))
        if field.data.lower() in app.config.get("REGISTERED_USERS"):
            raise ValidationError("Email is Already in Use")
