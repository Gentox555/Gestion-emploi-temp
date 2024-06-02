<?php
session_start();

if (!isset($_SESSION['username']) || ($_SESSION['role'] != 'admin' && $_SESSION['role'] != 'professeur')) {
    header("Location: index.html");
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Dashboard</title>
</head>
<body>
    <h1>Bienvenue, <?php echo $_SESSION['username']; ?>!</h1>
    <p>Vous êtes connecté en tant que <?php echo $_SESSION['role']; ?>.</p>
    <!-- Contenu du tableau de bord -->
</body>
</html>
