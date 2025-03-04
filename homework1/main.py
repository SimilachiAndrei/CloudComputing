from http.server import HTTPServer, SimpleHTTPRequestHandler
from handler import HttpHandler
from db import DbInteraction
host = "localhost"
port = 4000

database = DbInteraction()
database.create()
server  = HTTPServer((host, port), HttpHandler(database))

print("Server started")
server.serve_forever()
database.drop_all()
