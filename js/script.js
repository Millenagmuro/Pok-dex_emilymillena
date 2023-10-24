const pokedex = document.getElementById("pokedex");
const apiUrl = "https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20";
const inputFiltrar = document.getElementById("txtFiltrar");



async function Carregarpokemons(){
    const urlEndPoint = "https://pokeapi.co/api/v2/pokemon/?offset=40&limit=20";
    const options = {
        method: 'GET'
    }


    try {
        //código válido
       const resposta = await fetch(urlEndPoint, options);
       const dados = await resposta.json();

       console.log(dados);

       dados.forEach((item) => {
       
        li.textContent = item.song + "-" + item.artist + "-" + item.genre;
       
       });

    } catch (error) {
        console.log('Error:' + error);
        
    }

}
Carregarpokemons();

inputFiltrar.addEventListener("input", () => {
    let filtro = inputFiltrar.value.toLowerCase();
  

    for(const musica of listagem){
        const textoMusica = musica.textContent.toLowerCase();  

        if(textoMusica.includes(filtro)){
            musica.style.display = "flex";
        }else{
            musica.style.display = "none";
        }
    }
});

displayPokemon();
