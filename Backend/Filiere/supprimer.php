<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header('Content-Type: application/json');

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "gestmp";

// Establish database connection
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    echo json_encode(['status' => 'error', 'message' => 'Database connection failed: ' . $conn->connect_error]);
    exit;
}

// Decode JSON input
$data = json_decode(file_get_contents("php://input"));
if ($_SERVER['REQUEST_METHOD'] === 'DELETE' && isset($data->id)) {
    // Prepare DELETE statement
    $stmt = $conn->prepare("DELETE FROM filière WHERE id = ?");
    if ($stmt === false) {
        echo json_encode(['status' => 'error', 'message' => 'Prepare failed: ' . $conn->error]);
        exit;
    }

    // Bind parameter and execute statement
    $stmt->bind_param("i", $data->id);
    if ($stmt->execute()) {
        if ($stmt->affected_rows === 1) {
            echo json_encode(['status' => 'success']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'No rows were deleted.']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Execute failed: ' . $stmt->error]);
    }

    // Close statement
    $stmt->close();
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid input or request method.']);
}

// Close database connection
$conn->close();
?>
