<?php
include 'conexao.php';
header('Content-Type: application/json');

$dados = json_decode(file_get_contents('php://input'), true);

if ($dados) {
    try {
        
        $sql = "INSERT INTO clientes (Ins_Age, BMI, Response) 
                VALUES (:idade, :imc, :risco)";
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':idade' => $dados['idade'],
            ':imc'   => $dados['imc'],
            ':risco' => $dados['risco']
        ]);

        echo json_encode(["status" => "sucesso"]);
    } catch (PDOException $e) {
        echo json_encode(["status" => "erro", "mensagem" => $e->getMessage()]);
    }
}
?>

