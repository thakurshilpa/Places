# Application for searching nearby location(Internship Project)

# Run the project
git clone https://github.com/thakurshilpa/Places.git  
cd Places  
npm install // install all the npm modules  
node server.js // this will run http server on port 8001  
  


# Try from browser 
http://localhost:8001/getplaces?lat=19.1113&lng=74.85&format=min&radius=0.5  
http://localhost:8001/getplaces?lat=19.1113&lng=74.85&format=full&radius=0.5  
http://localhost:8001/getplaces?lat=19.1113&lng=74.85&format=full&radius=1.0&order=desc  
http://localhost:8001/getplaces?lat=19.1113&lng=74.85&format=min&radius=0.5&order=desc&algorithm=quadtree  

# Places algorithm & readings
Using https://epsg.io/3857 coordinate system   
http://lyzidiamond.com/posts/4326-vs-3857  
EPSG:4326(Geographic) => EPSG:3857(Projected)  

# Supported query parameters:
format: full|min  
radius: number  
order: asc/desc  
algorithm: quadtree/linear  

