import express, { ErrorRequestHandler } from "express";
import logger from 'morgan';
const boardRouter = require('./api/routes/board');
const validatorRouter = require('./api/routes/validator')

const app = express();
const port = 1337

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
} as ErrorRequestHandler);

app.get('/', async (req, res) => {
    console.log('rrrr')
    res.send('OK, this works, right?')
})

app.use('/new', boardRouter)
app.use('/validate', validatorRouter)

app.listen(port, () => {
    console.log(`App running on port ${port}`)
})

module.exports = app;