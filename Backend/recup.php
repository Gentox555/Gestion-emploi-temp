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

// Requête pour récupérer les professeurs
$sql = "SELECT nom, prenom, username AS email, spécialité FROM users WHERE role = 'professeur'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Convertir les résultats en tableau associatif
    $professeurs = array();
    while ($row = $result->fetch_assoc()) {
        $professeurs[] = $row;
    }
    echo json_encode(array("status" => "success", "professeurs" => $professeurs));
} else {
    echo json_encode(array("status" => "error", "message" => "Aucun professeur trouvé"));
}

$conn->close();
?>
