import  express  from 'express'
import authorRouter from './routes/author/authorRoutes.js'
import bookRoutes from './routes/books/bookRoutes.js'
import errors from './utils/errors/errors.js';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: errors.INTERNAL_SERVER_ERROR.message,
    error: err.message,
  });
});

app.use('/authors', authorRouter)
app.use('/books', bookRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
