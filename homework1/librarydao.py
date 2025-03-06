class LibraryDAO:
    def __init__(self, db):
        self.db = db

    def create(self, name, address):
        return self.db.add_library(name, address)

    def find_by_id(self, id):
        return self.db.get_library(id)

    def find_all(self):
        return self.db.get_all_libraries()

    def update(self, id, name, address):
        return self.db.update_library(id, name, address)

    def delete(self, id):
        return self.db.delete_library(id)