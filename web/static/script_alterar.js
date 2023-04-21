// Exibe uma notificação
function showNotification(message, color) {
    const notificationElement = document.querySelector('#notification');
    notificationElement.innerText = message;
    notificationElement.style.backgroundColor = color;
    notificationElement.style.color = 'white';
    notificationElement.style.display = 'block';
  }
  
  // Obtém o ID do jogador a ser alterado a partir da URL
  const urlParts = window.location.pathname.split('/');
  const id = urlParts[3];
  
  // Preenche o formulário com as informações atuais do jogador a ser alterado
  async function loadPlayerData() {
    try {
      const response = await fetch(`/jogadores/${id}`, {
        method: 'GET'
      });
      if (!response.ok) {
        throw new Error('Erro ao carregar jogador na resposta inicial.');
      }
      const data = await response.json();
      form.elements.nome.value = data.Nome;
      form.elements.idade.value = data.Idade;
      form.elements.numero.value = data.Numero;
      form.elements.clube.value = data.Clube;
      form.elements.posicao.value = data['Posição'];
    } catch (error) {
        console.error(error);
        console.error(error.message);
        console.error(error.stack);
      showNotification('Erro ao carregar jogador \nerror.stack: ' + error.stack + '\nerror.message: '+ error.message + '\nerror: '+ error, 'red');
    }
  }
  
  loadPlayerData();

  // Envia uma requisição PATCH para atualizar os dados do jogador
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    try {
      const response = await fetch(`/jogadores/alterar/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Nome: formData.get('nome'),
          Idade: formData.get('idade'),
          Numero: formData.get('numero'),
          Clube: formData.get('clube'),
          Posição: formData.get('posicao'),
        }),
      });
      if (!response.ok) {
        throw new Error('Erro ao atualizar jogador');
      }
      const data = await response.json();
      console.log(data);
      showNotification('Jogador atualizado com sucesso!', 'green');
      form.reset();
      window.location.href = '/'; // redireciona para a página inicial
    } catch (error) {
      console.error(error);
      showNotification('Erro ao atualizar jogador', 'red');
    }
  });
  