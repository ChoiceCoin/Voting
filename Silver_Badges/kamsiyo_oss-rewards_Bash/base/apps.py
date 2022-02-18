from django.apps import AppConfig


class BaseConfig(AppConfig):
    name = 'base'
    def ready(self):
        import base.signal

