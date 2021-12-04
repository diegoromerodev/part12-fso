const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();
const redis = require('../redis');

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  const numberOfTodosAdded = await redis.getAsync("added_todos")
  await redis.setAsync("added_todos", (Number(numberOfTodosAdded) || 0) + 1)
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  if(req.todo) return res.send(req.todo);
  return res.sendStatus(405) // Implement this
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  if(!req.todo) return res.sendStatus(405); // Implement this
  const updates = {
      text: req.body.text || req.todo.text,
      done: req.body.done || req.todo.done
  }
  req.todo.text = updates.text;
  req.todo.done = updates.done;
  await req.todo.save();
  return res.send(req.todo);
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
