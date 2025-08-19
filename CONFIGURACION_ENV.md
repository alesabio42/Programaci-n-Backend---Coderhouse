# CONFIGURACION_ENV

Este documento detalla los archivos `.env` requeridos para la ejecución del proyecto.

---

## .env.production
```
PORT=8080
MODO=produccion
PRIVATE_KEY=palabrasecretaparatoken
MONGO_URL=mongodb+srv://alejandrosabio24:aslaebio12344321@alejandrosabio.fo2mcjv.mongodb.net/ecommerce?retryWrites=true&w=majority
PERSISTENCE=MONGO
```

---

## .env.development
```
PORT=8080
MODO=desarrollo
PRIVATE_KEY=palabrasecretaparatoken
MONGO_URL=mongodb+srv://alejandrosabio24:aslaebio12344321@alejandrosabio.fo2mcjv.mongodb.net/ecommerce?retryWrites=true&w=majority
PERSISTENCE=MONGO

GMAIL_USER_APP=coderhousep@gmail.com
GMAIL_PASS_APP=ceqb bvye cehi cwqg

STRIPE_PUBLIC_KEY=pk_test_51PQYsxENZQYi0JUNAYOAJyEXEvs343aSq1Yjrc9f1QXKzYv5eUmnw5fZPYTEPiVdwVU3Lu2O3G26FkZWbKYifqh800eixLPvVr
STRIPE_SECRET_KEY=sk_test_51PQYsxENZQYi0JUNWj2z0oeRWO2rvpKsnVjZhyrA2dRc2bbBoYbUEAfNxU6ddo6lvi7KrwJibTFIjcHFijyYoTdq00PVlIV1AA
```
