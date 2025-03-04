from http.server import BaseHTTPRequestHandler

class HttpHandler(BaseHTTPRequestHandler):
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
