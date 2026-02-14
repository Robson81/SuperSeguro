<?php
include 'conexao.php';

// Consulta SQL para o Dashboard (BI)
$sql = "SELECT 
            ROUND(idade_segurado, 1) as faixa_idade, 
            AVG(classificacao_risco) as media_risco 
        FROM fato_analise_risco 
        GROUP BY faixa_idade 
        ORDER BY faixa_idade ASC 
        LIMIT 10";

$stmt = $pdo->prepare($sql);
$stmt->execute();
$dados = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Retorna os dados em JSON para o seu JavaScript/ES6
echo json_encode($dados);
?>
