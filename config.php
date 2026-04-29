<?php
// Config DB
$host = 'localhost';
$dbname = 'medical_db';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    die('Erreur DB: ' . $e->getMessage());
}

// Start session for all
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}
?>

