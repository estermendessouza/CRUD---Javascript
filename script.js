var dados = [];
var funcionarios = [];

function ApagaRegistro(ID) {
    let confirmacao = confirm("Deseja apagar esse registro?");
    if (confirmacao) {
        for (let i = 0; i < funcionarios.length; i++) {
            if (funcionarios[i].id == ID) {
                funcionarios.splice(i, 1);
            }
        }
        popula_tabela()
    }
}


//onclick="ApagaRegistro(${item.nome});

function EditaRegistro(ID) {
    $("#ModalFuncionario").modal("show")
    funcionarios.forEach(function(item) {
        if (item.id == ID) {
            $("#hdID").val(item.id);
            $("#txtNomeFuncionario").val(item.nome);
            $("#txtApelido").val(item.apelido);
            $("#txtIdade").val(item.idade);
        }
    })
}

function popula_tabela() {

    // banco de dados do navegador

    if (Array.isArray(funcionarios)) {
        localStorage.setItem("__funcionarios__", JSON.stringify(funcionarios));
        $("#tblFuncionarios tbody").html("")
        funcionarios.forEach(function(item) {
            //template string
            $("#tblFuncionarios tbody").append(`
            <tr>
                <td>${item.id}</td>
                <td>${item.nome}</td>
                <td>${item.apelido}</td>
                <td>${item.idade}</td>
                <td><button type="button" class="btn btn-primary" onclick="EditaRegistro(${item.id});"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
              </svg></button></td>
                <td><button type="button" class="btn btn-danger excluir" onclick="ApagaRegistro(${item.id});"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclude" viewBox="0 0 16 16">
                <path d="M0 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2H2a2 2 0 0 1-2-2V2zm12 2H5a1 1 0 0 0-1 1v7h7a1 1 0 0 0 1-1V4z"/>
              </svg></button></td>
            </tr>`)
        })
    }
}
$(function() {
    // executa ao carregar a tela

    funcionarios = JSON.parse(localStorage.getItem("__funcionarios__")) || []; //armazena os dados nos cookies
    if (funcionarios) {
        popula_tabela();
    }

    $("#btnSalvarFuncionario").click(function() {
        let _id = $("#hdID").val();
        let nome = $("#txtNomeFuncionario").val();
        let apelido = $("#txtApelido").val();
        let idade = $("#txtIdade").val();


        if (!_id || _id == 0) {
            let cadastro = {}

            cadastro.nome = nome;
            cadastro.apelido = apelido;
            cadastro.idade = idade;

            cadastro.id = funcionarios.length + 1;
            funcionarios.push(cadastro);
        } else {
            funcionarios.forEach(function(item) {
                if (item.id == _id) {
                    item.nome = nome;
                    item.apelido = apelido;
                    item.idade = idade;
                }
            })
        }
        alert("O funcionário foi cadastrado com sucesso");

        $("#hdID").val("0");
        $("#txtNomeFuncionario").val("");
        $("#txtApelido").val("");
        $("#txtIdade").val("");
        popula_tabela();
    })
})