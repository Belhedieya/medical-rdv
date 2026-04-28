-- Setup MedicalApp - DB complète avec test data
CREATE DATABASE IF NOT EXISTS medical_db;
USE medical_db;

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100),
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'doctor', 'patient') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Doctors table
CREATE TABLE IF NOT EXISTS doctors (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT UNIQUE,
  specialty VARCHAR(100),
  phone VARCHAR(20),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Appointments
CREATE TABLE IF NOT EXISTS appointments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  patient_id INT,
  doctor_id INT,
  date DATE NOT NULL,
  time TIME NOT NULL,
  status ENUM('pending', 'confirmed', 'cancelled', 'completed') DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (patient_id) REFERENCES users(id),
  FOREIGN KEY (doctor_id) REFERENCES users(id)
);

-- Availabilities
CREATE TABLE IF NOT EXISTS availabilities (
  id INT AUTO_INCREMENT PRIMARY KEY,
  doctor_id INT,
  date DATE NOT NULL,
  time TIME NOT NULL,
  available TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (doctor_id) REFERENCES users(id)
);

-- Claims
CREATE TABLE IF NOT EXISTS claims (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  description TEXT NOT NULL,
  status ENUM('pending', 'resolved', 'rejected') DEFAULT 'pending',
  response TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Notifications
CREATE TABLE IF NOT EXISTS notifications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  title VARCHAR(200),
  message TEXT,
  type ENUM('info', 'success', 'warning', 'error') DEFAULT 'info',
  `read` TINYINT(1) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- CLEAR & INSERT TEST DATA
DELETE FROM notifications;
DELETE FROM claims;
DELETE FROM availabilities;
DELETE FROM appointments;
DELETE FROM doctors;
DELETE FROM users;

INSERT INTO users (username, email, password, role) VALUES
('admin1', 'admin@clinique.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin'),
('doctor1', 'doctor1@clinique.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'doctor'),
('doctor2', 'doctor2@clinique.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'doctor'),
('patient1', 'patient1@clinique.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'patient'),
('patient2', 'patient2@clinique.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'patient');

-- Password partout = "password"

-- Doctors
INSERT INTO doctors (user_id, specialty, phone) VALUES
(2, 'Cardiologue', '0123456789'),
(3, 'Pédiatre', '0987654321');

-- Dispos doctor1 (ID=2)
INSERT INTO availabilities (doctor_id, date, time) VALUES
(2, '2024-12-15', '09:00:00'),
(2, '2024-12-15', '11:00:00'),
(2, '2024-12-15', '14:00:00'),
(2, '2024-12-16', '09:00:00'),
(2, '2024-12-16', '11:00:00');

-- Dispos doctor2 (ID=3)
INSERT INTO availabilities (doctor_id, date, time) VALUES
(3, '2024-12-15', '15:00:00'),
(3, '2024-12-15', '16:00:00');

-- RDV test
INSERT INTO appointments (patient_id, doctor_id, date, time, status, notes) VALUES
(4, 2, '2024-12-15', '11:00:00', 'confirmed', 'Consultation routine'),
(5, 3, '2024-12-15', '15:00:00', 'pending', 'Bilan pédiatrique');

-- Claim test
INSERT INTO claims (user_id, description) VALUES
(4, 'Problème de rendez-vous - retard de 30min');

-- Notification test
INSERT INTO notifications (user_id, title, message, type) VALUES
(2, 'Nouveau RDV', 'Patient1 a réservé le 15/12 11h', 'success'),
(1, 'Réclamation', 'Patient1 a soumis une réclamation', 'warning');

SELECT '✅ MedicalApp DB prête ! 5 users, 7 dispos, 2 RDV' as STATUS;

