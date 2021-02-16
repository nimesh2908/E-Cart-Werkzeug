import psycopg2
from psycopg2 import Error

connection = psycopg2.connect(user = "postgres",password = "postgres",host="127.0.0.1",port="5432",database="nims")

cursor =connection.cursor()

                   
cursor.execute('''DELETE FROM login WHERE id=2 ''')


connection.commit()
print("Insert Data Sucessfully")

cursor.close()
connection.close()

