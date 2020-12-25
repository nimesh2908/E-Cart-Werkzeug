import json

py_dict={"Company" : "Hyundai","Car" : "I20","Model" : "2020"}

json_read=json.dumps(py_dict)
print(json_read)