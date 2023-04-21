// Exibe uma mensagem de sucesso na notificação
function showSuccessNotification(message) {
const notificationElement = document.querySelector('#notification');
  notification.innerText = message;
  notification.style.backgroundColor = 'green';
  notification.style.color = 'white';
  notification.style.display = 'block';
}

// Exibe uma mensagem de erro na notificação
function showErrorNotification(message) {
const notificationElement = document.querySelector('#notification');
  notification.innerText = message;
  notification.style.backgroundColor = 'red';
  notification.style.color = 'white';
  notification.style.display = 'block';
}

// Oculta a notificação
function hideNotification() {
  notification.style.display = 'none';
}


document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-jogador');
    const camposObrigatorios = ['nome', 'idade', 'numero', 'clube', 'posicao'];
  
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const jogador = {};
      let camposValidos = true;
  
      // Verifica se cada campo obrigatório está preenchido
      for (let campo of camposObrigatorios) {
        const input = form.querySelector(`[name="${campo}"]`);
        if (!input.value) {
          input.classList.add('campo-obrigatorio');
          camposValidos = false;
        } else {
          input.classList.remove('campo-obrigatorio');
        }
      }
  
      // Se todos os campos obrigatórios estiverem preenchidos, envia o formulário
      if (camposValidos) {
        fetch('/jogadores', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "Nome": formData.get('nome'),
            "Idade": formData.get('idade'),
            "Numero": formData.get('numero'),
            "Clube": formData.get('clube'),
            "Posição": formData.get('posicao')
          })
        })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          showSuccessNotification('Jogador atualizado com sucesso!');
          form.reset();
          window.location.href = '/';
        })
        .catch(error => {
          console.error(error);
          showErrorNotification('Erro ao atualizar jogador');
        });
      }
    });
  });
  
const form = document.getElementById('form-jogador');


