from keys import *
import os


class Config(object):
    DEBUG = False
    TESTING = False
    CSRF_ENABLED = True
    # IG API
    CLIENT_ID = client_id
    CLIENT_SECRET = client_secret
    # AWS
    AWS_ACCESS_KEY_ID = aws_access
    AWS_SECRET_ACCESS_KEY = aws_secret
    # SqLOL
    SQLALCHEMY_DATABASE_URI = os.environ['DATABASE_URL']
    # Parse
    APPLICATION_ID = parse_app_id
    REST_API_KEY = parse_api_key
    MASTER_KEY = parse_master_key


class ProductionConfig(Config):
    DEBUG = False


class StagingConfig(Config):
    DEVELOPMENT = True
    DEBUG = True


class DevelopmentConfig(Config):
    DEVELOPMENT = True
    DEBUG = True


class TestingConfig(Config):
    TESTING = True
