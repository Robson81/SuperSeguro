<?php
include 'conexao.php';

header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Pragma: no-cache");
header('Content-Type: application/json');

try {
    
    $group_by = isset($_GET['group_by']) ? $_GET['group_by'] : 'recentes';

    if ($group_by === 'faixa_idade') {
        
        $sql = "SELECT 
                    ROUND(Ins_Age, 2) as faixa_idade, 
                    ROUND(AVG(Response), 2) as media_risco, 
                    COUNT(*) as total_clientes 
                FROM clientes 
                GROUP BY faixa_idade 
                ORDER BY faixa_idade ASC";
    } else {
        
        $sql = "SELECT 
                    ROUND(Ins_Age, 2) as faixa_idade, 
                    Response as media_risco, 
                    1 as total_clientes 
                FROM clientes 
                ORDER BY Id DESC 
                LIMIT 5";
    }

    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $dados = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($dados ? $dados : []);

} catch (Exception $e) {
    echo json_encode(["erro" => "Erro no servidor: " . $e->getMessage()]);
}
?>
