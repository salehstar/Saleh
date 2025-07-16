const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const authRouter = require('./routes/auth');
const mealsRouter = require('./routes/meals');
const fastHoursRouter = require('./routes/fast-hours');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from FastiCal backend!');
});

app.use('/auth', authRouter);
app.use('/meals', mealsRouter);
app.use('/fast-hours', fastHoursRouter);

app.listen(port, () => {
  console.log(`FastiCal backend listening at http://localhost:${port}`);
});
