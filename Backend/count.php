<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "gestmp";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Récupérer le nombre de départements
$departement_count_query = "SELECT COUNT(*) as count FROM departement";
$departement_result = $conn->query($departement_count_query);
$departement_count = $departement_result->fetch_assoc()['count'];

$professeur_count_query = "SELECT COUNT(*) as count FROM users where role ='professeur'";
$professeur_result = $conn->query($professeur_count_query);
$professeur_count = $professeur_result->fetch_assoc()['count'];

$filière_count_query = "SELECT COUNT(*) as count FROM filière";
$filière_result = $conn->query($filière_count_query);
$filière_count = $filière_result->fetch_assoc()['count'];


$conn->close();

$response = array(
    "departement_count" => $departement_count,
    "professeur_count" => $professeur_count,
    "filière_count" => $filière_count
);

echo json_encode($response);
?>
