Test pentru programul de **Internship 2021** al **Info World**  
Candidata: **Iulia-Maria Tomulescu**

---

### Arhitectura aplicatiei
1. HTTP REST API
   ```
      GET /brand
      GET /brand/:id
      POST /brand
      PUT /brand/:id
      DELETE /brand/:id
   
      GET /category
      GET /category/:id
      POST /category
      PUT /category/:id
      DELETE /category/:id
   
      GET /product
      GET /product/:id
      POST /product
      PUT /product/:id
      DELETE /product/:id
   ```
2. Monolith
3. Single Page
4. Relational  
Sistemul de gestionare al bazelor de date: **PostgreSQL**


### Baza de date

    CREATE DATABASE petshop;

    CREATE TABLE brand (
      id SERIAL PRIMARY KEY,
      name VARCHAR NOT NULL UNIQUE
    );

    CREATE TABLE category (
      id SERIAL PRIMARY KEY,
      name SMALLINT NOT NULL,
      target SMALLINT NOT NULL,
      CONSTRAINT name_target UNIQUE (name, target)
    );

    CREATE TABLE product (
      id SERIAL PRIMARY KEY,
      name VARCHAR NOT NULL,
      price MONEY NOT NULL,
      quantity INTEGER,
      description TEXT,
      comments TEXT,
      rating SMALLINT,
      brand_id INTEGER REFERENCES brand(id),
      category_id INTEGER REFERENCES category(id)
    );

 API-ul se conecteaza la baza de date folosind **pooling connection**, deoarece se vor face multe cereri catre baza de date.
