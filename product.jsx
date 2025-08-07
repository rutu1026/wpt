import axios from 'axios';
import { useEffect, useState } from 'react';

const Product = () => {
    const [products, setProducts] = useState([]);
    const [openForm, setOpenForm] = useState(false);
    const [message, setMessage] = useState('')
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        category: ''
    })
    console.log('products:', products)

    const getProducts = async () => {
        try {
            const response = await axios.get('http://localhost:3001/getProducts');
            console.log('response:', response);
            const data = response.data;
            if (data.success) {
                setProducts(data?.data);
            }

        } catch (error) {
            console.error('Error while getting products:', error)
        }

    }

    useEffect(() => {
        console.log('products:', products)
        if (formData) {
            console.log('formData: ', formData);
        }
    }, [products, formData])

    useEffect(() => {
        getProducts();
    }, [])

    const handleClick = () => {
        setOpenForm(true);
    }

    const handleClose = () => {
        setOpenForm(false);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        try {
            const response = await axios.post('http://localhost:3001/addProduct', formData);
            console.log('response:', response)
            if (response?.data?.success) {
                setOpenForm(false);
                setMessage('Product added successfully !')
            }
        } catch (error) {
            console.error('Error while adding product:', error);
        }

    }

    const handleDelete = async (product) => {
        try {
            console.log('product:', product);
            const productId = product.id;
            console.log('productId:', productId);
            const response = await axios.post('http://localhost:3001/deleteProduct', { productId: productId });
            console.log('response:', response)
            if (response?.data?.success) {
                setMessage('Product deleted successfully !')
            }
        } catch (error) {
            console.error('Error while deleting product:', error);
        } finally {
            getProducts();
        }
    }

    return (
        <div className="container">
            <div className='d-flex justify-content-end'>
                <button className='btn btn-primary mb-2' onClick={openForm ? handleClose : handleClick}>{openForm ? 'Close' : 'Add Product'}</button>
            </div>

            {openForm &&
                <>
                    <div className='container card card-body col-sm-6 mb-4'>
                        <div className="mb-3">
                            <label htmlFor="Name" class="form-label" >Name</label>
                            <input
                                type="text"
                                class="form-control"
                                id="Name"
                                placeholder="name"
                                value={formData?.name}
                                onChange={(e) => handleChange(e)}
                                name='name'
                            />
                        </div>
                        <div class="mb-3">
                            <label htmlFor="Price" class="form-label">Price</label>
                            <input
                                type="text"
                                class="form-control"
                                id="Price"
                                placeholder="Price"
                                value={formData?.price}
                                onChange={(e) => handleChange(e)}
                                name='price'
                            />
                        </div>
                        <div class="mb-3">
                            <label htmlFor="category" class="form-label">Category</label>
                            <input
                                type="text"
                                class="form-control"
                                id="category"
                                placeholder="category"
                                value={formData?.category}
                                onChange={(e) => handleChange(e)}
                                name='category'
                            />
                        </div>
                        <div>
                            <button className='btn btn-success' onClick={handleSubmit}>Submit</button>
                        </div>
                    </div>

                </>
            }
            <div className='text-success'>
                {message}
            </div>
            <table className=" table table-bordered">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={index}>
                            <td>
                                {product.name}
                            </td>
                            <td>
                                {product.price}
                            </td>
                            <td>
                                {product.category}
                            </td>
                            <td>
                                <div className='btn btn-group'>
                                    <button className='btn btn-primary'>Edit</button>
                                    <button className='btn btn-danger' onClick={() => handleDelete(product)}>Delete</button>
                                </div>

                            </td>
                        </tr>
                    ))}
                    {/* <tr>
                        <td>Samsung</td>
                        <td>9000</td>
                        <td>Electronics</td>
                    </tr> */}
                </tbody>
            </table>




        </div>
    )
}

export default Product;