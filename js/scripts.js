const analisarRisco = () => {
    const idade = document.getElementById('idade').value;
    const imc = document.getElementById('imc').value;
    const display = document.getElementById('resultado');

    if (imc > 0.7 && idade > 0.6) {
        display.className = "alert alert-danger";
        display.innerHTML = "<h4>Decisão: Risco Alto</h4>Recomendação: Negar apólice ou exigir exames cardíacos.";
    } else {
        display.className = "alert alert-success";
        display.innerHTML = "<h4>Decisão: Risco Baixo</h4>Recomendação: Aprovação automática liberada.";
    }
}; // Fechamento correto da função

// Esta função DEVE estar fora para rodar no onload
async function carregarIndicadoresBI() {
    try {
        const response = await fetch('get_dados.php');
        const indicadores = await response.json();
        
        let html = '<table class="table"><tr><th>Idade</th><th>Risco Médio</th></tr>';
        
        indicadores.forEach(dado => {
            html += `<tr>
                        <td>${dado.faixa_idade}</td>
                        <td>${parseFloat(dado.media_risco).toFixed(2)}</td>
                     </tr>`;
        });
        
        html += '</table>';
        document.getElementById('resultado-bi').innerHTML = html;
    } catch (error) {
        console.error("Erro ao carregar dados do SAD:", error);
        document.getElementById('resultado-bi').innerHTML = "Erro ao conectar com o banco de dados.";
    }
}

window.onload = carregarIndicadoresBI;
