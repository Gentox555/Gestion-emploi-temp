<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "gestmp";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(['status' => 'error', 'message' => 'Database connection failed: ' . $conn->connect_error]));
}

$sql = "SELECT nom, datefi FROM filière";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $filière = [];
    while($row = $result->fetch_assoc()) {
        $filière[] = $row;
    }
    echo json_encode(['status' => 'success', 'filière' => $filière]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'No filière found']);
}

$conn->close();
?>
