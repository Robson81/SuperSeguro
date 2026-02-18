// CARREGAR DASHBOARD 
async function carregarDashboard() {
    const container = document.getElementById('resultado-bi');
    
    const selector = document.getElementById('olap-dimensao');
    const dimensao = selector ? selector.value : 'recentes';

    try {
        const res = await fetch(`get_dados.php?t=${new Date().getTime()}&group_by=${dimensao}`); 
        const dados = await res.json();
        
        container.innerHTML = ''; 

        if (dados && dados.length > 0) {
            let html = `<table class="table table-sm mt-3"><thead class="thead-light"><tr>`;
            
            if (dimensao === 'faixa_idade') {
                html += `<th>Faixa de Idade</th><th>Média de Risco</th><th>Qtd. Clientes</th>`;
            } else {
                html += `<th>Idade</th><th>Risco Individual</th>`;
            }
            
            html += `</tr></thead><tbody>`;

            dados.forEach(item => {
                const idadeExibicao = parseFloat(item.faixa_idade).toFixed(0);
                //const idadeExibicao = (parseFloat(item.faixa_idade) * 100).toFixed(0);
                const riscoExibicao = parseFloat(item.media_risco).toFixed(2);

                html += `<tr class="border-top">
                    <td>${idadeExibicao} anos</td>
                    <td>${riscoExibicao}</td>
                    ${item.total_clientes ? `<td>${item.total_clientes}</td>` : ''}
                </tr>`;
            });

            html += '</tbody></table>';
            container.innerHTML = html;
        } else {
            container.innerHTML = '<p class="text-muted mt-3">Nenhum dado histórico encontrado no DW.</p>';
        }
    } catch (error) {
        container.innerHTML = '<p class="text-danger">Erro ao carregar indicadores OLAP.</p>';
        console.error("Erro BI:", error);
    }
}

function analisarRisco() {
    const idadeInput = document.getElementById('idade').value;
    const imcInput = document.getElementById('imc').value;

    if (!idadeInput || !imcInput) {
        alert("Por favor, preencha Idade e IMC para análise.");
        return;
    }

    const idade = parseFloat(idadeInput);
    const imc = parseFloat(imcInput);
    const divResultado = document.getElementById('resultado');

    let risco;
    let mensagem;
    let alertClass;

    if (idade > 60) {
        risco = 8;
        mensagem = "Risco Alto - Negar (Fator Idade)";
        alertClass = "alert-danger";
    } else {
        if (imc >= 30) {
            risco = 8;
            mensagem = "Risco Alto - Negar (Obesidade)";
            alertClass = "alert-danger";
        } else if (imc >= 25 && idade > 45) {
            risco = 5;
            mensagem = "Risco Moderado - Avaliação Manual";
            alertClass = "alert-warning";
        } else {
            risco = 2;
            mensagem = "Risco Baixo - Aprovar";
            alertClass = "alert-success";
        }
    }

    divResultado.innerHTML = `<div class="alert ${alertClass} font-weight-bold mb-0">${mensagem}</div>`;

    //const idadeParaBanco = idade / 100;
    //const imcParaBanco = imc / 100;

    


    fetch('salvar.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json' // ESSA LINHA É OBRIGATÓRIA
    },
    body: JSON.stringify({
        idade: idade,
        imc: imc,
        risco: risco
    })
}).then(() => {
        carregarDashboard(); 
        document.getElementById('formSAD').reset(); 
    });
}

/*
    fetch('salvar.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            idade: idadeParaBanco, 
            imc: imcParaBanco, 
            risco: risco 
        })
    }).then(() => {
        carregarDashboard(); 
        document.getElementById('formSAD').reset(); 
    });
}*/

async function limparHistorico() {
    if (confirm("Deseja realmente apagar todo o histórico do Data Warehouse?")) {
        try {
            const res = await fetch('limpar.php');
            const resultado = await res.json();
            if (resultado.status === "sucesso") {
                document.getElementById('resultado').innerHTML = ''; 
                carregarDashboard(); 
            }
        } catch (e) {
            console.error("Erro ao limpar:", e);
        }
    }
}

// inicialização automática
window.onload = carregarDashboard;