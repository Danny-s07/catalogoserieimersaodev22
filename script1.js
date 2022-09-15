var listaSeries = [
  "https://m.media-amazon.com/images/M/MV5BMjgwNGNkZGYtMWQyYS00YjEzLWFmZTctODUzYWMxOWJkNTAzXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_UX182_CR0,0,182,268_AL_.jpg",
  "https://m.media-amazon.com/images/M/MV5BOTU2ZTE0M2MtMzE4ZC00NWJmLWJjZGYtOTRmYWVmMDY0N2Q4XkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_UX182_CR0,0,182,268_AL_.jpg",
  "https://m.media-amazon.com/images/M/MV5BMWY3NTljMjEtYzRiMi00NWM2LTkzNjItZTVmZjE0MTdjMjJhL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNTQ4NTc5OTU@._V1_UX182_CR0,0,182,268_AL_.jpg",
  "https://m.media-amazon.com/images/M/MV5BMjA4MzU5NzQxNV5BMl5BanBnXkFtZTgwOTg3MDA5NzM@._V1_UX182_CR0,0,182,268_AL_.jpg",
  "https://m.media-amazon.com/images/M/MV5BYjVlMjZhYzYtOGQxNC00OTQxLTk2NzEtMWFmMmNhODA4YjYzXkEyXkFqcGdeQXVyNjQ3MDgwNjY@._V1_.jpg"
];
var nomesSeries = [
  "Grey's Anatomy",
  "Queer EYe 5",
  "Sherlock Holmes",
  "FleaBag",
  "NCIS"
];

var links = [
  "https://www.youtube.com/embed/TZKEyJrl8HY",
  "https://www.youtube.com/embed/WechPJGpqS8",
  "https://www.youtube.com/embed/xK7S9mrFWL4",
  "https://www.youtube.com/embed/aX2ViKQFL_k",
  "https://www.youtube.com/embed/WBHoFiYrdTg"
];

var seriesadd = [];
for (var i = 0; i < listaSeries.length; i++) {
  var elementoListaSerie = document.getElementById("listaSerie");
  elementoListaSerie.innerHTML += `
      <div>
        <img onclick="rodarTrailer(${i})" src="${listaSeries[i]}"> 
        <p>${nomesSeries[i]}</p>
        <button class="btremove" onclick = "removerSeries(${i})">remover</button>
      </div> `;

  function removerSeries(i) {
    listaSeries.splice(i, 1);
    document.getElementById("listaSerie").innerHTML = "";

    for (var i = 0; i < listaSeries.length; i++) {
      var elementoListaSerie = document.getElementById("listaSerie");
      elementoListaSerie.innerHTML += `
      <div>
        <img onclick="rodarTrailer(${i})" src="${listaSeries[i]}">
        <p>${nomesSeries[i]}</p>
        <button  class="btremove" onclick = "removerSeries(${i}")>remover</button>
      </div> `;
    }
  }
}

// Obtem código da serie digitado pelo usuário e roda o trailer
function trailerUsuario() {
  var valorInputSerie = document.querySelector("#serie").value;
  var iframeTrailer = document.querySelector("#trailer");
  var codVideo = valorInputSerie.substring(32);

  var linkFilme = "https://www.youtube.com/embed/" + codVideo;

  var tagSerie =
    "<iframe id='frameTrailer' width='500' height='300' src='" +
    linkFilme +
    "' ></iframe>";
  iframeTrailer.innerHTML = tagSerie;

  document.querySelector("#serie").value = "";
}

// Obtem código do filme clicado e roda o trailer
function rodarMeuTrailer(numeroFilme) {
  var codVideo = filmesTrailer[numeroFilme];
  rodarTrailer(codVideo);
}

// Roda o trailer do link escolhido
function rodarTrailer(codVideo) {
  var linkSerie = links[codVideo];
  var iframeTrailer = document.querySelector("#trailer");
  var tagSerie =
    "<iframe id='frameTrailer' width='500' height='300' src='" +
    linkSerie +
    "' ></iframe>";

  iframeTrailer.innerHTML = tagSerie;
}

//inserir imagem atravez da escrita
function AdicionarSerie() {
  let campoNome = document.querySelector("#serie-imagem");
  const nome = campoNome.value;
  buscaIMDB(nome.replaceAll(" ", "%20"));
  campoNome.value = "";
}

function tratamentoIMDB(jsonIMDB) {
  const urlImagem = jsonIMDB.jsonnnob.image;
  const nomeObra = jsonIMDB.jsonnnob.name;
  const urlObra = jsonIMDB.tt_url;
  const ano = jsonIMDB.year;

  if (urlImagem.endsWith(".jpg")) {
    seriesadd.push({
      nomeObra: nomeObra,
      urlImagemCapa: urlImagem,
      urlObra: urlObra,
      ano: ano
    });
    listarCapasNaTela(urlImagem, nomeObra, urlObra, ano);
  } else {
    document.querySelector("#recado").innerText = "Nome da serie invalido";
    // alert("URL de imagem inválida");
  }
}

function listarCapasNaTela(urlImagemCapa, nomeObra, urlObra, ano) {
  const listaCapas = document.querySelector("#listaCapas");
  listaCapas.innerHTML = "";
  for (var i = 0; i < seriesadd.length; i++) {
    const elementoCapa =
      '<div id="serie"><a target=_blank alt="' +
      seriesadd[i].nomeObra +
      '" href="' +
      seriesadd[i].urlImagemCapa +
      '"><img width="182" height="268" src="' +
      seriesadd[i].urlImagemCapa +
      '"></a><p><b><a target=_blank alt="' +
      seriesadd[i].nomeObra +
      '" href="' +
      seriesadd[i].urlObra +
      '/">' +
      seriesadd[i].nomeObra +
      "</a></b></p><p>" +
      seriesadd[i].ano +
      "</p> <button  class = 'btremove' onclick = 'removerCapa(" +
      i +
      ")'>remover</button> </div>";

    listaCapas.innerHTML = listaCapas.innerHTML + elementoCapa;
  }
}

function removerCapa(i) {
  // essa linha remove 0 item que esta no index i do array
  seriesadd.splice(i, 1);
  // essa linha lista denovo os itens na tela
  listarCapasNaTela();
}

function buscaIMDB(nome) {
  $.getJSON(
    "https://api.allorigins.win/get?url=https%3A//betterimdbot.herokuapp.com/?tt=" +
      nome,
    function (data) {
      tratamentoIMDB(JSON.parse(data.contents)[1]); // o índice 0 fala sobre a API
    }
  );
}