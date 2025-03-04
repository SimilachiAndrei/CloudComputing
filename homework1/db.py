import psycopg2
import config

conn = psycopg2.connect(database = config.database,
                        user = config.user,
                        host= 'localhost',
                        password = config.password,
                        port = 5432)

cur = conn.cursor()

# cur.execute("""DROP TABLE libraries;""")


# cur.execute("""CREATE TABLE libraries(
# id SERIAL PRIMARY KEY,
# name VARCHAR(50) NOT NULL,
# address VARCHAR(100) UNIQUE NOT NULL
# );""")

conn.commit()
cur.close()
conn.close()