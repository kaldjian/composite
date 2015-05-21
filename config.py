from keys import client_id, client_secret, aws_access, aws_secret
import os


class Config(object):
    DEBUG = False
    TESTING = False
    CSRF_ENABLED = True
    CLIENT_ID = client_id
    CLIENT_SECRET = client_secret
    AWS_ACCESS_KEY_ID = aws_access
    AWS_SECRET_ACCESS_KEY = aws_secret
    SQLALCHEMY_DATABASE_URI = os.environ['DATABASE_URL']


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
