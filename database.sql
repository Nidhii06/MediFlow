CREATE DATABASE mediflow;
USE mediflow;

CREATE TABLE doctors (
  doctor_id VARCHAR(20) PRIMARY KEY,
  name VARCHAR(100),
  password VARCHAR(50)
);

CREATE TABLE pharmacists (
  pharmacist_id VARCHAR(20) PRIMARY KEY,
  name VARCHAR(100),
  password VARCHAR(50)
);

CREATE TABLE orders (
  order_id VARCHAR(30) PRIMARY KEY,
  doctor_id VARCHAR(20),
  patient_name VARCHAR(100),
  status VARCHAR(30),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE prescriptions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id VARCHAR(30),
  details TEXT
);
