import app, { port } from './app';

app.listen(port, () => {
  return console.log(`Server started in port ${port}`);
});
