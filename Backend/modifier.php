<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "gestmp";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(['status' => 'error', 'message' => 'Database connection failed: ' . $conn->connect_error]));
}

$prof = json_decode(file_get_contents("php://input"));

if(isset($prof->nom, $prof->prenom, $prof->email, $prof->specialite, $prof->id)) {
    $stmt = $conn->prepare("UPDATE professeurs SET nom = ?, prenom = ?, email = ?, specialite = ? WHERE id = ?");
    
    if ($stmt === false) {
        die(json_encode(['status' => 'error', 'message' => 'Prepare failed: ' . $conn->error]));
    }
    
    $stmt->bind_param("ssssi", $prof->nom, $prof->prenom, $prof->email, $prof->specialite, $prof->id);
    
    if ($stmt->execute()) {
        if ($stmt->affected_rows === 1) {
            echo json_encode(['status' => 'success']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'No rows were updated.']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Execute failed: ' . $stmt->error]);
    }
    
    $stmt->close();
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid input.']);
}

$conn->close();
?>
