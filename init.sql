CREATE TYPE role AS ENUM ('admin', 'staff', 'owner', 'customer');
CREATE EXTENSION citext;

CREATE TABLE users (
    id serial PRIMARY KEY,
    created_at timestamp DEFAULT NOW(),
    
    role role,
    email citext UNIQUE,
    password text,
    first_name text,
    last_name text
);

INSERT INTO users(
    role, 
    email, 
    password, 
    first_name, 
    last_name
) VALUES(
    'admin', 
    'test@user.com', 
    'password', 
    'Georges', 
    'Abitbol'
);



CREATE TABLE locations (
    id serial PRIMARY KEY,
    created_at timestamp DEFAULT NOW(),
    owner serial REFERENCES users(id) ON DELETE CASCADE,
    
    area int,
    address text,
    capacity int,
    price money,
    available boolean
);

CREATE TABLE reservations (
    id serial PRIMARY KEY,
    created_at timestamp DEFAULT NOW(),

    location serial REFERENCES locations(id) ON DELETE CASCADE,
    customer serial REFERENCES users(id) ON DELETE CASCADE,


    date_start date, 
    date_end date,
    price money

);


