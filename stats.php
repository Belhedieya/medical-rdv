<?php
require_once '../config.php';
header('Content-Type: application/json');

// Stats dashboard
try {
    // Count patients
    $stmt = $pdo->query("SELECT COUNT(*) as count FROM users WHERE role = 'patient'");
    $patients = $stmt->fetch()['count'];

    // Count doctors
    $stmt = $pdo->query("SELECT COUNT(*) as count FROM users WHERE role = 'doctor'");
    $doctors = $stmt->fetch()['count'];

    // Total appointments
    $stmt = $pdo->query("SELECT COUNT(*) as count FROM appointments");
    $total_appts = $stmt->fetch()['count'];

    // Total claims
    $stmt = $pdo->query("SELECT COUNT(*) as count FROM claims");
    $total_claims = $stmt->fetch()['count'];

    echo json_encode([
        'patients' => $patients,
        'doctors' => $doctors,
        'total_appointments' => $total_appts,
        'total_claims' => $total_claims
    ]);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>

