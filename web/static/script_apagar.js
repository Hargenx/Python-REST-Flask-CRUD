const deleteButtons = document.querySelectorAll('.delete-button');
const confirmDeleteButton = document.getElementById('confirm-delete-button');
const cancelButton = document.querySelector('#cancel-delete-button');
for (const button of deleteButtons) {
  button.addEventListener('click', (event) => {
    const confirmDeleteModal = document.getElementById('confirm-delete-modal');
    const bootstrapModal = new bootstrap.Modal(confirmDeleteModal);
    bootstrapModal.show(); // exibe o modal
    const id = event.currentTarget.dataset.id;
    confirmDeleteButton.dataset.id = id;
  });
  cancelButton.addEventListener('click', (event) => {
    const confirmDeleteModal = document.getElementById('confirm-delete-modal');
    const bootstrapModal = new bootstrap.Modal(confirmDeleteModal);
    bootstrapModal.hide(); // esconde o modal
  });
}
confirmDeleteButton.addEventListener('click', (event) => {
  const id = event.currentTarget.dataset.id;
  fetch(`/jogadores/${id}`, { method: 'DELETE' })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      window.location.href = '/';
    })
    .catch(error => {
      console.error(error);
      alert('Erro ao deletar jogador');
    });
});
