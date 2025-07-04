const fs = require("fs/promises")

class UserController {
    async add(req, res) {
        const newUser = req.body
        const data = await fs.readFile("./users.json", "utf8")
        const users = JSON.parse(data)
        users.push(newUser)
        await fs.writeFile("./users.json", JSON.stringify(users), "utf-8")
        res.send({ status: "added" })

        console.log(req.body)
    }
    async get(req, res) {
        const userId = String(req.params.id)
        const data = await fs.readFile("./users.json", "utf-8")
        let users = []
        users = JSON.parse(data)
        const user = users.find(u => u.id === userId)
        if (user) {
            res.send({ status: "ok", user })
        } else {
            res.status(404).send({ error: "User not found" })
        }


    }

    async delete(req, res) {
        const userId = String(req.params.id)
        const data = await fs.readFile("./users.json", "utf-8")
        let users = []
        users = JSON.parse(data)
        const update = users.filter(u => u.id !== userId)
        await fs.writeFile("./users.json", JSON.stringify(update), "utf-8")

        res.send({ status: "deleted" })

    }
    async put(req, res) {
        console.log("ok")
        const userId = String(req.params.id)
        const newUserData = req.body
        const data = await fs.readFile("./users.json", "utf-8")
        let users = []
        users = JSON.parse(data)
        const index = users.findIndex(u => u.id === userId)
        users[index] = { ...users[index], ...newUserData}

        await fs.writeFile("./users.json", JSON.stringify(users), "utf-8")
        res.send({ status: "updated", user: users[index] })


    }
} module.exports = new UserController() 