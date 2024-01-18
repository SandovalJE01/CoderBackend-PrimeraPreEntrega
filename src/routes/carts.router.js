const express  = require('express'); 
const router = express.Router();

const cartManager = require("../js/carts")
const productManager = require("../js/products")

//? http://localhost:8000/api/carts/1
router.get('/:cid', async (req,res) =>{
    let cid = parseInt(req.params.cid);
    let resultado = await cartManager.readCartByID(cid)
    res.send(resultado)
})

//? http://localhost:8000/api/carts/

router.post('/', (req,res) =>{
    let resultado = cartManager.initProduct();
    res.status(201).send('Inicializado');
})

//? http://localhost:8000/api/carts/1/product/1

router.put('/:cid/product/:pid', async (req,res) =>{
    let cid = parseInt(req.params.cid);
    let pid = parseInt(req.params.pid);
    let body= req.body;
    let resultadoCart = await cartManager.existCartByID(cid)
    let resultadoProduct = await productManager.existProductByID(pid)
    
    if(resultadoCart && resultadoProduct){
        resultado= await cartManager.updateCart(cid,pid,body.quantity)
        res.send(resultado)
    }else{
        if(!resultadoCart){
            res.send(`Cart Not Found ${cid}` )
        } 
        if(!resultadoProduct){
            res.send(`Product Not Found ${pid}` )
        } 
        
    }
})


router.delete('/:pid', async (req,res) =>{
    let id = parseInt(req.params.id);
    let resultado = await productManager.deleteProduct(id)
    res.send(resultado)
})


module.exports = router;
