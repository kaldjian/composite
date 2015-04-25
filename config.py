from keys import client_id, client_secret


class Config(object):
    DEBUG = False
    TESTING = False
    CSRF_ENABLED = True
    CLIENT_ID = client_id
    CLIENT_SECRET = client_secret


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