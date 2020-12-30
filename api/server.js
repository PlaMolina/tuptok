const express = require('express');
const cors = require('cors');
const authMiddleware = require('./middlewares/tokenMiddleware');
const Config = require('./config/config');
const usersRouter = require('./routes/usersController');
const rankingRouter = require('./routes/rankingController');
const tupersRouter = require('./routes/tupersController');
const ofertasRouter = require('./routes/ofertasController');
const accountRouter = require('./routes/accountController');

const { verifyToken } = authMiddleware;
const { port } = Config;
const app = express();
app.use(cors());

app.use(express.json());


app.use("/account", accountRouter);
app.use("/img", express.static('uploads'));

app.use("/", express.static('public'));
app.use('/users', usersRouter);
app.use('/ranking', rankingRouter);
app.use('/tupers', tupersRouter);
app.use('/ofertas', ofertasRouter);

app.listen(port, () => console.log("Listening on port " + port));