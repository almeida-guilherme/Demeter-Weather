let api = {
    key: "cd426faf19fa4b398bc4a3e8ffe1c009",
    base: "https://api.openweathermap.org/data/2.5/",
    lang: "pt_br",
    units: "metric"
}
let pesquisaInput = document.getElementById("procuraInput");
let pesquisaBotao = document.getElementById("procuraBotao");
let cidade= document.getElementById("cidade");
let data = document.getElementById("data");
let nuvem = document.getElementById("nuvem");
let temperatura = document.getElementById("temperatura");
let situacao = document.getElementById("situacao");
let geographic =document.getElementById("localBotao");
let conteudomain = document.getElementsByTagName("main")[0]


//Função data
function dateBuilder(d){
    let weekDays = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
    let months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julio", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

    return (`${weekDays[d.getDay()]},  ${d.getDate()}  ${months[d.getMonth()]} ${d.getFullYear()}`);

}

//Função tecla
function enter(event){
    key = event.keyCode
    if (key === 13){
        searchResults(pesquisaInput.value)
    }
}

//Função geolocalização
function sucesso(position){
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    coordResults(lat, long);
}
function fracasso(erro){
    alert(erro);
}

//Display
function apresentarResultados(tempo){
    let novadata = new Date();
    let temp = `${Math.round(tempo.main.temp)}` ;
    let descricao = tempo.weather[0].description;
    let icone = tempo.weather[0].icon;

    situacao.innerText = descricao ;
    temperatura.innerText = `${temp} °C `;
    temperatura.innerHTML += '<img src="./Assets/tempicon.png" width="30cm" alt=""></img>'
    nuvem.innerHTML = `<img src='./Assets/icons/${icone}.png'>` ;
    cidade.innerText= `${tempo.name},${tempo.sys.country}`;
    data.innerText = dateBuilder(novadata);
    conteudomain.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + `${tempo.name}` + "')";
    conteudomain.style.backgroundRepeat += "no-repeat"
    conteudomain.style.backgroundSize += "100%"
    let audiomain = document.getElementById('nuvem')
    audiomain.innerHTML += `<audio id="audio" src="./Assets/icons audio/${icone}.ogg"></audio>`
    let audio = document.getElementById("audio")
    audio.play()
}



//API
function searchResults(city) {
    fetch(`${api.base}weather?q=${city}&lang=${api.lang}&units=${api.units}&APPID=${api.key}`)
    .then(response => {console.log(response)
        if  (!response.ok) {
            throw new Error(`Ocorreu um erro: ${response.status}`)
        }
    return response.json();})
    .catch(error => {alert(error.message)})
    .then(response=>{
        apresentarResultados(response)
    })
}

//API geocordenadas
function coordResults(lat, long){
    fetch(`${api.base}weather?lat=${lat}&lon=${long}&lang=${api.lang}&units=${api.units}&APPID=${api.key}`)
    .then(response => {console.log(response)
        if  (!response.ok) {
            throw new Error(`Ocorreu um erro: ${response.status}`)
        }
    return response.json();})
    .catch(error => {alert(error.message)})
    .then(response=>{
        apresentarResultados(response)
})}

pesquisaBotao.addEventListener('click', () => {searchResults(pesquisaInput.value)})
pesquisaInput.addEventListener('keypress', enter)
geographic.addEventListener('click',()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(sucesso, fracasso);
    }else{
        alert("Seu navegador não suporta geolocalização API")
    }
});
