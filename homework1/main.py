from http.server import HTTPServer, SimpleHTTPRequestHandler
from handler import HttpHandler
from db import DbInteraction
host = "localhost"
port = 4000

def create_handler(db):
    return lambda *args, **kwargs: HttpHandler(*args, db=db, **kwargs)


database = DbInteraction()
# database.create()
server  = HTTPServer((host, port), create_handler(database))

print("Server started")
server.serve_forever()
database.drop_all()
