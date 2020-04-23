var matriz = []
var tempo;
let res = document.createElement('h1')
let placar = document.createElement('h2')
let result = document.getElementById('result')


let painel = document.getElementById('painel')
let opcaoJogada = document.getElementById('opcao') //usada para esconder a div
let btnIniciar = document.getElementById('btnIniciar')
let teste = document.getElementById('teste')  //acho que não está usando mais
let cel;
let rank = document.getElementById('rank')


let jx = document.getElementById('nomeJog1')
let j0 = document.getElementById('nomeJog2')
let nome_x
let nome_0
let jog2 = document.getElementById('jog2')
let jog1 = document.getElementById('jog1')
let pt1= document.getElementById('pt1')
let pt2= document.getElementById('pt2')


var vencedor = []
vencedor[11] = [12,13,21,31,22,33]
vencedor[12] = [11,13,22,23]
vencedor[13] = [11,12,22,31,23,33]
vencedor[21] = [11,31,22,23]
vencedor[22] = [11,33,12,32,13,31,21,23]
vencedor[23] = [13,33,21,22]
vencedor[31] = [11,21,13,22,32,33]
vencedor[32] = [12,22,31,33]
vencedor[33] = [11,22,13,23,31,32]

var jogador = Math.round(Math.random())
var cont = 0
var content = document.getElementById('content')

var nome

//nomear_jogadores();

function inicializar() {
    
    painel.innerHTML="<h2>Escolha uma opção de jogada</h2>"
    capt_nomes_jogadores();
    armazenarRanking();
    
    var tabuleiro = document.createElement('table');

    for(let i=1; i<=3; i++) {
        matriz[i] = []
        let lin = document.createElement('tr')
       // result.innerHTML = "Vamos iniciar com o jogador"+ jx.value
        result.innerHTML = `Vamos iniciar com o jogador ${jogador}.` //Acho que esse codigo nao pode estar aqui.
        content.appendChild(placar)
        for (let j=1; j<=3; j++) {
            matriz[i][j] = -1
			cel = document.createElement('td')
            cel.id = `${i}${j}`
            cel.setAttribute('onclick', `selecionar(${i}${j})`)
            lin.appendChild(cel)
        }
        tabuleiro.appendChild(lin)
       
    }
    content.appendChild(tabuleiro)

}




//função para ser usada ao selecionar uma celula, usando o id dela.
function selecionar(id) {
    let cel_select = document.getElementById(id);
    cel_select.removeAttribute('onclick')
    cont++
    
	//pega o inteiro da divisão do id por 10 e atribui à variavel i para usar como indice da matriz[i]
    let i = Math.floor(id/10)
	
	//pega o resto da divisão do id por 10 e atribui à variável j para usar como indice da matriz[i][j]
    let j = id%10
    matriz[i][j] = jogador

    if (jogador==0) {
        cel_select.innerHTML = 'O'       
    } else {
        cel_select.innerHTML = 'X'
    }
    

    if (cont>=5 && verificarVencedor(id, jogador)) {
        result.setAttribute("style", "VISIBILITY: hidden"); 

        jx.value==""?jx.value="anonimo_x":jx.value=jx.value
        j0.value==""?j0.value="anonimo_0":j0.value=j0.value

        jogador==1?painel.innerHTML = "<h2>O jogador " +jx.value+" venceu a partida!</h2>":painel.innerHTML = "<h2>O jogador " +j0.value+" venceu a partida!</h2>"
        
       // painel.innerHTML = `<h2>O jogador ${jogador} venceu a partida!</h2>`
        if(jogador==1){
            pt1.setAttribute("value",Number(pt1.value)+1)
          }
        if(jogador==0){
            pt2.setAttribute("value",Number(pt2.value)+1)
          }
          
        content.appendChild(res)
        armazenarRanking();
        start();
     }


    if (cont==9 && !verificarVencedor(id, jogador)) {
        result.setAttribute("style", "VISIBILITY: hidden");
        painel.innerHTML = `<h2>Deu Velha! Jogo Empatado!</h2>`
        content.appendChild(res) 
      }
    
    inverterJogador()

      jx.value==""?jx.value="anonimo_x":jx.value=jx.value
      j0.value==""?j0.value="anonimo_0":j0.value=j0.value
      jogador==1?result.innerHTML = "Agora é a vez do(a) " +jx.value+".":result.innerHTML = "Agora é a vez do(a) " +j0.value+"."
   
    
   }




    function verificarVencedor(id, jog) {
      let i, j
      let k = 0

      while(k<vencedor[id].length) {

        i = Math.floor(vencedor[id][k]/10)
        j = vencedor[id][k]%10

        if (matriz[i][j] == jog) {
            k++

            i = Math.floor(vencedor[id][k]/10)
            j = vencedor[id][k]%10

            if (matriz[i][j] == jog) {
				 btnIniciar.setAttribute("style", "VISIBILITY: true");
				 bloquearTabuleiro();
                 armazenarRanking();
                 capt_nomes_jogadores();
                return true
				
            } else {
                k++
            }
          } else {
            k+=2
         }
       }

      return false
    }


   // PAREI AQUI******************************************************************************
//usada a cada jogada
function inverterJogador() {
    nome1= jogador==nome_x?nome_0:nome_x //ver se não estiver usando, excluir
    jogador = jogador==0?1:0
}



//usada quando há um ganhador. Pisca um ou mais campos com o TagName h2
function piscar(){   
               
    blinks = document.getElementsByTagName("h2");    
    for(var i=0;i<blinks.length;i++){
        if(blinks[i].getAttribute("style")=="VISIBILITY: hidden"){                              
              blinks[i].setAttribute("style", "VISIBILITY: visible");                         
          }else{                   
              blinks[i].setAttribute("style", "VISIBILITY: hidden");                       
        }
    }                             
            
}

function start(){
    tempo = setInterval(piscar, 500);
        setTimeout('stop()',2000);
  }

  function stop(){
     clearInterval(tempo);
  }
  
   
  function escolherJogada(){                        
                 result.setAttribute("style", "VISIBILITY: visible"); 
                 btnIniciar.setAttribute("value", "Nova Partida");
                 painel.innerHTML="<h2>Jogo Iniciado</h2>"		 
	          }
       
              
	   //usada para bloquear a(s) célula(s) não selecionadas do tabuleiro após ter um ganhador
	   function bloquearTabuleiro(){
		   for(let i=1; i<=3; i++){
			   for(let j=1;j<=3;j++){
				   if(matriz[i][j]==-1){
					  let celula = document.getElementById(`${i}${j}`);
                      celula.removeAttribute('onclick');
				   }   
			   }
		   }
	   }
	   
	   

        function armazenarRanking(){
            let nome = 'CPU';
            let valor = 0;

                  //verifica se ainda não existe um localStorage com a chave Ranking, criando um, se o caso.
                  if(!localStorage.Ranking){   
                     ranking = nome + ';' + valor;
                     localStorage.setItem("Ranking",ranking);  
                  }else{
                      //se já existir um localSorage com a chave Ranking, precisamos saber o seu valor
                      //para fazer as comparações
                      rank_armazenado = localStorage.getItem('Ranking');
                      pt_armazenado = Number(rank_armazenado.split(";")[1]);

                      pt_jogador = document.getElementById('pt1').value;
                      if(pt_jogador>pt_armazenado){
                     
                     ranking = document.getElementById('nomeJog1').value + ';' + document.getElementById('pt1').value;
                     localStorage.setItem("Ranking",ranking);
                    
                }
                novo_rank = localStorage.getItem('Ranking');
                rank.innerHTML="Ranking: "+novo_rank.split(";")[0] + " ------ "+"Total de Pontos: "+ novo_rank.split(";")[1];
              }
            }

            
            function capt_nomes_jogadores(){
                var select = document.getElementById('selJogo');
                var opcao = select.options[select.selectedIndex].text;

                 if(opcao =='01 Jogador contra a máquina'){
                    jog2.setAttribute("style", "VISIBILITY: hidden");
                   // j0.value='máquina'
                    nome_0 = 'CPU'
                    
                      if(jx.value==""){
                          nome_x="anônimo_X"
                      }else{
                          nome_x= jx.value
                    }

                 }else{
                 
                // se for 02 jogadores
                    if(jx.value==""){
                        nome_x="anônimo_X"
                    }else{
                        nome_x = jx.value
                    }

                    if(j0.value==""){
                        nome_0="anônimo_0"
                    }else{
                        nome_0= j0.value
                    }

               }
                 //linha de codigo apenas para testes
               //  rank.innerHTML = "o jogador x é "+nome_x+" e o jogador 0 é "+nome_0;
            }
    
            
            function toogle_divJog2(){
                 jog2.style.visibility=jog2.style.visibility=="hidden"?"visible":"hidden"
               
            }