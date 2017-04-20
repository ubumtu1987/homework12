/*
CREATE DATABASE Bamazon;

USE Bamazon;

CREATE TABLE products (
  item_id  int NOT NULL AUTO_INCREMENT,
  product_name  VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price INT NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);

*/


USE Bamazon;
INSERT INTO products (product_name , department_name, price, stock_quantity)
VALUES ( "p1" , "d1" , 40 , 5);
INSERT INTO products (product_name , department_name, price, stock_quantity)
VALUES ( "p2" , "d1" , 70 , 40);
INSERT INTO products (product_name , department_name, price, stock_quantity)
VALUES ( "p3" , "d1" , 10 , 50);
INSERT INTO products (product_name , department_name, price, stock_quantity)
VALUES ( "p4" , "d2" , 35 , 5);
INSERT INTO products (product_name , department_name, price, stock_quantity)
VALUES ( "p5" , "d2" , 25 , 9);
INSERT INTO products (product_name , department_name, price, stock_quantity)
VALUES ( "p6" , "d3" , 8 , 66);
INSERT INTO products (product_name , department_name, price, stock_quantity)
VALUES ( "p7" , "d4" , 20 , 2);
INSERT INTO products (product_name , department_name, price, stock_quantity)
VALUES ( "p8" , "d4" , 30 , 5);
INSERT INTO products (product_name , department_name, price, stock_quantity)
VALUES ( "p9" , "d5" , 11 , 20);
INSERT INTO products (product_name , department_name, price, stock_quantity)
VALUES ( "p10" , "d5" , 7 , 15);

