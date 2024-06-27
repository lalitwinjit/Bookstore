import express from "express"
import bookActions  from '../../transactional/books/books.js'

const router = express.Router()

router.post('/', async (req, res)  => {
   const responce = await bookActions.createBook(req.body)
   res.status(responce.status)
   res.json(responce)
})

router.get('/', async (req, res)  => {
    const responce = await bookActions.getAllBooks(req.body)
    res.status(responce.status)
    res.json(responce)
 })

 router.put('/', async (req, res)  => {
    const responce = await bookActions.updateBook(req.body)
    res.status(responce.status)
    res.json(responce)
 })

 router.delete('/:id', async (req, res)  => {
    const responce = await bookActions.deleteBook(req.params)
    res.status(responce.status)
    res.json(responce)
 })

 router.post('/filter', async (req, res)  => {
    const responce = await bookActions.filterBooks(req.body)
    res.status(responce.status)
    res.json(responce)
 })

 router.post('/priceRange', async (req, res)  => {
    const responce = await bookActions.getBooksByPriceRange(req.body)
    res.status(responce.status)
    res.json(responce)
 })


export default router