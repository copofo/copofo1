
function onChangeEmail() {
  toogleButtonDisable();
  toggleEmailErrors();

}

function onChangePassword() {
  toogleButtonDisable();
  tooglePasswordInvalid();
}

function validateEmail(email) {

  var re = /\S+@\S+\.\S+/;
  return re.test(email);

}

function isEmailValid() {
  const email = form.email().value;
  if (!email) {
    return false;
  }
  return validateEmail(email);
}

function isPasswordValid() {
  const senha = form.senha().value;
  if (!senha) {
    return false;
  }
  return true;
}

function toggleEmailErrors() {
  const email = form.email().value;
  const erro1 = form.eOb();
  const erro2 = form.eIn();
  erro1.style.display = email ? 'nome' : 'block'
  erro2.style.display = isEmailValid(email) ? 'none' : 'block';
}

function tooglePasswordInvalid() {
  const senha = form.senha().value
  const erroSenha = form.sOb();
  erroSenha.style.display = senha ? 'none' : 'block';
}

function toogleButtonDisable() {
  const emailValid = isEmailValid();
  const senhaValid = isPasswordValid();
  const btn = form.btnEntrar().disabled = !emailValid || !senhaValid;
}

function login() {
  showLoading();
  firebase.auth().signInWithEmailAndPassword(form.email().value, form.senha().value).then(response => {
    hideLoading();
    window.location.href = "home.html"
  }).catch(error => {
    hideLoading();
    alert(getErrorMessage(error))
  });

}



function getErrorMessage(error) {
  if (error.code == "auth/user-not-found") {
    return "Usuário nao encontrado!"
  }
  return error.message;


}

const form = {
  email: () => document.getElementById('email'),
  senha: () => document.getElementById('senha'),
  btnEntrar: () => document.getElementById('btnEntrar'),
  eOb: () => document.getElementById('msgEmailOb'),
  eIn: () => document.getElementById('msgEmailIn'),
  sOb: () => document.getElementById('msgSenhaOb')
};