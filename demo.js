import { Directus } from '@directus/sdk';
import * as http from 'http';

const directus = new Directus('https://s49l27f5.directus.app/');
const articles = directus.items('articles');
const orders = directus.items('orders');
const order_rows = directus.items('order_rows');

async function getArticles() {
  const articoli = await articles.readByQuery();
  return articoli.data;
}

async function getOrders() {
  const ordini = await orders.readByQuery();
  return ordini.data;
}

async function getOrderRows() {
  const rows = order_rows.readByQuery();
  return rows.data;
}

async function start() {
  /*let authenticated = false;

  await directus.auth
    .refresh()
    .then(() => {
      authenticated = true;
    })
    .catch(() => {});

  while (!authenticated) {
    const email = window.prompt('Email: ');
    const password = window.prompt('password: ');
    await directus.auth
      .login({
        email,
        password,
      })
      .then(() => {
        authenticated = true;
      })
      .catch(() => {
        window.alert('Credenziali non valide');
      });
    }
*/
}

async function createArticle() {
  return await directus
    .items('articles')
    .createOne({ name: 'ciao', price: 1.5 });
}

async function deleteArticle(id) {
  return await articles.deleteOne(id);
}

async function updateArticle(id) {
  return await articles.updateOne(id, { name: 'articolo aggiornato via api' });
}

async function getAllArticleWithPriceGreaterThen(value) {
  const articoli = await articles.readByQuery({
    filter: { price: { _gte: 1.5 } },
  });
  return articoli.data;
}

const server = http.createServer(async (req, res) => {
  if (req.url === '/') {
    //let orders = await getOrders();
    //console.log(await createArticle());
    //console.log(await deleteArticle(15));
    //console.log(await updateArticle(8));
    //let articles = await getArticles();
    //let orderRows = await getOrderRows();
    //res.write(JSON.stringify(articles));
    try {
      const articoli = await getAllArticleWithPriceGreaterThen(2);
      res.write(JSON.stringify(articoli));
    } catch (err) {
      console.error(err);
    }
    //console.log(await getAllArticleWithPriceGreaterThen(2));
    //res.write(JSON.stringify(orderRows));
  } else {
    res.write('Benvenuto sul mio profilo');
  }
  //res.write('benvenuto');
  res.end();
});
server.listen(8080);
