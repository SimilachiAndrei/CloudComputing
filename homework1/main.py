from http.server import HTTPServer, SimpleHTTPRequestHandler
from handler import HttpHandler
host = "localhost"
port = 4000

server  = HTTPServer((host, port), SimpleHTTPRequestHandler)

print("Server started")
server.serve_forever()
