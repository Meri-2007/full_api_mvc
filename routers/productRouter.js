const express=require ("express")
const productRouter=express.Router()
const controller=require("../controllers/productController")
productRouter.post("/",controller.add)
productRouter.get("/:id",controller.get)
productRouter.delete("/:id",controller.delete)
productRouter.put("/:id",controller.put)
productRouter.get("/category/:kind",controller.getKind)



module.exports={productRouter}