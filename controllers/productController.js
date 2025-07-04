const fs = require("fs/promises")

class ProductController {
    async add(req, res) {
        const newProd = req.body
        const data = await fs.readFile("./products.json", "utf8")
        const prods = JSON.parse(data)
        prods.push(newProd)
        await fs.writeFile("./products.json", JSON.stringify(prods), "utf-8")
        res.send({ status: "added" })

        console.log(req.body)
    }
    async get(req, res) {
        const ProdId = String(req.params.id)
        const data = await fs.readFile("./products.json", "utf-8")
        let prods = []
        prods = JSON.parse(data)
        const prod = prods.find(p => p.id === ProdId)
        if (prod) {
            res.send({ status: "ok", prod })
        } else {
            res.status(404).send({ error: "product not found" })
        }


    }

    async delete(req, res) {
        const ProdId = String(req.params.id)
        const data = await fs.readFile("./products.json", "utf-8")
        let prods = []
        prods = JSON.parse(data)
        const update = prods.filter(p => p.id !== ProdId)
        await fs.writeFile("./products.json", JSON.stringify(update), "utf-8")

        res.send({ status: "deleted" })

    }
    async put(req, res) {
        const ProdId = String(req.params.id)
        const newProd = req.body
        const data = await fs.readFile("./products.json", "utf-8")
        let prods = []
        prods = JSON.parse(data)
        const index = prods.findIndex(p => p.id === ProdId)
        prods[index] = { ...prods[index], ...newProd }

        await fs.writeFile("./products.json", JSON.stringify(prods), "utf-8")
        res.send({ status: "updated", prods: prods[index] })



    }
    async getKind(req, res) {
        const kind = req.params.kind
        const data = await fs.readFile("./products.json", "utf-8")
        const prods = JSON.parse(data)
        const filtered = prods.filter(p => p.category === kind)
        if (filtered.length > 0) {
            res.send({ status: "ok", products: filtered });
        }
    }


} module.exports = new ProductController()