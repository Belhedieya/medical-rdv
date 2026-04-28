<?php
require_once '../config.php';
header('Content-Type: application/json');

$action = $_GET['action'] ?? '';
$user_id = $_SESSION['user_id'] ?? null;
$role = $_SESSION['role'] ?? '';

if (!$user_id) {
    echo json_encode([]);
    exit;
}

if ($action === 'list') {
    try {
        if ($role === 'doctor') {
            // Doctor vue ses RDV
            $stmt = $pdo->prepare("
                SELECT a.*, u.username as patient_username 
                FROM appointments a 
                JOIN users u ON a.patient_id = u.id 
                WHERE a.doctor_id = ? 
                ORDER BY a.date ASC, a.time ASC
            ");
            $stmt->execute([$user_id]);
        } elseif ($role === 'patient') {
            $patient_id = $_GET['patient_id'] ?? $user_id;
            $stmt = $pdo->prepare("
                SELECT a.*, u.username as doctor_username 
                FROM appointments a 
                JOIN users u ON a.doctor_id = u.id 
                WHERE a.patient_id = ? 
                ORDER BY a.date ASC, a.time ASC
            ");
            $stmt->execute([$patient_id]);
        } else {
            // Admin - tous
            $stmt = $pdo->query("SELECT a.*, pu.username as patient_name, du.username as doctor_name FROM appointments a JOIN users pu ON a.patient_id = pu.id JOIN users du ON a.doctor_id = du.id ORDER BY a.date ASC, a.time ASC");
        }
        
        $appointments = $stmt->fetchAll();
        echo json_encode($appointments);
    } catch (PDOException $e) {
        echo json_encode(['error' => $e->getMessage()]);
    }
}
?>

