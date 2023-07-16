/*
	Program: 	 E-commerce API
	Programmer:  Jonas Balajadia/Josh Quiogue
	Section: 	 AN22
	Start Date:  July 16, 2023 
	End Date:  	 July 16, 2023 
*/

// load express for our backend
const express = require('express');
const mongoose = require('mongoose');
// allows us to control tha app's Cross Origin Resource Sharing
const cors = require('cors')
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
// we create an app variable that stores results of the express function that initializes our express application and allow to acess different methods that will make backend creation easy

// we redacted the admin and password for safety purposes
mongoose.connect(`mongodb+srv://@sandbox.vbdb4cc.mongodb.net/an22_sample_database?retryWrites=true&w=majority`,{
		useNewUrlParser: true,
		useUnifiedTopology: true
	});
mongoose.connection.once('open', () => console.log('Now connected to MongoDB Atlas'));

// allows all resources to access our backend application
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/users', authRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.listen(process.env.PORT || 4000, () => {
	console.log(`API is now online on port ${ process.env.PORT || 4000}`)
});
