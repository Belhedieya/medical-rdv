<?php
require_once '../config.php';
header('Content-Type: application/json');

$action = $_GET['action'] ?? 'list';

if ($action === 'list') {
    try {
        $stmt = $pdo->query("
            SELECT u.*, d.specialty 
            FROM users u 
            LEFT JOIN doctors d ON u.id = d.user_id 
            ORDER BY u.role, u.username
        ");
        $users = $stmt->fetchAll();
        echo json_encode($users);
    } catch (PDOException $e) {
        echo json_encode(['error' => $e->getMessage()]);
    }
}
?>

