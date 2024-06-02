<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "gestmp";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(['status' => 'error', 'message' => 'Database connection failed: ' . $conn->connect_error]));
}

$data = json_decode(file_get_contents("php://input"));

if (isset($data->nom, $data->prenom, $data->jour, $data->heureDebut, $data->heureFin)) {
    $stmt = $conn->prepare("INSERT INTO disponibilites (nom, prénom, jour_semaine, heure_debut, heure_fin) VALUES (?, ?, ?, ?, ?)");
    if ($stmt === false) {
        die(json_encode(['status' => 'error', 'message' => 'Prepare failed: ' . $conn->error]));
    }

    $stmt->bind_param("sssss", $data->nom, $data->prénom, $data->jour, $data->heureDebut, $data->heureFin);

    if ($stmt->execute()) {
        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Execute failed: ' . $stmt->error]);
    }

    $stmt->close();
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid input.']);
}

$conn->close();
?>
