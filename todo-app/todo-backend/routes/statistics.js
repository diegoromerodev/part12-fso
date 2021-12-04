const router = require('express').Router()
const redis = require('../redis')

router.get("/", async (_, res) => {
    const numberOfTodosAdded = await redis.getAsync("added_todos")
    res.send({ added_todos: Number(numberOfTodosAdded) || 0 })
})

module.exports = router