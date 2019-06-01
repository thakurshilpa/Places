# Places
application for search nearby location

query parameters:
format: full|min
radius: number
order: asc/desc

http://localhost:8001/getplaces?lat=19.1113&lng=74.85&format=min&radius=0.5
http://localhost:8001/getplaces?lat=19.1113&lng=74.85&format=full&radius=0.5
http://localhost:8001/getplaces?lat=19.1113&lng=74.85&format=full&radius=1.0&order=desc
