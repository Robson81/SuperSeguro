<?php
include 'conexao.php';
header('Content-Type: application/json');

try {
    $sql = "TRUNCATE TABLE clientes";
    $pdo->exec($sql);
    echo json_encode(["status" => "sucesso"]);
} catch (PDOException $e) {
    echo json_encode(["status" => "erro", "mensagem" => $e->getMessage()]);
}
?>