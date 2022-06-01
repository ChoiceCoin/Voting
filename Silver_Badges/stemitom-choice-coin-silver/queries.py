create_query = """
INSERT INTO USER (DL, SS) VALUES(?,?)
"""

vote_select_query = """
SELECT * FROM USER WHERE SS = ? AND DL = ?
"""

vote_delete_query = """
DELETE FROM USER WHERE SS = ? and DL = ?
"""