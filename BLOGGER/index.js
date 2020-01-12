const express = require('express');
const flash = require('connect-flash');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoBlog = require('connect-mongodb-session')(session);
const homeRoutes = require('./routes/home');
const addRoutes = require('./routes/add');
const postsRoutes = require('./routes/posts');
const authRoutes = require('./routes/auth');
const varMiddleware = require('./middleware/variables');
const userMiddleware = require('./middleware/user');

const MONGODB_URI = `mongodb+srv://anastasiya:JvOyrV3xQXSNfIY5@cluster0-k5fwt.mongodb.net/blog?retryWrites=true&w=majority`;
const app = express();

const blog = new MongoBlog({
  collection: 'sessions',
  uri: MONGODB_URI
});

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'some secret value',
    resave: false,
    saveUninitialized: false,
    blog
  })
);
app.use(flash());
app.use(varMiddleware);
app.use(userMiddleware);

// регистрация роутов
app.use('/', homeRoutes);
app.use('/add', addRoutes);
app.use('/posts', postsRoutes);
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}

start();
