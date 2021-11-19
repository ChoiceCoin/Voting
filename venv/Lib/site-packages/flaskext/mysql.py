# -*- coding: UTF-8 -*-
from __future__ import absolute_import
import pymysql
try:
    from flask import _app_ctx_stack as _ctx_stack
except ImportError:
    from flask import _request_ctx_stack as _ctx_stack

class MySQL(object):
    def __init__(self, app=None, prefix="mysql",  **connect_args):
        self.connect_args = connect_args
        self.prefix = prefix
        if app is not None:
            self.app = app
            self.init_app(self.app)
        else:
            self.app = None

    def init_app(self, app):
        self.app = app
        self.app.config.setdefault('MYSQL_DATABASE_HOST', 'localhost')
        self.app.config.setdefault('MYSQL_DATABASE_PORT', 3306)
        self.app.config.setdefault('MYSQL_DATABASE_USER', None)
        self.app.config.setdefault('MYSQL_DATABASE_PASSWORD', None)
        self.app.config.setdefault('MYSQL_DATABASE_DB', None)
        self.app.config.setdefault('MYSQL_DATABASE_CHARSET', 'utf8')
        self.app.config.setdefault('MYSQL_USE_UNICODE', True)
        self.app.config.setdefault('MYSQL_DATABASE_SOCKET', None)
        self.app.config.setdefault('MYSQL_SQL_MODE', None)
        self.app.config.setdefault('MYSQL_CURSORCLASS', None)
        self.app.config.setdefault('MYSQL_SSL_CA', None)
        # Flask 0.9 or later
        if hasattr(self.app, 'teardown_appcontext'):
            self.app.teardown_request(self.teardown_request)
        # Flask 0.7 to 0.8
        elif hasattr(self.app, 'teardown_request'):
            self.app.teardown_request(self.teardown_request)
        # Older versions
        else:
            self.app.after_request(self.teardown_request)

    def connect(self):
        if self.app.config['MYSQL_DATABASE_HOST']:
            self.connect_args['host'] = self.app.config['MYSQL_DATABASE_HOST']
        if self.app.config['MYSQL_DATABASE_PORT']:
            self.connect_args['port'] = self.app.config['MYSQL_DATABASE_PORT']
        if self.app.config['MYSQL_DATABASE_USER']:
            self.connect_args['user'] = self.app.config['MYSQL_DATABASE_USER']
        if self.app.config['MYSQL_DATABASE_PASSWORD']:
            self.connect_args['password'] = self.app.config['MYSQL_DATABASE_PASSWORD']
        if self.app.config['MYSQL_DATABASE_DB']:
            self.connect_args['db'] = self.app.config['MYSQL_DATABASE_DB']
        if self.app.config['MYSQL_DATABASE_CHARSET']:
            self.connect_args['charset'] = self.app.config['MYSQL_DATABASE_CHARSET']
        if self.app.config['MYSQL_USE_UNICODE']:
            self.connect_args['use_unicode'] = self.app.config['MYSQL_USE_UNICODE']
        if self.app.config['MYSQL_DATABASE_SOCKET']:
            self.connect_args['unix_socket'] = self.app.config['MYSQL_DATABASE_SOCKET']
        if self.app.config['MYSQL_SQL_MODE']:
            self.connect_args['sql_mode'] = self.app.config['MYSQL_SQL_MODE']
        if self.app.config['MYSQL_CURSORCLASS']:
            self.connect_args['cursorclass'] = self.app.config['MYSQL_CURSORCLASS']
        if self.app.config['MYSQL_SSL_CA']:
            self.connect_args['ssl'] = self.app.config['MYSQL_SSL_CA']
        return pymysql.connect(**self.connect_args)

    def teardown_request(self, exception):
        ctx = _ctx_stack.top
        if hasattr(ctx, "mysql_dbs"):
            try:
                if self.prefix in ctx.mysql_dbs and ctx.mysql_dbs[self.prefix].open:
                    ctx.mysql_dbs[self.prefix].close()
            except Exception as e:
                pass

    def get_db(self):
        ctx = _ctx_stack.top
        if ctx is not None:
            if not hasattr(ctx, "mysql_dbs"):
                ctx.mysql_dbs = dict()
            if self.prefix not in ctx.mysql_dbs:
                ctx.mysql_dbs[self.prefix] = self.connect()
            return ctx.mysql_dbs[self.prefix]
