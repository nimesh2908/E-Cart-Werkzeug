#!/usr/bin/env python
# -*- coding: utf-8 -*-

import json
#from werkzeug.utils import escape
from werkzeug.wrappers import Request, Response

@Request.application
def Ecart(request):
    html = open('Demo.html', 'r').read()
    data = open('Cart.json', 'r').read()
    response = Response(html % {'data': str(json.loads(data))})
    response.status = '200 OK'
    response.headers['content-type'] = 'text/html'
    return response
    
if __name__ == '__main__':
    from werkzeug.serving import run_simple
    run_simple('localhost', 16000, Ecart)