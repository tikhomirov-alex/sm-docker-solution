CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    article VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    quantity DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO products (article, name, price, quantity) VALUES
('ART001', 'Товар 1', 100.00, 10),
('ART002', 'Товар 2', 200.00, 25),
('ART003', 'Товар 3', 300.00, 30),
('ART004', 'Товар 4', 400.00, 5),
('ART005', 'Товар 5', 500.00, 15),
('ART006', 'Товар 6', 100.00, 25),
('ART007', 'Товар 7', 200.00, 40),
('ART008', 'Товар 8', 300.00, 65),
('ART009', 'Товар 9', 400.00, 10),
('ART010', 'Товар 10', 500.00, 5),
('ART011', 'Товар 11', 100.00, 10),
('ART012', 'Товар 12', 200.00, 5);