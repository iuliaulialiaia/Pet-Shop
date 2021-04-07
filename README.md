Test pentru programul de **Internship 2021** al **Info World**  
Candidata: **Iulia-Maria Tomulescu**

---

### Baza de date
Sistemul de gestionare al bazelor de date folosit: **PostgreSQL**
    
    CREATE DATABASE petshop;

    CREATE TABLE brand (
      id SERIAL PRIMARY KEY,
      name VARCHAR NOT NULL UNIQUE
    );

    CREATE TABLE category (
      id SERIAL PRIMARY KEY,
      name SMALLINT NOT NULL UNIQUE,
      target SMALLINT NOT NULL UNIQUE
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