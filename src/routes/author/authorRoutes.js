import express from "express"
import authorActions  from '../../transactional/author/author.js'

const router = express.Router()

router.post('/', async (req, res)  => {
   const responce = await authorActions.createAuthor(req.body)
   res.status(responce.status)
   res.json(responce)
})

router.get('/', async (req, res)  => {
    const responce = await authorActions.getAllAuthors(req.body)
    res.status(responce.status)
    res.json(responce)
 })

 router.put('/', async (req, res)  => {
    const responce = await authorActions.updateAuthor(req.body)
    res.status(responce.status)
    res.json(responce)
 })

 router.delete('/:id', async (req, res)  => {
    const responce = await authorActions.deleteAuthor(req.params)
    res.status(responce.status)
    res.json(responce)
 })


export default router