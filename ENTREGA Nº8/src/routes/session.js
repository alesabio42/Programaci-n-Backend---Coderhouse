const { Router} = require('express');
const router = Router();




router.get('/', (req, res) => {
    if (req.session.counter) {
      req.session.counter++;
      res.send(`Has visitado el sitio ${req.session.counter} veces.`);
    } else {
      req.session.counter = 1;
      res.send('Bienvenido a la página.');
    }
  });

  router.get('/logout', (req, res) => {
    req.session.destroy(error => {
      if (error) {
        return res.send('Logout error');
      }
      res.json({ status: 'success', message: 'Logout OK' });
    });
  });

router.get('/setcookie', (req, res) => {
    // Configurar la cookie
    res.cookie('miCookie', 'Hola, esta es mi cookie', { maxAge: 900000}).send('Cookie configurada correctamente');
  });
  router.get('/setcookiesigned', (req, res) => {
    // Configurar la cookie
    res.cookie('miCookie', 'Hola, esta es mi cookie firmada', { maxAge: 900000, signed:true}).send('Cookie configurada correctamente');
  });
  
  router.get('/getcookie', (req, res) => {
  
    res.send(req.cookies);
  });
  
  
  router.get('/getcookiesigned', (req, res) => {
    console.log(req.signedCookies)
  
    res.send(req.signedCookies);
  });
  
  
  
  router.get('/deletecookie', (req, res) => {
  
  
  
    res.clearCookie('miCookie').send('Cookie borrada');
  });
  
// Exportar router
module.exports = router
