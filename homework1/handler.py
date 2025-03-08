import json
from http.server import BaseHTTPRequestHandler

from authordao import AuthorDAO
from bookdao import BookDAO
from librarydao import LibraryDAO


class HttpHandler(BaseHTTPRequestHandler):
    def __init__(self, *args, db=None, **kwargs):
        self.libdao = LibraryDAO(db)
        self.authdao = AuthorDAO(db)
        self.bookdao = BookDAO(db)
        super().__init__(*args, **kwargs)

    def do_GET(self):
        try:
            if self.path == "/authors":
                authors = self.authdao.find_all()
                authors_list = [{'id': a[0], 'name': a[1]} for a in authors]
                self.respond(200, json.dumps(authors_list).encode(), 'application/json')
            elif self.path.startswith("/authors/"):
                author_id = int(self.path.split('/')[2])
                author = self.authdao.find_by_id(author_id)
                if author:
                    self.respond(200, json.dumps({'id': author[0], 'name': author[1]}).encode(), 'application/json')
                else:
                    self.respond(404, b"Author not found")
            elif self.path == "/books":
                books = self.bookdao.find_all()
                self.respond(200, json.dumps(books).encode(), 'application/json')
            elif self.path.startswith("/books/"):
                book_id = int(self.path.split('/')[2])
                book = self.bookdao.find_by_id(book_id)
                if book:
                    self.respond(200, json.dumps(book).encode(), 'application/json')
                else:
                    self.respond(404, b"Book not found")
            elif self.path == "/libraries":
                libraries = self.libdao.find_all()
                libraries_list = [{'id': lib[0], 'name': lib[1], 'address': lib[2]} for lib in libraries]
                self.respond(200, json.dumps(libraries_list).encode(), 'application/json')
            elif self.path.startswith("/libraries/"):
                lib_id = int(self.path.split('/')[2])
                library = self.libdao.find_by_id(lib_id)
                if library:
                    self.respond(200, json.dumps({'id': library[0], 'name': library[1], 'address': library[2]}).encode(), 'application/json')
                else:
                    self.respond(404, b"Library not found")
            else:
                self.respond(404, b"Not Found")
        except Exception as e:
            self.respond(500, json.dumps({'error': str(e)}).encode(), 'application/json')

    def do_POST(self):
        content_length = int(self.headers.get('Content-Length', 0))
        body = self.rfile.read(content_length)
        try:
            data = json.loads(body)
            if self.path == "/authors":
                if 'name' not in data:
                    self.respond(400, b"Missing 'name'")
                    return
                auth_id = self.authdao.create(data['name'])
                self.respond(201, json.dumps({'id': auth_id}).encode(), 'application/json')
            elif self.path == "/books":
                required = {'lib_id', 'name', 'genre', 'author_names'}
                if not required.issubset(data.keys()):
                    self.respond(400, b"Missing fields")
                    return
                book_id = self.bookdao.create(data['lib_id'], data['name'], data['genre'], data['author_names'])
                if book_id is None:
                    self.respond(400, b"Invalid authors")
                else:
                    self.respond(201, json.dumps({'id': book_id}).encode(), 'application/json')
            elif self.path == "/libraries":
                if 'name' not in data or 'address' not in data:
                    self.respond(400, b"Missing name/address")
                    return
                lib_id = self.libdao.create(data['name'], data['address'])
                self.respond(201, json.dumps({'id': lib_id}).encode(), 'application/json')
            else:
                self.respond(404, b"Not Found")
        except json.JSONDecodeError:
            self.respond(400, b"Invalid JSON")
        except Exception as e:
            self.respond(500, json.dumps({'error': str(e)}).encode(), 'application/json')

    def do_PUT(self):
        content_length = int(self.headers.get('Content-Length', 0))
        body = self.rfile.read(content_length)
        try:
            data = json.loads(body)
            path = self.path
            if path.startswith("/authors/"):
                author_id = int(path.split('/')[2])
                if 'name' not in data:
                    self.respond(400, b"Missing 'name'")
                    return
                updated = self.authdao.update(author_id, data['name'])
                if updated:
                    self.respond(200, json.dumps({'id': updated[0], 'name': updated[1]}).encode(), 'application/json')
                else:
                    self.respond(404, b"Author not found")
            elif path.startswith("/books/"):
                book_id = int(path.split('/')[2])
                required = {'name', 'genre'}
                if not required.issubset(data.keys()):
                    self.respond(400, b"Missing fields")
                    return
                updated = self.bookdao.update(book_id, data['name'], data['genre'])
                if updated:
                    self.respond(200, json.dumps({
                        'id': updated[0],
                        'lib_id': updated[1],
                        'name': updated[2],
                        'genre': updated[3]
                    }).encode(), 'application/json')
                else:
                    self.respond(404, b"Book not found")
            elif path.startswith("/libraries/"):
                lib_id = int(path.split('/')[2])
                required = {'name', 'address'}
                if not required.issubset(data.keys()):
                    self.respond(400, b"Missing fields")
                    return
                updated = self.libdao.update(lib_id, data['name'], data['address'])
                if updated:
                    self.respond(200, json.dumps({
                        'id': updated[0],
                        'name': updated[1],
                        'address': updated[2]
                    }).encode(), 'application/json')
                else:
                    self.respond(404, b"Library not found")
            else:
                self.respond(404, b"Not Found")
        except json.JSONDecodeError:
            self.respond(400, b"Invalid JSON")
        except Exception as e:
            self.respond(500, json.dumps({'error': str(e)}).encode(), 'application/json')

    def do_DELETE(self):
        try:
            path = self.path
            if path.startswith("/authors/"):
                author_id = int(path.split('/')[2])
                success = self.authdao.delete(author_id)
                if success:
                    self.respond(204, b"")
                else:
                    self.respond(404, b"Author not found")
            elif path.startswith("/books/"):
                book_id = int(path.split('/')[2])
                success = self.bookdao.delete(book_id)
                if success:
                    self.respond(204, b"")
                else:
                    self.respond(404, b"Book not found")
            elif path.startswith("/libraries/"):
                lib_id = int(path.split('/')[2])
                success = self.libdao.delete(lib_id)
                if success:
                    self.respond(204, b"")
                else:
                    self.respond(404, b"Library not found")
            else:
                self.respond(404, b"Not Found")
        except ValueError:
            self.respond(400, b"Invalid ID")
        except Exception as e:
            self.respond(500, json.dumps({'error': str(e)}).encode(), 'application/json')

    def respond(self, status, content, content_type="application/json"):
        self.send_response(status)
        self.send_header("Content-Type", content_type)
        self.end_headers()
        self.wfile.write(content)