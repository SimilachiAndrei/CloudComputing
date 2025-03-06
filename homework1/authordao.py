class AuthorDAO:
    def __init__(self, db):
        self.db = db

    def create(self, name):
        return self.db.add_author(name)

    def find_by_id(self, id):
        return self.db.get_author(id=id)

    def find_by_name(self, name):
        return self.db.get_author(name=name)

    def find_all(self):
        return self.db.get_all_authors()

    def update(self, id, name):
        return self.db.update_author(id, name)

    def delete(self, id):
        return self.db.delete_author(id)