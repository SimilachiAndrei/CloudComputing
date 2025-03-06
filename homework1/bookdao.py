# bookdao.py
class BookDAO:
    def __init__(self, db):
        self.db = db

    def create(self, lib_id, name, genre, author_names):
        return self.db.add_book(lib_id, name, genre, author_names)

    def find_by_id(self, id):
        book = self.db.get_book(id)
        if not book:
            return None
        authors = self.db.get_authors_for_book(id)
        return {
            'id': book[0],
            'lib_id': book[1],
            'name': book[2],
            'genre': book[3],
            'authors': [{'id': a[0], 'name': a[1]} for a in authors]
        }

    def find_all(self):
        books = self.db.get_all_books_with_authors()
        return [{
            'id': b[0],
            'lib_id': b[1],
            'name': b[2],
            'genre': b[3],
            'authors': b[4]
        } for b in books]

    def update(self, id, name, genre):
        return self.db.update_book(id, name, genre)

    def delete(self, id):
        return self.db.delete_book(id)