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

if (isset($data['username']) && isset($data['password'])) {
    $user = $conn->real_escape_string($data['username']);
    $pass = $conn->real_escape_string($data['password']);

    $sql = $conn->prepare("SELECT * FROM users WHERE username=? AND password=?");
    $sql->bind_param("ss", $user, $pass);
    $sql->execute();
    $result = $sql->get_result();

    if ($result->num_rows > 0) {
        // Fetch the user's role from the database
        $row = $result->fetch_assoc();
        $role = $row['role']; // Assuming 'role' is the column name in your database

        // Construct the response based on the role
        if ($role === 'admin') {
            echo json_encode(array("status" => "success", "role" => "admin", "message" => "Login successful"));
        } else if ($role === 'professeur') {
            echo json_encode(array("status" => "success", "role" => "professeur", "message" => "Login successful"));
        } else {
            echo json_encode(array("status" => "error", "message" => "Invalid role"));
        }
    } else {
        echo json_encode(array("status" => "error", "message" => "Invalid credentials"));
    }
    $sql->close();
} else {
    echo json_encode(array("status" => "error", "message" => "Missing username or password"));
}

$conn->close();
?>
