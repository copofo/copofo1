function logout(){
            
    firebase.auth().signOut().then(()=>{
        window.location.href = 'index.html'
    }).catch(()=>{
        alert('erro ao fazer logout')
    })
}