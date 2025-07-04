const express=require ("express")
const userRouter=express.Router()
const controller=require("../controllers/userController.js")
userRouter.post("/",controller.add)
userRouter.get("/:id",controller.get)
userRouter.delete("/:id",controller.delete)
userRouter.put("/:id",controller.put)
    



module.exports={userRouter}