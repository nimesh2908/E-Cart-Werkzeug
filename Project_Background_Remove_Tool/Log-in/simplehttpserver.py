from http.server import BaseHTTPRequestHandler, HTTPServer
import werkzeug
import json
PORT_NUMBER = 8080


# This class will handles any incoming request from
# the browser
class myHandler(BaseHTTPRequestHandler):
    # Handler for the GET requests

    def do_POST(self):
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.end_headers()
        search = self.rfile.read(int(self.headers.get('Content-Length')))
        search_content = werkzeug.url_decode(search).get('search_content')
        student_data = [{'Email': 'email', 'password': 'pass', 'password1': 'pass1'}]
        return_data = []
        for rec in student_data:
            if search_content in rec.values():
                return_data.append(rec)
        self.wfile.write(json.dumps(return_data).encode())

    def do_GET(self):
        print("PATH", self.path)
        if self.path == '/':
            f = open('index.html')
            self.send_response(200)
            self.send_header('Content-type', 'text/html')
            self.end_headers()
            self.wfile.write(f.read().encode())
            f.close()
        elif self.path == '/signup':
            self.send_response(200)
            self.send_header('Content-type', 'text/html')
            self.end_headers()
            student_data = [{'Email': 'email', 'password': 'pass', 'password1': 'pass1'}]
            data = """
            <table>
            <tr>
            <th> Email </th>
            <th> Password </th>
            <th> Password1 </th>
            </tr>"""
            for rec in student_data:
                data += """
                    <tr>
                    <td>
                    %s
                    </td>
                    <td>
                    %s
                    </td>
                    <td>
                    %s
                    </td>
                    </tr>
                """ % (rec.get('email'), rec.get('pass'), rec.get('pass1'))
            data += """
            </table>"""
            self.wfile.write(data.encode())

server = HTTPServer(('', PORT_NUMBER), myHandler)
print ('Started httpserver on port %s' % PORT_NUMBER)
server.serve_forever()
