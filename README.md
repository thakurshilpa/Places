# Places
application for search nearby location

Using https://epsg.io/3857 coordinate system 
http://lyzidiamond.com/posts/4326-vs-3857

EPSG:4326(Geographic) => EPSG:3857(Projected)

query parameters:
format: full|min
radius: number
order: asc/desc
algorithm: quadtree/linear

http://localhost:8001/getplaces?lat=19.1113&lng=74.85&format=min&radius=0.5
http://localhost:8001/getplaces?lat=19.1113&lng=74.85&format=full&radius=0.5
http://localhost:8001/getplaces?lat=19.1113&lng=74.85&format=full&radius=1.0&order=desc
http://localhost:8001/getplaces?lat=19.1113&lng=74.85&format=min&radius=0.5&order=desc&algorithm=quadtree