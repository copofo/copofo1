var c = 0
FindOperation();

function newOperation() {
    window.location.href = 'operation.html'
}

function recarregar(){
    window.location.reload(true);
}

function FindOperation() {
    showLoading();
    firebase.firestore()
        .collection('operation')
        .orderBy('ap')
        .get() 
        .then(snapShot => {
            hideLoading();
            const operation = snapShot.docs.map(doc => ({
                ...doc.data(),
                uid: doc.id
            }));
            AddOperationToScreen(operation)
        })
        .catch(error => {
            hideLoading();
            console.log(error);
            alert('erro ao recuperar operações')
        })

       

}



function AddOperationToScreen(operation) {
    const orderList = document.getElementById('operation')

    operation.forEach(operation => {
        console.log(operation)
        const li = document.createElement('li');
        li.classList.add(operation.type);
        li.ad = operation.uid;
        
        
        li.addEventListener('touchmove',()=>{
          c = 0
        })
        
        
        
        li.addEventListener('touchstart', () => {
            /*window.location.href = 'operation.html?uid=' + operation.uid;
            down = true
            upDown();*/
          c++;
              if(c >= 3){
    c = 0
    window.location.href = 'operation.html?uid=' + operation.uid;
  }
        })
        
        
        /*

        const deleteButton = document.createElement('button')
        deleteButton.innerHTML = 'Remover'
        deleteButton.classList.add('outline', 'danger')
        li.appendChild(deleteButton);

        deleteButton.addEventListener('click', event =>{
            event.stopPropagation();
            aksRemoveOperation(operation);
        })
        
        deleteButton.addEventListener('touchstart', event =>{
            event.stopPropagation();
            aksRemoveOperation(operation);
        })
        
        */
        
        
        const ap = document.createElement('p');
        ap.innerHTML = '<strong>Ap: </strong>' + operation.ap;
        li.appendChild(ap)


        const nome = document.createElement('p');
        nome.innerHTML = 'Nome: ' + operation.nome;
        li.appendChild(nome)

        const code = document.createElement('p')
        code.innerHTML = 'Página: ' + operation.code;
        li.appendChild(code)

        const tipo = document.createElement('p')
        tipo.innerHTML = 'Descrição: ' + operation.Tipo;
        li.appendChild(tipo)

        const status = document.createElement('p')
        status.innerHTML = 'status: ' + operation.status;
        li.appendChild(status)

        const date = document.createElement('p');
        date.innerHTML = operation.date//formatDate(operation.date);
        li.appendChild(date);

        
        orderList.appendChild(li);
    });
    date = formatDate(operation.date);
}

function formatDate(date) {
    return new Date(date).toLocaleDateString('pt-br');
}

function aksRemoveOperation(operation){
    
    const remover = confirm('Deseja remover a encomenda? ')
    
    if(remover){
        
        removeOperation(operation);
        
    }

    
}

function removeOperation(operation){
    
    showLoading();
    firebase.firestore()
        .collection('operation')
        .doc(operation.uid)
        .delete()
        .then(() =>{
            hideLoading();
            document.getElementById(operation.uid).remove();
            recarregar();
        })
}




