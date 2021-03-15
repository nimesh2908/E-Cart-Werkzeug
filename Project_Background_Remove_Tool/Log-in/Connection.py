#!/usr/bin/env python3
import psycopg2

from psycopg2 import Error


class Connection():

    def __init__(self):
        print('>>>Databse_Connection<<<')
        self.create_connection('postgres')
        self.db_name = 'brt'
        db_check = "SELECT 1 FROM pg_database WHERE datname='%s'" % self.db_name
        self.cr.execute(db_check)
        if not len(self.cr.fetchall()):
            self.cr.execute('CREATE DATABASE %s' % self.db_name)
            self.connection.close()
            self.create_connection(self.db_name)
            user = '''CREATE TABLE users(
                id SERIAL PRIMARY KEY,
                email varchar  NOT NULL unique,
                mobile varchar NOT NULL,
                password varchar NOT NULL,
                repassword varchar NOT NULL,
                session varchar,
                credit varchar
            );'''
            self.cr.execute(user);
        else:
            self.create_connection(self.db_name)

    def create_connection(self, db_name):
        self.connection = psycopg2.connect(user="postgres", password="postgres", host="127.0.0.1", port="5432", database=db_name)
        self.connection.autocommit = True
        self.cr = self.connection.cursor()

    def create_user(self, data):
        user = """INSERT INTO users (email, mobile, password, repassword, credit) VALUES ('%s', '%s', '%s', '%s', '%s')""" % (data['email'], data['mobile'], data['password'], data['repassword'], data['credit']);
        self.cr.execute(user)

    def user_exists(self, data):
        self.cr.execute("SELECT id FROM users WHERE email='%s' and password='%s'" % (data['email'], data['password']))
        return self.cr.fetchone()

    def check_email(self, data):
        self.cr.execute("SELECT id FROM users WHERE email='%s'" % (data['email']))
        return self.cr.fetchone()

    def check_password(self, data):
        self.cr.execute("SELECT id FROM users WHERE password='%s'" % (data['password']))
        return self.cr.fetchone()

    def create_user_session(self, session_id, user_id):
        self.cr.execute("UPDATE users set session='%s' where id=%s" % (session_id, user_id))

    def session_validate(self, data):
        self.cr.execute("SELECT id FROM users WHERE session='%s'" % (data['session_id']))
        return self.cr.fetchone()

    def user_logout(self, data):
        self.cr.execute("UPDATE users SET session=null WHERE session='%s'" % (data['session_id']))

    def user_credit(self, data):
        self.cr.execute("SELECT credit FROM users WHERE session='%s'" %(data['session_id']))
        return self.cr.fetchall()