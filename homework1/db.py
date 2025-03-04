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
        name TEXT NOT NULL
        );""")
        self.cur.execute("""CREATE TABLE books(
        id SERIAL PRIMARY KEY,
        lib_id INT REFERENCES libraries(id),
        name TEXT NOT NULL,
        genre TEXT NOT NULL
        );""")
        self.cur.execute("""CREATE TABLE auth_to_book(
        id SERIAL PRIMARY KEY,
        book_id INT REFERENCES books(id),
        auth_id INT REFERENCES authors(id)
        );""")
        self.conn.commit()


    def close(self):
        self.cur.close()
        self.conn.close()