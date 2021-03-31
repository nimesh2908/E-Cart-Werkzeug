#!/usr/bin/env python3

import json
import psycopg2
import threading
import time
import uuid
import datetime

from Connection import Connection
from http.server import SimpleHTTPRequestHandler, HTTPServer
from psycopg2 import Error
from urllib.parse import parse_qs

class myHandler(SimpleHTTPRequestHandler):

    db_connection = Connection()

    def do_POST(self):
        self.send_response(200)
        self.send_header('Content-type', 'text/json')
        self.end_headers()

        if self.path == '/do_signup':
            data = self.rfile.read(int(self.headers.get('Content-Length')))
            data = json.loads(data)
            user_data = self.db_connection.check_email(data)
            if user_data is None:
                print("----Create A New User----")
                user_data = self.db_connection.create_user(data)
                return self.wfile.write(json.dumps({'exist': False}).encode())
            else:
                print("----User Already Exist----")
                return self.wfile.write(json.dumps({'exist': True}).encode())

        elif self.path == '/do_login':
            data = self.rfile.read(int(self.headers.get('Content-Length')))
            data = json.loads(data)
            check_role = self.db_connection.check_role(data)
            email = self.db_connection.check_email(data)
            password = self.db_connection.check_password(data)
            if email is not None:
                if email == password:
                    print("----Email And Password Matched----")
                    session_id = str(uuid.uuid4())
                    self.db_connection.create_user_session(session_id, email[0])
                    credit = self.db_connection.credit(email)
                    if "Customer" in check_role:
                        return self.wfile.write(json.dumps({'session_id': session_id, 'user_id': email[0], 'is_valid': True, 'credit': credit, 'role': "Customer"}).encode())
                    else:
                        return self.wfile.write(json.dumps({'session_id': session_id, 'user_id': email[0], 'is_valid': True, 'credit': credit, 'role': "Admin"}).encode())
                else:
                    if email != password:
                        return self.wfile.write(json.dumps({'email': False}).encode())
            else:
                return self.wfile.write(json.dumps({'email': False}).encode())

        elif self.path == '/session_validate':
            data = self.rfile.read(int(self.headers.get('Content-Length')))
            data = json.loads(data)
            user = self.db_connection.session_validate(data) 
            if user is None:
                print("----User Are There----")
                return self.wfile.write(json.dumps({'valid': True}).encode())
            else:
                print("----Not User Found----")
                return self.wfile.write(json.dumps({'valid': False}).encode())  

        elif self.path == '/do_upload':
            data = self.rfile.read(int(self.headers.get('Content-Length')))
            data = json.loads(data)
            upload = self.db_connection.upload(data)
            decrease = self.db_connection.decrease_credit(data)
            order = self.db_connection.order(upload)

        elif self.path == '/do_customer_details':
            details = self.db_connection.customer_details()
            return self.wfile.write(json.dumps({'details': details}).encode())

        elif self.path == '/do_order_details':
            order = self.db_connection.order_details()
            result_data = list()
            for date in order:
                date = {
                        'id': date[0],
                        'user_id': date[1],
                        'day': date[2].day,
                        'month': date[2].month,
                        'year': date[2].year,
                        'hour': date[2].hour,
                        'minute': date[2].minute,
                        'email': date[3],
                        }
                result_data.append(date)
            return self.wfile.write(json.dumps({'order': result_data}).encode())

        elif self.path == '/do_credit':
            data = self.rfile.read(int(self.headers.get('Content-Length')))
            data = json.loads(data)
            user_data = self.db_connection.update_credit(data)
            print("----User Credit----")
            return self.wfile.write(json.dumps({'credit': user_data}).encode())

        elif self.path == '/do_usage':
            data = self.rfile.read(int(self.headers.get('Content-Length')))
            data = json.loads(data)
            usage = self.db_connection.usage(data)
            result_data = list()
            for usage_details in usage:
                usage_details = {
                        'id': usage_details[0],
                        'day': usage_details[1].day,
                        'month': usage_details[1].month,
                        'year': usage_details[1].year,
                        'hour': usage_details[1].hour,
                        'minute': usage_details[1].minute,
                        }
                result_data.append(usage_details)
            return self.wfile.write(json.dumps({'usage_details': result_data}).encode())

        elif self.path == '/do_billing':
            data = self.rfile.read(int(self.headers.get('Content-Length')))
            data = json.loads(data)
            billing = self.db_connection.billing(data)
            result_data = list()
            for billing_details in billing:
                billing_details = {
                        'id': billing_details[0],
                        'day': billing_details[1].day,
                        'month': billing_details[1].month,
                        'year': billing_details[1].year,
                        'hour': billing_details[1].hour,
                        'minute': billing_details[1].minute,
                        'credit': billing_details[2],
                        }
                result_data.append(billing_details)
            return self.wfile.write(json.dumps({'billing_details': result_data}).encode())

        elif self.path == '/do_logout':
            data = self.rfile.read(int(self.headers.get('Content-Length')))
            data = json.loads(data)
            user_data = self.db_connection.user_logout(data)
            print("----User logout----")
            return self.wfile.write(json.dumps({'logout': "done"}).encode())

    def do_GET(self):
        if self.path in ['/', '/signup', '/signin', '/remove_bg', '/credit', '/profile', '/admin']:
            with open('index.html') as f:
                Cookie = self.headers.get('Cookie')
                session_id = False
                html = f.read()
                session_info = {
                    'user_id': None,
                    'is_valid': False,
                    'session_id': session_id,
                    'credit': None,
                }
                if Cookie:
                    session_cookie = parse_qs(Cookie.replace(' ', ''))
                    if session_cookie.get('session_id'):
                        session_id = session_cookie.get('session_id')[0]
                        user = self.db_connection.session_validate({'session_id': session_id})
                        user_credit = self.db_connection.user_credit({'session_id': session_id})
                        role = self.db_connection.get_user_role_session_val({'session_id': session_id})
                        if user and len(user):
                            session_info = {
                                'user_id': user[0],
                                'is_valid': True,
                                'session_id': session_id,
                                'credit': user_credit,
                                'role': role[0],
                            }
                html = html.replace('$session_info', json.dumps(session_info))
                self.send_response(200)
                self.send_header('Content-type', 'text/html')
                self.end_headers()
                self.wfile.write(html.encode())
        else:
            super(myHandler, self).do_GET()
           
def start_server():
   SimpleHTTPRequestHandler.extensions_map['.js'] = 'application/javascript'
   httpd = HTTPServer(('0.0.0.0', 3600), myHandler)
   httpd.serve_forever()

url = 'http://127.0.0.1:3600'

if __name__ == "__main__":
   print("----------------------")
   print("----------------------")
   print("Server running on: {}".format(url))
   threading.Thread(target=start_server, daemon=True).start()

   while True:
       try:
           time.sleep(1)
       except KeyboardInterrupt:
           httpd.server_close()
           quit(0)