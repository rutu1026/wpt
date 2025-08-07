const express = require('express');
const app = express();
const PORT = 3001;
const db = require('./db');
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());

app.get('/getProducts', (req, res) => {
    const sql = 'select * from products;';

    db.query(sql, (err, result) => {
        if (err) {
            console.error('error while fetching data:', err.message);

            return res.status(500).send('Unable to fetch data');
        }
        console.log('Products: ', result)
        return res.status(200).json({ success: true, data: result })

    })
})

app.post('/addProduct', (req, res) => {
    const data = req.body;
    console.log('data: ', data)
    const { name, price, category } = data;
    const sql = 'insert into products (name, price, category) values(?, ? , ?)';
    db.query(sql, [name, price, category], (err, result) => {
        if(err){
            console.error('Error while adding product:', err.message);
            return res.status(500).send('Unable to add product')
        }

        console.log('Product added successfully!: ', result);
        return res.status(200).send({success: true, message:'Product added successfully!'})
    })
})

app.post('/deleteProduct', (req, res)=>{
    console.log('req.body:', req.body);
    const {productId} = req.body;
    console.log('productId:', productId)
    const sql = 'delete from products where id = ?'
    db.query(sql, [productId], (err, result)=>{
        if(err){
            console.error('err:', err);
            return res.status(500).send('Unable to delete product')
        }
        console.log('Product deleted successfully!:', result);
        return res.status(200).send('Product deleted successfully!')
    })
})



app.listen(PORT, () => {
    console.log('Server is running on PORT:', PORT);
})