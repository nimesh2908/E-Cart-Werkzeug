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
                user_id SERIAL PRIMARY KEY,
                email varchar  NOT NULL unique,
                password varchar NOT NULL,
                repassword varchar NOT NULL,
                session varchar,
                credit varchar,
                role varchar
            );'''
            self.cr.execute(user);
            order_credit = '''CREATE TABLE orders_credit (
                order_credit_id SERIAL,
                user_id INTEGER REFERENCES users (user_id),
                order_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
                credit varchar
            );'''
            self.cr.execute(order_credit);
            order = '''CREATE TABLE orders (
                id SERIAL,
                user_id INTEGER REFERENCES users (user_id),
                updated_time TIMESTAMPTZ NOT NULL DEFAULT NOW()
            );'''
            self.cr.execute(order);
        else:
            self.create_connection(self.db_name)

    def create_connection(self, db_name):
        self.connection = psycopg2.connect(user="postgres", password="postgres", host="127.0.0.1", port="5432", database=db_name)
        self.connection.autocommit = True
        self.cr = self.connection.cursor()

    def create_user(self, data):
        user = """INSERT INTO users (email, password, repassword, credit, role) VALUES ('%s', '%s', '%s', '%s', '%s')""" % (data['email'], data['password'], data['repassword'], 10, 'Customer');
        self.cr.execute(user)

    def check_role(self, data):
        self.cr.execute("SELECT role FROM users WHERE email='%s' and password='%s'" % (data['email'], data['password']))
        return self.cr.fetchone()

    def get_user_role_session_val(self, data):
        self.cr.execute("SELECT role FROM users WHERE session = '%s'" % (data['session_id']))
        return self.cr.fetchone()

    def customer_details(self):
        self.cr.execute("SELECT user_id, email, credit FROM users WHERE role='Customer'")
        return self.cr.fetchall()

    def decrease_credit(self, data):
        self.cr.execute("SELECT credit FROM users WHERE session='%s'" %(data['session_id']))
        x = self.cr.fetchone()
        self.cr.execute("UPDATE users SET credit='%s' WHERE session = '%s' " % (int(x[0]) - 1, data['session_id']))
        self.cr.execute("SELECT credit FROM users WHERE session='%s'" %(data['session_id']))
        return self.cr.fetchone()

    def order(self, upload):
        user = """INSERT INTO orders (user_id) VALUES (%s)""" % (upload[0]);
        self.cr.execute(user)

    def order_details(self):
        self.cr.execute("SELECT orders.id,orders.user_id, orders.updated_time, users.email FROM orders INNER JOIN users ON Orders.user_id=users.user_id;")
        return self.cr.fetchall()

    def upload(self, data):
        self.cr.execute("SELECT user_id FROM users WHERE session = '%s'" %(data['session_id']))
        return self.cr.fetchall()

    def check_email(self, data):
        self.cr.execute("SELECT user_id FROM users WHERE email='%s'" % (data['email']))
        return self.cr.fetchone()

    def check_password(self, data):
        self.cr.execute("SELECT user_id FROM users WHERE email= '%s' AND password='%s'" % (data['email'], data['password']))
        return self.cr.fetchone()

    def create_user_session(self, session_id, user_id):
        self.cr.execute("UPDATE users set session='%s' where user_id=%s" % (session_id, user_id))

    def session_validate(self, data):
        self.cr.execute("SELECT user_id FROM users WHERE session='%s'" % (data['session_id']))
        return self.cr.fetchone()

    def user_logout(self, data):
        self.cr.execute("UPDATE users SET session=null WHERE session='%s'" % (data['session_id']))

    def user_credit(self, data):
        self.cr.execute("SELECT credit FROM users WHERE session='%s'" %(data['session_id']))
        return self.cr.fetchone()

    def credit(self, data):
        self.cr.execute("SELECT credit FROM users WHERE user_id=%s" %(data))
        return self.cr.fetchone()

    def update_credit(self, data):
        self.cr.execute("SELECT credit FROM users WHERE session='%s'" %(data['session_id']))
        x = self.cr.fetchone()
        self.cr.execute("UPDATE users set credit='%s' where session='%s'" % (int(x[0]) + int(data['flexRadioDefault']), data['session_id']))
        user = """INSERT INTO orders_credit (user_id,credit) VALUES (%s,%s)""" % (data['user_id'],data['flexRadioDefault']);
        self.cr.execute(user)
        self.cr.execute("SELECT credit FROM users WHERE session='%s'" %(data['session_id']))
        return self.cr.fetchone()

    def usage(self, data):
        self.cr.execute("SELECT orders.id, orders.updated_time FROM orders WHERE user_id='%s'" %(data['user_id']))
        return self.cr.fetchall()

    def billing(self, data):
        self.cr.execute("SELECT orders_credit.order_credit_id, orders_credit.order_date, orders_credit.credit FROM orders_credit WHERE user_id='%s'" %(data['user_id']))
        return self.cr.fetchall()
