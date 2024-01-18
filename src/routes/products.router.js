const express  = require('express'); 
const router = express.Router();

const productManager = require("../js/products")


//? http://localhost:8000/api/products/
//? http://localhost:8000/api/products/?limit=2

router.get('/',async (req,res) =>{
    const limit = parseInt(req.query.limit) || null;
    let resultado= null;
    try {
        if(limit){
            resultado = await productManager.getProductByLimit(limit)
        }else{
            resultado = await productManager.getProducts()
        }
        res.status(200).send(resultado )
    } catch (error) {
        res.status(500).send(`Mensaje de error: ${error} ${resultado}`); 
    }
})

//? http://localhost:8000/api/products/1

router.get('/:pid', async (req,res) =>{
    let id = parseInt(req.params.pid);
    let resultado = await productManager.getProductById(id)
    res.send(resultado)
})



//? http://localhost:8000/api/products/

router.post('/', (req,res) =>{
    let body= req.body;
    let resultado= productManager.addProduct(body.tittle,body.description,body.price,body.thumbnail,body.code,body.stock);
    res.send(resultado);
})

//? http://localhost:8000/api/products/

router.put('/', async (req,res) =>{
    let body= req.body;
    let resultado= await productManager.updateProduct(body.tittle,body.description,body.price,body.thumbnail,body.code,body.stock,body.pid);
    res.send(resultado);
})


//? http://localhost:8000/api/products/1

router.delete('/:pid', async (req,res) =>{
    let id = parseInt(req.params.id);
    let resultado = await productManager.deleteProduct(id)
    res.send(resultado)
})

//? Test
// http://localhost:8000/product
// http://localhost:8000/product/1
// http://localhost:8000/product/?limit=2


module.exports = router;

let productoNuevo = new productManager();
productoNuevo.delArchivo();