require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

// routes
const authRouter = require('./routes/authRouter');
const walletRouter = require('./routes/walletRouter');
// packages
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');
// middlewares
const errorMiddleware = require('./middlewares/errorMiddleware');

app.use(express.json());
app.use(helmet());
app.use(xss());
app.use(cookieParser(process.env.ACCESS_TOKEN));
app.use(morgan('tiny'));
app.use(
    cors({
        credentials: true,
        origin: 'http://localhost:8080'
    })
);
app.use(
    rateLimiter({
        windowMs: 15 * 60 * 1000,
        max: 60
    })
);

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/wallet', walletRouter);
app.use(errorMiddleware);

const PORT = process.env.PORT || 5555;

app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}...`);
});

module.exports = app;
