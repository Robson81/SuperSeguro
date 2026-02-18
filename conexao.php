<?php
$host = "localhost";
$user = "root";
$pass = "";
$db   = "super_seguro";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8mb4", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    header('Content-Type: application/json');
    die(json_encode(["status" => "erro", "mensagem" => "Falha na conexão: " . $e->getMessage()]));
}
?>
