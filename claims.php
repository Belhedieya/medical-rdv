<?php
require_once '../config.php';
header('Content-Type: application/json');

$action = $_GET['action'] ?? '';
$user_id = $_SESSION['user_id'] ?? null;

if ($action === 'list') {
    $patient_id = $_GET['user_id'] ?? $user_id;
    $stmt = $pdo->prepare("SELECT * FROM claims WHERE user_id = ? ORDER BY created_at DESC");
    $stmt->execute([$patient_id]);
    echo json_encode($stmt->fetchAll());
}
?>

