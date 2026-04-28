<?php
require_once '../config.php';
header('Content-Type: application/json');

$action = $_GET['action'] ?? '';
$user_id = $_SESSION['user_id'] ?? null;

if (!$user_id || $_SESSION['role'] !== 'doctor') {
    echo json_encode([]);
    exit;
}

if ($action === 'list') {
    $stmt = $pdo->prepare("SELECT * FROM availabilities WHERE doctor_id = ? ORDER BY date, time");
    $stmt->execute([$user_id]);
    echo json_encode($stmt->fetchAll());
}
?>

