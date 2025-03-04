import psycopg2
import config

class DbInteraction:
    def __init__(self):
        self.conn = psycopg2.connect(database=config.database,
                                user=config.user,
                                host='localhost',
                                password=config.password,
                                port=5432)
        self.cur = self.conn.cursor()

    def drop_all(self):
        self.cur.execute("""DROP TABLE auth_to_book""")
        self.cur.execute("""DROP TABLE authors;""")
        self.cur.execute("""DROP TABLE books""")
        self.cur.execute("""DROP TABLE libraries;""")
        self.conn.commit()

    def create(self):
        self.cur.execute("""CREATE TABLE libraries(
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        address TEXT UNIQUE NOT NULL
        );""")
        self.cur.execute("""CREATE TABLE authors(
        id SERIAL PRIMARY KEY,
        name TEXT UNIQUE NOT NULL
        );""")
        self.cur.execute("""CREATE TABLE books(
        id SERIAL PRIMARY KEY,
        lib_id INT REFERENCES libraries(id) ON DELETE CASCADE,
        name TEXT NOT NULL,
        genre TEXT NOT NULL
        );""")
        self.cur.execute("""CREATE TABLE auth_to_book(
        id SERIAL PRIMARY KEY,
        book_id INT REFERENCES books(id) ON DELETE CASCADE,
        auth_id INT REFERENCES authors(id) ON DELETE CASCADE
        );""")
        self.conn.commit()

    # def add_book(self, lib_id, name, genre, author_names):
    #     self.cur.execute("INSERT INTO books (lib_id, name, genre) VALUES (%s, %s, %s) RETURNING id;",(lib_id, name, genre))
    #     book_id = self.cur.fetchone()[0]
    #     for auth_name in author_names:
    #         author = self.get_author(name=auth_name)
    #         if author is None:
    #             self.add_author(auth_name)
    #             author = self.get_author(name=auth_name)
    #         author_id = author[0]
    #         self.cur.execute(
    #             "INSERT INTO auth_to_book (book_id, auth_id) VALUES (%s, %s);",
    #             (book_id, author_id)
    #         )
    #     self.conn.commit()
    #     return book_id

    def add_book(self, lib_id, name, genre, author_names):
        self.cur.execute("INSERT INTO books (lib_id, name, genre) VALUES (%s, %s, %s) RETURNING id;",(lib_id, name, genre))
        book_id = self.cur.fetchone()[0]
        for auth_name in author_names:
            author = self.get_author(name=auth_name)
            if author is None:
                self.conn.rollback()
                return None
            author_id = author[0]
            self.cur.execute(
                "INSERT INTO auth_to_book (book_id, auth_id) VALUES (%s, %s);",
                (book_id, author_id)
            )
        self.conn.commit()
        return book_id

    def get_book(self, id):
        self.cur.execute("SELECT * FROM books WHERE id =  %s;", (id,))
        book = self.cur.fetchone()
        return book

    def update_book(self, id, name, genre):
        self.cur.execute("SELECT * FROM books WHERE id = %s;", (id,))
        book = self.cur.fetchone()
        if not book:
            return None
        self.cur.execute("UPDATE books SET name = %s, genre = %s WHERE id = %s;", (name, genre, id))
        self.conn.commit()
        return self.cur.fetchone()

    def delete_book(self, id):
        self.cur.execute("DELETE FROM books WHERE id = %s", (id,))
        if self.cur.rowcount == 0:
            return False
        self.conn.commit()
        return True

    def add_author(self, name):
        self.cur.execute("INSERT INTO authors (name) VALUES (%s) RETURNING id;", (name,))
        auth_id = self.cur.fetchone()[0]
        self.conn.commit()
        return auth_id is not None

    def get_author(self, id=None, name=None):
        if id is not None:
            self.cur.execute("SELECT id, name FROM authors WHERE id = %s;", (id,))
        elif name is not None:
            self.cur.execute("SELECT id, name FROM authors WHERE name = %s;", (name,))
        author = self.cur.fetchone()
        return author

    def update_author(self, id, name):
        self.cur.execute("SELECT * FROM authors WHERE id = %s;", (id,))
        author = self.cur.fetchone()
        if not author:
            return None
        self.cur.execute("UPDATE authors SET name = %s WHERE id = %s;", (name, id))
        self.conn.commit()
        return self.cur.fetchone()

    def delete_author(self, id):
        self.cur.execute("DELETE FROM authors WHERE id = %s", (id,))
        if self.cur.rowcount == 0:
            return False
        self.conn.commit()
        return True

    def add_library(self, name, address):
        self.cur.execute("INSERT INTO libraries (name, address) VALUES (%s, %s) RETURNING id;", (name, address))
        library_id = self.cur.fetchone()[0]
        self.conn.commit()
        return library_id is not None

    def get_library(self, id):
        self.cur.execute("SELECT * FROM libraries WHERE id = %s;", (id,))
        library = self.cur.fetchone()
        return library

    def update_library(self, id, name, address):
        self.cur.execute("SELECT * FROM libraries WHERE id = %s;", (id,))
        library = self.cur.fetchone()
        if not library:
            return None
        self.cur.execute("UPDATE libraries SET name = %s, address = %s WHERE id = %s;", (name, address, id))
        self.conn.commit()
        return self.cur.fetchone()

    def delete_library(self, id):
        self.cur.execute("DELETE FROM libraries WHERE id = %s", (id,))
        if self.cur.rowcount == 0:
            return False
        self.conn.commit()
        return True

    def close(self):
        self.cur.close()
        self.conn.close()