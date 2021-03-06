import { useState } from "react";
import "./newProduct.css";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../../firebase'
import {useDispatch} from 'react-redux'
import {addProduct} from '../../redux/apiCalls'

export default function NewProduct() {
  const [ productData, setProductData ] = useState({})
  const [ media, setMedia ] = useState(null)
  const [ cat, setCat ] = useState([])
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setProductData(prev => {
      return {...prev, [e.target.name]: e.target.value}
    })
  }

  const handleCat = (e) => {
    setCat(e.target.value.split(','))
  }
  
  const handleClick = (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + media.name;
    const storage = getStorage(app)
    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, media);

 uploadTask.on('state_changed', 
  (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
        default:
    }
  }, 
  (error) => {
    // Handle unsuccessful uploads
  }, 
  () => {
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      const product = {...productData, img: downloadURL, categories: cat}
      addProduct(product,dispatch)
    });
  }
);

  }

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input type="file" id="file" onChange={(e)=>setMedia(e.target.files[0])} />
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input name="title" type="text" placeholder="Product Title..." onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input name="desc" type="text" placeholder="Description..." onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input name="price" type="Number" placeholder="Price" onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Categories</label>
          <input type="text" placeholder="shirt,jacket" onChange={handleCat} />
        </div>
        <div className="addProductItem" >
          <label>Stock</label>
          <select name="inStock" onChange={handleChange}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <button onClick={handleClick} className="addProductButton">Create</button>
      </form>
    </div>
  );
}
