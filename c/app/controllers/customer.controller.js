
var customers = {
				customer1: {
					long: 13,
					lat: 11,
					name: "Rattan",
					service: "jewellery shop"
				},
				customer2: {
					long: 14,
					lat: 15,
					name: "Roop singh",
					service: "jewellery shop"
					
				},
				customer3: {
					long: 10,
					lat: 19,
					name: "prithi",
					service: "jewellery shop"
				},
				customer4: {
					long: 100,
					lat: 17,
					name: "chandan",
					service: "company"
				}
			}

exports.create = function(req, res) {
	var newCustomer = req.body;
    customers["customer" + newCustomer.id] = newCustomer;
	console.log("--->After Post, customers:\n" + JSON.stringify(customers, null, 4));
    res.end("Post Successfully: \n" + JSON.stringify(newCustomer, null, 4));
};

exports.findAll = function(req, res) {
    console.log("--->Find All: \n" + JSON.stringify(customers, null, 4));
    res.end("All Customers: \n" + JSON.stringify(customers, null, 4));  
};

exports.findOne = function(req, res) {
    var customer = customers["customer" + req.params.id];
    console.log("--->Find customer: \n" + JSON.stringify(customer, null, 4));
    res.end( "Find a Customer:\n" + JSON.stringify(customer, null, 4));
};

exports.update = function(req, res) {
	var id = parseInt(req.params.id);
	var updatedCustomer = req.body; 
	if(customers["customer" + id] != null){
		// update data
		customers["customer" + id] = updatedCustomer;

		console.log("--->Update Successfully, customers: \n" + JSON.stringify(customers, null, 4))
		
		// return
		res.end("Update Successfully! \n" + JSON.stringify(updatedCustomer, null, 4));
	}else{
		res.end("Don't Exist Customer:\n:" + JSON.stringify(updatedCustomer, null, 4));
	}
};

exports.delete = function(req, res) {
	var deleteCustomer = customers["customer" + req.params.id];
    delete customers["customer" + req.params.id];
    console.log("--->After deletion, customer list:\n" + JSON.stringify(customers, null, 4) );
    res.end( "Deleted customer: \n" + JSON.stringify(deleteCustomer, null, 4));
};