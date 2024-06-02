<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "gestmp";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(array("status" => "error", "message" => "Connection failed: " . $conn->connect_error)));
}

$data = json_decode(file_get_contents("php://input"), true);

// Vérifier si les données nécessaires sont présentes
if (isset($data['nom'])  && isset($data['prenom']) && isset($data['email']) && isset($data['specialite'])) {

    // Génération du mot de passe
    $id=10;
    $password = strtoupper(substr($data['nom'], 0, 3)) .$id. strtoupper(substr($data['prenom'], 0, 3)) . '@' . strtoupper(substr('professeur', 0, 3));

    // Requête d'insertion
    $insertSql = $conn->prepare("INSERT INTO users (nom, prenom, username, spécialité, password, role) VALUES (?, ?, ?, ?, ?, 'professeur')");
    $insertSql->bind_param("sssss", $data['nom'], $data['prenom'], $data['email'], $data['specialite'], $password);

    if ($insertSql->execute()) {
        echo json_encode(array("status" => "success", "message" => "User added successfully"));
    } else {
        echo json_encode(array("status" => "error", "message" => "Failed to add user"));
    }

    $insertSql->close();
} else {
    echo json_encode(array("status" => "error", "message" => "Missing required data"));
}

$conn->close();
?>
