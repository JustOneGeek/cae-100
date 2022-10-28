from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask import Flask, send_from_directory
from config import Config
from flask_login import LoginManager
from flask_moment import Moment
from flask_cors import CORS
import os
db = SQLAlchemy()
migrate = Migrate(compare_type=True)
login = LoginManager()
moment = Moment()

if os.environ.get('FLASK_DEBUG'):
    cors = CORS()

def create_app(config_class=Config):
    # intializing
    app = Flask(__name__, static_folder="../client/build", static_url_path='')
    app.config.from_object(Config)
    db.init_app(app)
    migrate.init_app(app, db)
    login.init_app(app)
    moment.init_app(app)
    
    if os.environ.get('FLASK_DEBUG'):
        cors.init_app(app)

    login.login_view = 'auth.login'
    login.login_message = 'Log yourself in your flithy animal!'
    login.login_message_category = 'warning'

    @app.route('/')
    def serve():
        return send_from_directory(app.static_folder, 'index.html')

    @app.errorhandler(404)
    def not_found(e):
        return app.send_static_file('index.html')

    from .blueprints.auth import bp as auth_bp
    app.register_blueprint(auth_bp)

    from .blueprints.main import bp as main_bp
    app.register_blueprint(main_bp)

    from .blueprints.social import bp as social_bp
    app.register_blueprint(social_bp)

    from .blueprints.api import bp as api_bp
    app.register_blueprint(api_bp)

    return app

from app import models
