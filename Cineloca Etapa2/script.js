// Seleciona todos os elementos de avaliação
const movieRatings = document.querySelectorAll('.movie-rating');

// Função para preencher as estrelas ao clicar (permanente)
function handleStarClick(event) {
  const rating = event.target.dataset.value;  // Obtém o valor da estrela clicada
  const stars = event.target.parentNode.children;  // Pega todas as estrelas do filme
  
  // Preenche as estrelas até o valor da avaliação
  for (let i = 0; i < stars.length; i++) {
    if (i < rating) {
      stars[i].classList.add('filled');  // Marca como estrela preenchida
    } else {
      stars[i].classList.remove('filled');  // Remove o preenchimento
    }
  }

  console.log(`Avaliação dada: ${rating} estrelas`);
}

// Função para adicionar a classe 'hover' ao passar o mouse (apenas para visualização)
function handleStarHover(event) {
  const rating = event.target.dataset.value;
  const stars = event.target.parentNode.children;

  // Adiciona a classe 'hover' para as estrelas à esquerda
  for (let i = 0; i < stars.length; i++) {
    if (i < rating) {
      stars[i].classList.add('hover');  // Estrela preenchida ao passar o mouse
    } else {
      stars[i].classList.remove('hover');  // Remove o efeito do hover
    }
  }
}

// Função para remover a classe 'hover' ao tirar o mouse
function handleStarLeave(event) {
  const stars = event.target.parentNode.children;
  for (let i = 0; i < stars.length; i++) {
    stars[i].classList.remove('hover');  // Remove o efeito visual do hover
  }
}

// Adiciona os eventos de clique e hover a cada estrela
movieRatings.forEach(rating => {
  rating.addEventListener('click', handleStarClick);  // Registra o clique
  rating.addEventListener('mouseover', handleStarHover);  // Registra o hover
  rating.addEventListener('mouseleave', handleStarLeave);  // Registra o fim do hover
});
// Manipulação do formulário de edição
document.getElementById('edit-profile-btn').addEventListener('click', function() {
  // Mostra o formulário de edição
  document.getElementById('edit-form').style.display = 'block';
  document.getElementById('edit-profile-btn').style.display = 'none';  // Esconde o botão de editar
});

document.getElementById('cancel-edit-btn').addEventListener('click', function() {
  // Cancela a edição e esconde o formulário
  document.getElementById('edit-form').style.display = 'none';
  document.getElementById('edit-profile-btn').style.display = 'block';  // Mostra o botão de editar
});

// Salvar as alterações do perfil
document.getElementById('save-changes-btn').addEventListener('click', function() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const photo = document.getElementById('photo').files[0];  // Foto escolhida pelo usuário

  // Atualiza o nome e email na interface
  document.getElementById('profile-name').textContent = name;
  document.getElementById('profile-email').textContent = 'Email: ' + email;

  // Atualiza a foto, se houver
  if (photo) {
    const reader = new FileReader();
    reader.onload = function(e) {
      document.getElementById('profile-pic').src = e.target.result;
    };
    reader.readAsDataURL(photo);
  }

  // Esconde o formulário de edição
  document.getElementById('edit-form').style.display = 'none';
  document.getElementById('edit-profile-btn').style.display = 'block';  // Mostra o botão de editar
});

// Função para carregar filmes favoritos da lista no LocalStorage
function loadFavorites() {
  const favoriteMoviesList = document.getElementById('favorite-movies');
  
  // Obtém a lista de favoritos do localStorage
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  // Limpa a lista de favoritos antes de adicionar os itens
  favoriteMoviesList.innerHTML = '';

  // Verifica se há filmes favoritos e os exibe na página de favoritos
  if (favorites.length === 0) {
    favoriteMoviesList.innerHTML = '<li>Nenhum favorito encontrado.</li>';
  } else {
    favorites.forEach(favorite => {
      const movieItem = document.createElement('li');
      movieItem.textContent = favorite.name;
      favoriteMoviesList.appendChild(movieItem);
    });
  }
}

// Função para adicionar um filme aos favoritos
function addFavorite(movieId, movieName) {
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  
  // Verifica se o filme já foi adicionado aos favoritos
  if (!favorites.some(favorite => favorite.id === movieId)) {
    favorites.push({ id: movieId, name: movieName });
    localStorage.setItem('favorites', JSON.stringify(favorites));  // Atualiza o localStorage com os favoritos
    alert(`${movieName} foi adicionado aos seus favoritos!`);
  } else {
    alert(`${movieName} já está na sua lista de favoritos.`);
  }
}

// Função para configurar os botões de "favoritar" na página de filmes
function setupFavoriteButtons() {
  const favoriteButtons = document.querySelectorAll('.favorite-btn');

  favoriteButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      const movieCard = event.target.closest('.movie-card');
      const movieId = movieCard.getAttribute('data-id');
      const movieName = movieCard.querySelector('h3').textContent;
      
      addFavorite(movieId, movieName);  // Adiciona o filme aos favoritos
    });
  });
}

// Inicializa as funcionalidades da página
function initialize() {
  loadFavorites();  // Carrega e exibe os filmes favoritos
  setupFavoriteButtons();  // Configura os botões de "favoritar" para a página principal
}

// Chama a função de inicialização quando a página carregar
initialize();
