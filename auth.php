<?php
require_once 'config.php';

header('Content-Type: application/json');

$input = json_decode(file_get_contents('php://input'), true) ?: [];
$action = $_GET['action'] ?? $input['action'] ?? '';

switch ($action) {
    case 'login':
        $username = trim($input['username']);
        $password = $input['password'];
        $role = $input['role'];

        $stmt = $pdo->prepare('SELECT * FROM users WHERE username = ? AND role = ?');
        $stmt->execute([$username, $role]);
        $user = $stmt->fetch();

        if ($user && password_verify($password, $user['password'])) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['username'] = $user['username'];
            $_SESSION['role'] = $user['role'];

            echo json_encode([
                'success' => true,
                'user' => [
                    'id' => $user['id'],
                    'username' => $user['username']
                ],
                'role' => $user['role']
            ]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Identifiants incorrects']);
        }
        break;

    case 'register':
        $username = trim($input['username']);
        $email = trim($input['email']);
        $pass_hash = password_hash($input['password'], PASSWORD_DEFAULT);
        $role = $input['role'];

        try {
            $stmt = $pdo->prepare('INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)');
            $stmt->execute([$username, $email, $pass_hash, $role]);
            echo json_encode(['success' => true, 'message' => 'Inscription réussie']);
        } catch (PDOException $e) {
            echo json_encode(['success' => false, 'message' => 'Nom d\'utilisateur déjà pris']);
        }
        break;

    case 'session':
        if (isset($_SESSION['user_id'])) {
            $stmt = $pdo->prepare('SELECT id, username FROM users WHERE id = ?');
            $stmt->execute([$_SESSION['user_id']]);
            $user = $stmt->fetch();
            echo json_encode([
                'success' => true,
                'user' => $user,
                'role' => $_SESSION['role'] ?? null
            ]);
        } else {
            echo json_encode(['success' => false]);
        }
        break;

    case 'logout':
        session_destroy();
        echo json_encode(['success' => true]);
        break;
}
?>

