from http.server import BaseHTTPRequestHandler
from librarydao import LibraryDAO
from authordao import  AuthorDAO
from bookdao import BookDAO

class HttpHandler(BaseHTTPRequestHandler):

    def __init__(self, db):
        self.libdao = LibraryDAO(db)
        self.authdao = AuthorDAO(db)
        self.bookdao = BookDAO(db)
    def do_GET(self):
        if self.path == "/":
            self.respond(200, b"Hello")
        else:
            self.respond(404, b"Not Found!")

    def do_POST(self):
        if self.path == "/":
            self.respond(200, b"Hello")
        else:
            self.respond(404, b"Not Found!")

    def respond(self, status, content, content_type="text/html"):
        self.send_response(status)
        self.send_header("Content-Type", content_type)
        self.end_headers()
        self.wfile.write(content)
