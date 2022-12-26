function voltar() {
    window.location.href = 'home.html'
}

function formatDate(date){
    return new Date(date).toLocaleDateString('pt-br');
}

function saveOperation(){
    showLoading();
    const operation = createOperation();

    if(isNewOperation()){
        save(operation);
        
    } else {
        update(operation);
        
        if(operation.status == 'Entregue'){
            saveEntrega(operation);
        }
    }
    
}

function saveEntrega(operation){

    firebase.firestore()
    .collection('entregas')
    .add(operation)
    .then(()=>{
        hideLoading();
        window.location.href = 'home.html'
    })
    .catch(()=>{
        hideLoading();
        alert('Erro ao adicionar encomenda')
    })
}



function save(operation){
    firebase.firestore()
        .collection('operation')
        .add(operation)
        .then(()=>{
            hideLoading();
            window.location.href = 'home.html'
        })
        .catch(()=>{
            hideLoading();
            alert('Erro ao adicionar encomenda')
        })
}

function update(operation){
    showLoading();
    firebase.firestore()
        .collection('operation')
        .doc(getOperationUid())
        .update(operation)
        .then(()=>{
            hideLoading();
            window.location.href = 'home.html'
        })
        .catch(()=>{
            hideLoading();
            alert('Erro ao atualizar operação!')
            window.location.href = 'home.html'
        })

    

    
}




function createOperation(){

    return {

        type: form.statusExpense().checked ? 'expense' : 'income',
        ap: form.ap().value,
        nome: form.nome().value,
        code: form.code().value,
        Tipo: form.type().value,
        date: form.date().value,
        // status: form.statusExpense().checked ? 'expense' : 'income'
        status: form.statusIncome().checked ? 'Entregue' : 'Pendente'

    }
}


if(!isNewOperation()){
    const uid = getOperationUid();
    FindOperationByUid(uid);
}



function getOperationUid(){
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('uid');
}

function isNewOperation(){
    return getOperationUid() ? false : true;
}

function FindOperationByUid(uid){
    showLoading();

    firebase.firestore()
        .collection('operation')
        .doc(uid)
        .get()
        .then(doc =>{
            hideLoading();
            if(doc.exists){
                fillOperationScreen(doc.data());
                desabilitarButton();
            } else{
                alert('Documento não encontrado')
                window.location.href = 'home.html'
            }
        })
        .catch(()=>{
            hideLoading();
            alert('Erro ao recuperar documento');
            window.location.href = 'home.html'
        })
}

function fillOperationScreen(operation){
    if(operation.type == 'expense'){
        form.statusExpense().checked = true;
    } else{
        form.statusIncome().checked = true;
    }

    form.ap().value = operation.ap;
    form.nome().value = operation.nome;
    form.code().value = operation.code;
    form.type().value = operation.Tipo;
    form.date().value = operation.date;
    
    
 
}









function onChangeAp() {
    const ap = form.ap().value;
    form.msgApError().style.display = !ap ? 'block' : 'none';

    desabilitarButton();
    
}

function onChangeName(){
    const nome = form.nome().value;
    form.msgNomeError().style.display = !nome ? 'block' : 'none';

    desabilitarButton();
}

function onChangeCode(){
    const code = form.code().value;
    form.msgCodeError().style.display = !code ? 'block' : 'none';
    
    desabilitarButton();
}

function onChangeType(){
    const type = form.type().value
    form.msgTypeError().style.display = !type ? 'block' : 'none';

    desabilitarButton();
}

function onChangeDate(){
    const date = form.date().value;
    form.msgDateError().style.display = !date ? 'block' : 'none';

    desabilitarButton();
}

function desabilitarButton(){
    form.concluir().disabled = !validarCampos();
}




function validarCampos(){
    const ap = form.ap().value
    if(!ap){
        return false;
    }

    const nome = form.nome().value
    if(!nome){
        return false;
    }

    const code = form.code().value
    if(!code){
        return false;
    }

    const type = form.type().value
    if(!type){
        return false;
    }

    const date = form.date().value
    if(!date){
        return false;
    }
    return true;
}

const form = {
    ap: () => document.getElementById('ap'),
    msgApError: () => document.getElementById('msg-ap-required'),

    nome: () => document.getElementById('nome'),
    msgNomeError: () => document.getElementById('msg-nome-required'),

    code: () => document.getElementById('code'),
    msgCodeError: () => document.getElementById('msg-code-required'),

    type: () => document.getElementById('type'),
    msgTypeError: () => document.getElementById('msg-type-required'),

    statusExpense: () => document.getElementById('expense'),

    statusIncome: () => document.getElementById('income'),

    date: () => document.getElementById('date'),
    msgDateError: () => document.getElementById('msg-date-required'),

    concluir: () => document.getElementById('btnConcluir'),

    divType: () => document.getElementById('divType')
}

// document.getElementById('remove').addEventListener('touchstart', () =>{
//     alert('deu bom')
// })