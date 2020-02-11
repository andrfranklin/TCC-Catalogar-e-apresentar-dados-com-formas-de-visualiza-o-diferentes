<template>

  <div id="app" >

  <header>
    <img src="./assets/logo.png" alt="SUAP: Sistema Unificado de Administração Pública">
  </header>

    <div class="menu">
      <div class="anos">
      <input type="radio" id="1a" value="1" v-model="ano">
      <label for="1a">1º ano</label>
      <input type="radio" id="2a" value="2" v-model="ano">
      <label for="2a">2º ano</label>
      <input type="radio" id="3a" value="4" v-model="ano">
      <label for="3a">3º ano</label>
      <input type="radio" id="4a" value="8" v-model="ano">
      <label for="4a">4º ano</label>
      <input type="radio" id="todosAnos" value="16" v-model="ano">
      <label for="todos">Todos os anos</label>
    </div>
    <hr>
    <div class="cursos">
      <input type="radio" id="edificacoes" value="32" v-model="cursos">
      <label for="edf">Edificações</label>
      <input type="radio" id="informatica" value="64" v-model="cursos">
      <label for="edf">Informática</label>
      <input type="radio" id="logistica" value="128" v-model="cursos">
      <label for="edf">Logística</label>
      <input type="radio" id="todosCursos" value="256" v-model="cursos">
      <label for="todosCursos">Todos os Cursos</label>
    </div>
    <hr>
    <div class="bimestre">
      <input type="radio" id="1b" value="512" v-model="bimestre">
      <label for="1b">1º Bimestre</label>
      <input type="radio" id="2b" value="1024" v-model="bimestre">
      <label for="2b">2º Bimestre</label>
      <input type="radio" id="3b" value="2048" v-model="bimestre">
      <label for="3b">3º Bimestre</label>
      <input type="radio" id="4b" value="8192" v-model="bimestre">
      <label for="4b">4º Bimestre</label>
    </div>

    <button class="atualzar" @click="Atualizar()">Atualizar tabelas</button>
    </div>
    

  
    <h4 class="obs"> <h3>Observação:</h3> O risco de evasão é determinado pela média de notas das matérias e a frequência geral do aluno
        <h3>Modo de Uso:</h3>
        <h4>Selecione as opções do menus conforme os dados que deseja vizualizar, e clique em atualizar. As tabelas e os gráficos se atualizaram
           conforme os menus selecionados.</h4>
    </h4>

    <div class="org_risco" id="risco">
      <div id="alto">
        <h2>Alunos com alto risco de evasão</h2>

        <ul class="ul_lista">
          <li class="li_lista alto" :key="alunos" v-for="alunos of alunosAltoRisco" v-on:click="aluno = alunos.matricula"
            @click="dados()"> {{ alunos.nome }}</li>
        </ul>
      </div>
      <div id="medio">
        <h2>Alunos com potencial risco de evasão</h2>
        <ul class="ul_lista">
          <li class="li_lista medio" :key="alunos" v-for="alunos of alunosMedioRisco" v-on:click="aluno = alunos.matricula"
            @click="dados()"> {{ alunos.nome }}</li>
        </ul>
      </div>
      <div id="baixo">
        <h2>Alunos sem ou com baixo risco de evasão</h2>
        <ul class="ul_lista">
          <li class="li_lista baixo" :key="alunos" v-for="alunos of alunosBaixoRisco" v-on:click="aluno = alunos.matricula"
            @click="dados()"> {{ alunos.nome }}</li>
        </ul>
      </div>

      <div id="baixa_nota">
        <h2>Alunos com baixas medias de notas</h2>
        <ul class="ul_lista">
          <li class="li_lista baixa_nota" :key="alunos" v-for="alunos of alunosBaixaNota" v-on:click="aluno = alunos.matricula"
            @click="dados()"> {{ alunos.nome }}</li>
        </ul>
      </div>
      <div id="baixa_freq">
        <h2>Alunos com baixa frequencia</h2>
        <ul class="ul_lista">
          <li class="li_lista baixa_freq" :key="alunos" v-for="alunos of alunosBaixaFreq" v-on:click="aluno = alunos.matricula"
            @click="dados()"> {{ alunos.nome }}</li>
        </ul>
      </div>
    </div>

    <v-dialog/>
    <div class="graficos">
      <div class="g1">
        <h2>Quantidade de Alunos por Tabela de Risco</h2>
      </div>
      <div class="g2">
        <h2>Quantidade de Alunos por Tabela de Nota e Frequência</h2>
      </div>
    </div>

<footer>
  <div class="container">
    <div class="row">
      <div class="col-md-4"><span class="copyright">Copyright © All Rights Reserved</span></div>
      <div class="col-md-4">
        <ul class="list-inline social-buttons">
          <li><a href=""><i class="fa fa-twitter"></i></a></li>
          <li><a href="https://www.facebook.com/andre.franklin.988"><i class="fa fa-facebook"></i></a></li>
          <li><a href=""><i class="fa fa-linkedin"></i></a></li>
        </ul>
      </div>
      <div class="col-md-4">
        Development by: André Franklin de Oliveira Lima
      </div>
    </div>
  </div>
</footer>
  </div>

</template>

<script>

export default {

  data() {
    return {
      //menus
      ano: "16",
      cursos: "256",
      bimestre: "8192",
      opcao: "0",


      //vetores de organização
      todosAlunos: [],
      alunosAltoRisco: [],
      alunosMedioRisco: [],
      alunosBaixoRisco: [],
      alunosBaixaNota: [],
      alunosBaixaFreq: [],

      //variaveis de funcionamento
      

      
    };
  },
  

  created() {
    this.$http.get("http://localhost:3000/alunos").then(function(r) {
      for (let a = 0; a < r.body.length; a++) {
        this.todosAlunos[a] = r.body[a];
      }

      this.Atualizar();
    });
  },

  methods: {
    organiza_array: function(vetor) {
      function compare(a, b) {
        if (parseInt(a.presenca) < parseInt(b.presenca)) return -1;
        if (parseInt(a.presenca) > parseInt(b.presenca)) return 1;
        return 0;
      }
      return vetor.sort(compare);
    },

    verifica_repetição_vetor(vetor, r) {
      var existe = false;
      for (let k = 0; k < vetor.length; k++) {
        if (vetor[k].matricula === r) {
          existe = true;
          break;
        }
      }
      return existe;
    },

    Atualizar() {
     

      this.opcao = 0;
      this.opcao =
        parseInt(this.ano) + parseInt(this.cursos) + parseInt(this.bimestre);

      this.alunosAltoRisco = [];
      this.alunosMedioRisco = [];
      this.alunosBaixoRisco = [];
      switch (parseInt(this.opcao)) {
        case 8464: // classifica todos os alunos
          this.Classifica(this.todosAlunos, 4);
          break;

        case 769: //classifica alunos do 1 ano no 1 bimestre em todos os anos
          var cont = 0;
          var vetorAnalise = [];
          for (let a = 0; a < this.todosAlunos.length; a++) {
            if (this.todosAlunos[a].periodo === 1) {
              vetorAnalise[cont] = this.todosAlunos[a];
              cont++;
            }
          }
          this.Classifica(vetorAnalise, 1);
          break;

        case 1281: //classifica alunos do 1 ano no 2 bimestre em todos os anos
          var cont = 0;
          var vetorAnalise = [];
          for (let a = 0; a < this.todosAlunos.length; a++) {
            if (this.todosAlunos[a].periodo === 1) {
              vetorAnalise[cont] = this.todosAlunos[a];
              cont++;
            }
          }
          this.Classifica(vetorAnalise, 2);
          break;

        case 2305: //classifica alunos do 1 ano no 3 bimestre em todos os anos
          var cont = 0;
          var vetorAnalise = [];
          for (let a = 0; a < this.todosAlunos.length; a++) {
            if (this.todosAlunos[a].periodo === 1) {
              vetorAnalise[cont] = this.todosAlunos[a];
              cont++;
            }
          }
          this.Classifica(vetorAnalise, 3);
          break;

        case 8449: //classifica alunos do 1 ano em todos os bimestre e de todos os anos
          var cont = 0;
          var vetorAnalise = [];
          for (let a = 0; a < this.todosAlunos.length; a++) {
            if (this.todosAlunos[a].periodo === 1) {
              vetorAnalise[cont] = this.todosAlunos[a];
              cont++;
            }
          }
          this.Classifica(vetorAnalise, 4);
          break;

        case 770: //classifica alunos do 2 ano no 1 bimestre em todos os anos
          var cont = 0;
          var vetorAnalise = [];
          for (let a = 0; a < this.todosAlunos.length; a++) {
            if (this.todosAlunos[a].periodo === 2) {
              vetorAnalise[cont] = this.todosAlunos[a];
              cont++;
            }
          }
          this.Classifica(vetorAnalise, 1);
          break;

        case 1282: //classifica alunos do 2 ano no 2 bimestre em todos os anos
          var cont = 0;
          var vetorAnalise = [];
          for (let a = 0; a < this.todosAlunos.length; a++) {
            if (this.todosAlunos[a].periodo === 2) {
              vetorAnalise[cont] = this.todosAlunos[a];
              cont++;
            }
          }
          this.Classifica(vetorAnalise, 2);
          break;

        case 2306: //classifica alunos do 2 ano no 3 bimestre em todos os anos
          var cont = 0;
          var vetorAnalise = [];
          for (let a = 0; a < this.todosAlunos.length; a++) {
            if (this.todosAlunos[a].periodo === 2) {
              vetorAnalise[cont] = this.todosAlunos[a];
              cont++;
            }
          }
          this.Classifica(vetorAnalise, 3);
          break;

        case 8450: //classifica alunos do 2 ano em todos os bimestre e de todos os anos
          var cont = 0;
          var vetorAnalise = [];
          for (let a = 0; a < this.todosAlunos.length; a++) {
            if (this.todosAlunos[a].periodo === 2) {
              vetorAnalise[cont] = this.todosAlunos[a];
              cont++;
            }
          }
          this.Classifica(vetorAnalise, 4);
          break;

        case 772: //classifica alunos do 3 ano no 1 bimestre em todos os anos
          var cont = 0;
          var vetorAnalise = [];
          for (let a = 0; a < this.todosAlunos.length; a++) {
            if (this.todosAlunos[a].periodo === 3) {
              vetorAnalise[cont] = this.todosAlunos[a];
              cont++;
            }
          }
          this.Classifica(vetorAnalise, 1);
          break;

        case 1284: //classifica alunos do 3 ano no 2 bimestre em todos os anos
          var cont = 0;
          var vetorAnalise = [];
          for (let a = 0; a < this.todosAlunos.length; a++) {
            if (this.todosAlunos[a].periodo === 3) {
              vetorAnalise[cont] = this.todosAlunos[a];
              cont++;
            }
          }
          this.Classifica(vetorAnalise, 2);
          break;

        case 2308: //classifica alunos do 3 ano no 3 bimestre em todos os anos
          var cont = 0;
          var vetorAnalise = [];
          for (let a = 0; a < this.todosAlunos.length; a++) {
            if (this.todosAlunos[a].periodo === 3) {
              vetorAnalise[cont] = this.todosAlunos[a];
              cont++;
            }
          }
          this.Classifica(vetorAnalise, 3);
          break;

        case 8452: //classifica alunos do 3 ano em todos os bimestre e de todos os anos
          var cont = 0;
          var vetorAnalise = [];
          for (let a = 0; a < this.todosAlunos.length; a++) {
            if (this.todosAlunos[a].periodo === 3) {
              vetorAnalise[cont] = this.todosAlunos[a];
              cont++;
            }
          }
          this.Classifica(vetorAnalise, 4);
          break;

        case 776: //classifica alunos do 4 ano no 1 bimestre em todos os anos
          var cont = 0;
          var vetorAnalise = [];
          for (let a = 0; a < this.todosAlunos.length; a++) {
            if (this.todosAlunos[a].periodo === 4) {
              vetorAnalise[cont] = this.todosAlunos[a];
              cont++;
            }
          }
          this.Classifica(vetorAnalise, 1);
          break;

        case 1288: //classifica alunos do 4 ano no 2 bimestre em todos os anos
          var cont = 0;
          var vetorAnalise = [];
          for (let a = 0; a < this.todosAlunos.length; a++) {
            if (this.todosAlunos[a].periodo === 4) {
              vetorAnalise[cont] = this.todosAlunos[a];
              cont++;
            }
          }
          this.Classifica(vetorAnalise, 2);
          break;

        case 2312: //classifica alunos do 4 ano no 3 bimestre em todos os anos
          var cont = 0;
          var vetorAnalise = [];
          for (let a = 0; a < this.todosAlunos.length; a++) {
            if (this.todosAlunos[a].periodo === 4) {
              vetorAnalise[cont] = this.todosAlunos[a];
              cont++;
            }
          }
          this.Classifica(vetorAnalise, 3);
          break;

        case 8456: //classifica alunos do 4 ano em todos os bimestre e de todos os anos
          var cont = 0;
          var vetorAnalise = [];
          for (let a = 0; a < this.todosAlunos.length; a++) {
            if (this.todosAlunos[a].periodo === 4) {
              vetorAnalise[cont] = this.todosAlunos[a];
              cont++;
            }
          }
          this.Classifica(vetorAnalise, 4);
          break;

        case 560: //classifica alunos de todos os anos ano no 1 bimestre do curso de  edificações
          this.Classifica(this.vetorToAnalise("edificacoes", 5), 1);
          break;

        case 1072: //classifica alunos de todos os anos ano no 2 bimestre do curso de  edificações
          this.Classifica(this.vetorToAnalise("edificacoes", 5), 2);
          break;

        case 2096: //classifica alunos de todos os anos ano no 3 bimestre do curso de  edificações
          this.Classifica(this.vetorToAnalise("edificacoes", 5), 3);
          break;

        case 8240: //classifica alunos de todos os anos ano em todos os bimestre do curso de  edificações
          this.Classifica(this.vetorToAnalise("edificacoes", 5), 4);
          break;

        case 592: //classifica alunos de todos os anos ano no 1 bimestre do curso de  informatica
          this.Classifica(this.vetorToAnalise("informatica", 5), 1);
          break;

        case 1104: //classifica alunos de todos os anos ano no 2 bimestre do curso de  informatica
          this.Classifica(this.vetorToAnalise("informatica", 5), 2);
          break;

        case 2128: //classifica alunos de todos os anos ano no 3 bimestre do curso de  informatica
          this.Classifica(this.vetorToAnalise("informatica", 5), 3);
          break;

        case 8272: //classifica alunos de todos os anos ano em todos os bimestre do curso de  informatica
          this.Classifica(this.vetorToAnalise("informatica", 5), 4);
          break;

        case 656: //classifica alunos de todos os anos ano no 1 bimestre do curso de  logistica
          this.Classifica(this.vetorToAnalise("logistica", 5), 1);
          break;

        case 1168: //classifica alunos de todos os anos ano no 2 bimestre do curso de  logistica
          this.Classifica(this.vetorToAnalise("logistica", 5), 2);
          break;

        case 2192: //classifica alunos de todos os anos ano no 3 bimestre do curso de  logistica
          this.Classifica(this.vetorToAnalise("logistica", 5), 3);
          break;

        case 8336: //classifica alunos de todos os anos ano em todos os bimestre do curso de  logistica
          this.Classifica(this.vetorToAnalise("logistica", 5), 4);
          break;

        case 784: //classifica alunos de todos os anos, de todos os cursos no 1 bimestre
          this.Classifica(this.todosAlunos, 1);
          break;

        case 1296: //classifica alunos de todos os anos, de todos os cursos no 2 bimestre
          this.Classifica(this.todosAlunos, 2);
          break;

        case 2320: //classifica alunos de todos os anos, de todos os cursos no 3 bimestre
          this.Classifica(this.todosAlunos, 3);
          break;

        case 8225: //classifica alunos do 1 ano de edificações no 4 bimestre
          this.Classifica(this.vetorToAnalise("edificacoes", 1), 4);
          break;

        case 8226: //classifica alunos do 2 ano de edificações no 4 bimestre
          this.Classifica(this.vetorToAnalise("edificacoes", 2), 4);
          break;

        case 8228: //classifica alunos do 3 ano de edificações no 4 bimestre
          this.Classifica(this.vetorToAnalise("edificacoes", 3), 4);
          break;

        case 8232: //classifica alunos do 4 ano de edificações no 4 bimestre
          this.Classifica(this.vetorToAnalise("edificacoes", 4), 4);
          break;

        case 545: //classifica alunos do 1 ano de edificações no 1 bimestre
          this.Classifica(this.vetorToAnalise("edificacoes", 1), 1);
          break;

        case 1057: //classifica alunos do 1 ano de edificações no 2 bimestre
          this.Classifica(this.vetorToAnalise("edificacoes", 1), 2);
          break;

        case 2081: //classifica alunos do 1 ano de edificações no 3 bimestre
          this.Classifica(this.vetorToAnalise("edificacoes", 1), 3);
          break;

        case 546: //classifica alunos do 2 ano de edificações no 1 bimestre
          this.Classifica(this.vetorToAnalise("edificacoes", 2), 1);
          break;

        case 1058: //classifica alunos do 2 ano de edificações no 2 bimestre
          this.Classifica(this.vetorToAnalise("edificacoes", 2), 2);
          break;

        case 2082: //classifica alunos do 2 ano de edificações no 3 bimestre
          this.Classifica(this.vetorToAnalise("edificacoes", 2), 3);
          break;

        case 548: //classifica alunos do 3 ano de edificações no 1 bimestre
          this.Classifica(this.vetorToAnalise("edificacoes", 3), 1);
          break;

        case 1060: //classifica alunos do 3 ano de edificações no 2 bimestre
          this.Classifica(this.vetorToAnalise("edificacoes", 3), 2);
          break;

        case 2084: //classifica alunos do 3 ano de edificações no 3 bimestre
          this.Classifica(this.vetorToAnalise("edificacoes", 3), 3);
          break;

        case 552: //classifica alunos do 4 ano de edificações no 1 bimestre
          this.Classifica(this.vetorToAnalise("edificacoes", 4), 1);
          break;

        case 1064: //classifica alunos do 4 ano de edificações no 2 bimestre
          this.Classifica(this.vetorToAnalise("edificacoes", 4), 2);
          break;

        case 2088: //classifica alunos do 4 ano de edificações no 3 bimestre
          this.Classifica(this.vetorToAnalise("edificacoes", 4), 3);
          break;

        case 577: //classifica alunos do 1 ano de informatica no 1 bimestre
          this.Classifica(this.vetorToAnalise("informatica", 1), 1);
          break;

        case 1089: //classifica alunos do 1 ano de informatica no 2 bimestre
          this.Classifica(this.vetorToAnalise("informatica", 1), 2);
          break;

        case 2113: //classifica alunos do 1 ano de informatica no 3 bimestre
          this.Classifica(this.vetorToAnalise("informatica", 1), 3);
          break;

        case 8257: //classifica alunos do 1 ano de informatica no 4 bimestre
          this.Classifica(this.vetorToAnalise("informatica", 1), 4);
          break;

        case 578: //classifica alunos do 2 ano de informatica no 1 bimestre
          this.Classifica(this.vetorToAnalise("informatica", 2), 1);
          break;

        case 1090: //classifica alunos do 2 ano de informatica no 2 bimestre
          this.Classifica(this.vetorToAnalise("informatica", 2), 2);
          break;

        case 2114: //classifica alunos do 2 ano de informatica no 3 bimestre
          this.Classifica(this.vetorToAnalise("informatica", 2), 3);
          break;

        case 8258: //classifica alunos do 2 ano de informatica no 4 bimestre
          this.Classifica(this.vetorToAnalise("informatica", 2), 4);
          break;

        case 580: //classifica alunos do 3 ano de informatica no 1 bimestre
          this.Classifica(this.vetorToAnalise("informatica", 3), 1);
          break;

        case 1092: //classifica alunos do 3 ano de informatica no 2 bimestre
          this.Classifica(this.vetorToAnalise("informatica", 3), 2);
          break;

        case 2116: //classifica alunos do 3 ano de informatica no 3 bimestre
          this.Classifica(this.vetorToAnalise("informatica", 3), 3);
          break;

        case 8260: //classifica alunos do 3 ano de informatica no 4 bimestre
          this.Classifica(this.vetorToAnalise("informatica", 3), 4);
          break;

        case 584: //classifica alunos do 4 ano de informatica no 1 bimestre
          this.Classifica(this.vetorToAnalise("informatica", 4), 1);
          break;

        case 1096: //classifica alunos do 4 ano de informatica no 2 bimestre
          this.Classifica(this.vetorToAnalise("informatica", 4), 2);
          break;

        case 2120: //classifica alunos do 4 ano de informatica no 3 bimestre
          this.Classifica(this.vetorToAnalise("informatica", 4), 3);
          break;

        case 8264: //classifica alunos do 4 ano de informatica no 4 bimestre
          this.Classifica(this.vetorToAnalise("informatica", 4), 4);
          break;

        case 641: //classifica alunos do 1 ano de logistica no 1 bimestre
          this.Classifica(this.vetorToAnalise("logistica", 1), 1);
          break;

        case 1153: //classifica alunos do 1 ano de logistica no 2 bimestre
          this.Classifica(this.vetorToAnalise("logistica", 1), 2);
          break;

        case 2177: //classifica alunos do 1 ano de logistica no 3 bimestre
          this.Classifica(this.vetorToAnalise("logistica", 1), 3);
          break;

        case 8321: //classifica alunos do 1 ano de logistica no 4 bimestre
          this.Classifica(this.vetorToAnalise("logistica", 1), 4);
          break;

        case 642: //classifica alunos do 2 ano de logistica no 1 bimestre
          this.Classifica(this.vetorToAnalise("logistica", 2), 1);
          break;

        case 1154: //classifica alunos do 2 ano de logistica no 2 bimestre
          this.Classifica(this.vetorToAnalise("logistica", 2), 2);
          break;

        case 2178: //classifica alunos do 2 ano de logistica no 3 bimestre
          this.Classifica(this.vetorToAnalise("logistica", 2), 3);
          break;

        case 8322: //classifica alunos do 2 ano de logistica no 4 bimestre
          this.Classifica(this.vetorToAnalise("logistica", 2), 4);
          break;

        case 644: //classifica alunos do 3 ano de logistica no 1 bimestre
          this.Classifica(this.vetorToAnalise("logistica", 3), 1);
          break;

        case 1156: //classifica alunos do 3 ano de logistica no 2 bimestre
          this.Classifica(this.vetorToAnalise("logistica", 3), 2);
          break;

        case 2180: //classifica alunos do 3 ano de logistica no 3 bimestre
          this.Classifica(this.vetorToAnalise("logistica", 3), 3);
          break;

        case 8324: //classifica alunos do 3 ano de logistica no 4 bimestre
          this.Classifica(this.vetorToAnalise("logistica", 3), 4);
          break;

        case 648: //classifica alunos do 4 ano de logistica no 1 bimestre
          this.Classifica(this.vetorToAnalise("logistica", 4), 1);
          break;

        case 1160: //classifica alunos do 4 ano de logistica no 2 bimestre
          this.Classifica(this.vetorToAnalise("logistica", 4), 2);
          break;

        case 2184: //classifica alunos do 4 ano de logistica no 3 bimestre
          this.Classifica(this.vetorToAnalise("logistica", 4), 3);
          break;

        case 8328: //classifica alunos do 4 ano de logistica no 4 bimestre
          this.Classifica(this.vetorToAnalise("logistica", 4), 4);
          break;

        default:
          this.Classifica(this.todosAlunos, 4);
          break;
      }
    },

    vetorToAnalise(curso, periodo) {
      var cont = 0;
      var vetorAnalise = [];
      if (periodo === 5) {
        for (let a = 0; a < this.todosAlunos.length; a++) {
          if (this.todosAlunos[a].curso === curso) {
            vetorAnalise[cont] = this.todosAlunos[a];
            cont++;
          }
        }
      } else {
        for (let a = 0; a < this.todosAlunos.length; a++) {
          if (
            this.todosAlunos[a].curso === curso &&
            this.todosAlunos[a].periodo === periodo
          ) {
            vetorAnalise[cont] = this.todosAlunos[a];
            cont++;
          }
        }
      }
      return vetorAnalise;
    },

    Classifica(vetor, bimestre) {
      var contAltoRisco = 0;
      var contMedioRisco = 0;
      var contBaixoRisco = 0;
      var contBaixaNota = 0;
      var contBaixaFreq = 0;

      for (let i = 0; i < vetor.length; i++) {
        //ver alunos
        var todasMedia = 0; //soma todas as medias para verificar se com todas as medias somadas e divididas pela quantidade de materias do aluno ele atinge 60
        var media = 0;
        for (let j = 0; j < vetor[i].disciplinas.length; j++) {
          // ver disciplinas
          if (bimestre === 1) {
            todasMedia = todasMedia + vetor[i].disciplinas[j].nota1;
            media = todasMedia / vetor[i].disciplinas.length;
          } else if (bimestre === 2) {
            todasMedia =
              todasMedia +
              (vetor[i].disciplinas[j].nota1 + vetor[i].disciplinas[j].nota2) /
                2;
            media = todasMedia / vetor[i].disciplinas.length;
          } else if (bimestre === 3) {
            todasMedia =
              todasMedia +
              (vetor[i].disciplinas[j].nota1 +
                vetor[i].disciplinas[j].nota2 +
                vetor[i].disciplinas[j].nota3) /
                3;
            media = todasMedia / vetor[i].disciplinas.length;
          } else if (bimestre === 4) {
            todasMedia = todasMedia + vetor[i].disciplinas[j].media;
            media = todasMedia / vetor[i].disciplinas.length;
          }
        }

        //console.log(todasMedia)
        //console.log(media.toFixed(1))

        if (parseInt(vetor[i].presenca) < 75) {
          if (this.verifica_repetição_vetor(this.alunosBaixaFreq) === false) {
            this.alunosBaixaFreq[contBaixaFreq] = vetor[i];
            contBaixaFreq++;
          }
        }

        if (media < 40) {
          if (this.verifica_repetição_vetor(this.alunosBaixaNota) === false) {
            this.alunosBaixaNota[contBaixaNota] = vetor[i];
            contBaixaNota++;
          }
        }


        if (media < 40 && parseInt(vetor[i].presenca) < 75) {
          // se a condição for verdadeira o alunos está em risco de evasão
          if (
            this.verifica_repetição_vetor(
              this.alunosAltoRisco,
              vetor[i].matricula
            ) === false
          ) {
            this.alunosAltoRisco[contAltoRisco] = vetor[i];
            contAltoRisco++;
          }
          //console.log(this.alunosAltoRisco[contAltoRisco].presenca);
        } else if (
          media > 40 &&
          media < 60 &&
          parseInt(vetor[i].presenca) < 75
        ) {
          if (
            this.verifica_repetição_vetor(
              this.alunosMedioRisco,
              vetor[i].matricula
            ) === false
          ) {
            this.alunosMedioRisco[contMedioRisco] = vetor[i];
            contMedioRisco++;
          }
          //console.log(this.alunosMedioRisco[contMedioRisco].nome)
        } else {
          if (
            this.verifica_repetição_vetor(
              this.alunosBaixoRisco,
              vetor[i].matricula
            ) === false
          ) {
            this.alunosBaixoRisco[contBaixoRisco] = vetor[i];
            contBaixoRisco++;
          }
          //console.log(this.alunosBaixoRisco[contBaixoRisco].nome)
        }
        //console.log(this.alunosMedioRisco[contMedioRisco].matricula);
        //console.log(contMedioRisco)
      }
      /*for (let o = 0; o < this.alunosMedioRisco.length; o++) {
								console.log(this.alunosMedioRisco[o].nome)
								
							}*/

      this.organiza_array(this.alunosAltoRisco);
      this.organiza_array(this.alunosMedioRisco);
      this.organiza_array(this.alunosBaixoRisco);
      this.organiza_array(this.alunosBaixaFreq);


    //remove o grafico quantitativo de alunos em risco para poder reconstruir
      $("#g1").remove();
      $(".g1").append('<div id="g1" class="chart"> </div>');

      //remove o grafico quantitativo de notas e presenca de alunos para poder reconstruir
      $("#g2").remove();
      $(".g2").append('<div id="g2" class="chart"> </div>');


      this.graficos(this.alunosAltoRisco.length, this.alunosMedioRisco.length, this.alunosBaixoRisco.length, this.alunosBaixaNota.length, this.alunosBaixaFreq.length);
      
    },

    dados() {
      for (let i = 0; i < this.todosAlunos.length; i++) {
        if (this.todosAlunos[i].matricula === this.aluno) {
          this.$modal.show("dialog", {
            title: "Dados de: " + this.todosAlunos[i].nome,
            text:
              "Curso: " +
              this.todosAlunos[i].curso +
              "<br> Periodo: " +
              this.todosAlunos[i].periodo +
              "<br> Matricula: " +
              this.todosAlunos[i].matricula +
              "<br> Frequencia total: " +
              this.todosAlunos[i].presenca,
            buttons: [{ title: "Fechar janela" }]
          });
          break;
        }
      }
    },

    graficos(aar,amr,abr,apn,app){

      //grafico de rosquinha
      
$(function(){
  $("#g1").drawDoughnutChart([
    { title: "Alunos com Alto Risco de Evasão",     value : aar,  color: "rgb(238, 24, 16)" },
    { title: "Alunos com Potencial Risco de Evasão", value:  amr,   color: " #ffd32e" },
    { title: "Alunos com Baixo ou Nulo Risco de Evasão",  value:  abr,   color: "rgb(9, 156, 21)" },
  ]);

  $("#g2").drawDoughnutChart([
    { title: "Quantidade de Alunos com Notas Preocupantes",     value : aar,  color: "rgb(102, 9, 156)" },
    { title: "Quantidade de Alunos com Frequência Abaixo de 75%", value:  amr,   color: "rgb(9, 68, 156)" },
  ]);
});
/*!
 * jquery.drawDoughnutChart.js
 * Version: 0.4.1(Beta)
 * Inspired by Chart.js(http://www.chartjs.org/)
 *
 * Copyright 2014 hiro
 * https://github.com/githiro/drawDoughnutChart
 * Released under the MIT license.
 * 
 */
;(function($, undefined) {
  $.fn.drawDoughnutChart = function(data, options) {
    var $this = this,
      W = $this.width(),
      H = $this.height(),
      centerX = W/2,
      centerY = H/2,
      cos = Math.cos,
      sin = Math.sin,
      PI = Math.PI,
      settings = $.extend({
        segmentShowStroke : true,
        segmentStrokeColor : "#0C1013",
        segmentStrokeWidth : 1,
        baseColor: "rgba(0,0,0,0.5)",
        baseOffset: 4,
        edgeOffset : 10,//offset from edge of $this
        percentageInnerCutout : 75,
        animation : true,
        animationSteps : 90,
        animationEasing : "easeInOutExpo",
        animateRotate : true,
        tipOffsetX: -8,
        tipOffsetY: -45,
        tipClass: "doughnutTip",
        summaryClass: "doughnutSummary",
        summaryTitle: "TOTAL:",
        summaryTitleClass: "doughnutSummaryTitle",
        summaryNumberClass: "doughnutSummaryNumber",
        beforeDraw: function() {  },
        afterDrawed : function() {  },
        onPathEnter : function(e,data) {  },
        onPathLeave : function(e,data) {  }
      }, options),
      animationOptions = {
        linear : function (t) {
          return t;
        },
        easeInOutExpo: function (t) {
          var v = t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t;
          return (v>1) ? 1 : v;
        }
      },
      requestAnimFrame = function() {
        return window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.oRequestAnimationFrame ||
          window.msRequestAnimationFrame ||
          function(callback) {
            window.setTimeout(callback, 1000 / 60);
          };
      }();

    settings.beforeDraw.call($this);

    var $svg = $('<svg width="' + W + '" height="' + H + '" viewBox="0 0 ' + W + ' ' + H + '" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"></svg>').appendTo($this),
        $paths = [],
        easingFunction = animationOptions[settings.animationEasing],
        doughnutRadius = Min([H / 2,W / 2]) - settings.edgeOffset,
        cutoutRadius = doughnutRadius * (settings.percentageInnerCutout / 100),
        segmentTotal = 0;

    //Draw base doughnut
    var baseDoughnutRadius = doughnutRadius + settings.baseOffset,
        baseCutoutRadius = cutoutRadius - settings.baseOffset;
    $(document.createElementNS('http://www.w3.org/2000/svg', 'path'))
      .attr({
        "d": getHollowCirclePath(baseDoughnutRadius, baseCutoutRadius),
        "fill": settings.baseColor
      })
      .appendTo($svg);

    //Set up pie segments wrapper
    var $pathGroup = $(document.createElementNS('http://www.w3.org/2000/svg', 'g'));
    $pathGroup.attr({opacity: 0}).appendTo($svg);

    //Set up tooltip
    var $tip = $('<div class="' + settings.tipClass + '" />').appendTo('body').hide(),
        tipW = $tip.width(),
        tipH = $tip.height();

    //Set up center text area
    var summarySize = (cutoutRadius - (doughnutRadius - cutoutRadius)) * 2,
        $summary = $('<div class="' + settings.summaryClass + '" />')
                   .appendTo($this)
                   .css({ 
                     width: summarySize + "px",
                     height: summarySize + "px",
                     "margin-left": -(summarySize / 2) + "px",
                     "margin-top": -(summarySize / 2) + "px"
                   });
    var $summaryTitle = $('<p class="' + settings.summaryTitleClass + '">' + settings.summaryTitle + '</p>').appendTo($summary);
    var $summaryNumber = $('<p class="' + settings.summaryNumberClass + '"></p>').appendTo($summary).css({opacity: 0});

    for (var i = 0, len = data.length; i < len; i++) {
      segmentTotal += data[i].value;
      $paths[i] = $(document.createElementNS('http://www.w3.org/2000/svg', 'path'))
        .attr({
          "stroke-width": settings.segmentStrokeWidth,
          "stroke": settings.segmentStrokeColor,
          "fill": data[i].color,
          "data-order": i
        })
        .appendTo($pathGroup)
        .on("mouseenter", pathMouseEnter)
        .on("mouseleave", pathMouseLeave)
        .on("mousemove", pathMouseMove);
    }

    //Animation start
    animationLoop(drawPieSegments);

    //Functions
    function getHollowCirclePath(doughnutRadius, cutoutRadius) {
        //Calculate values for the path.
        //We needn't calculate startRadius, segmentAngle and endRadius, because base doughnut doesn't animate.
        var startRadius = -1.570,// -Math.PI/2
            segmentAngle = 6.2831,// 1 * ((99.9999/100) * (PI*2)),
            endRadius = 4.7131,// startRadius + segmentAngle
            startX = centerX + cos(startRadius) * doughnutRadius,
            startY = centerY + sin(startRadius) * doughnutRadius,
            endX2 = centerX + cos(startRadius) * cutoutRadius,
            endY2 = centerY + sin(startRadius) * cutoutRadius,
            endX = centerX + cos(endRadius) * doughnutRadius,
            endY = centerY + sin(endRadius) * doughnutRadius,
            startX2 = centerX + cos(endRadius) * cutoutRadius,
            startY2 = centerY + sin(endRadius) * cutoutRadius;
        var cmd = [
          'M', startX, startY,
          'A', doughnutRadius, doughnutRadius, 0, 1, 1, endX, endY,//Draw outer circle
          'Z',//Close path
          'M', startX2, startY2,//Move pointer
          'A', cutoutRadius, cutoutRadius, 0, 1, 0, endX2, endY2,//Draw inner circle
          'Z'
        ];
        cmd = cmd.join(' ');
        return cmd;
    };
    function pathMouseEnter(e) {
      var order = $(this).data().order;
      $tip.text(data[order].title + ": " + data[order].value)
          .fadeIn(200);
      settings.onPathEnter.apply($(this),[e,data]);
    }
    function pathMouseLeave(e) {
      $tip.hide();
      settings.onPathLeave.apply($(this),[e,data]);
    }
    function pathMouseMove(e) {
      $tip.css({
        top: e.pageY + settings.tipOffsetY,
        left: e.pageX - $tip.width() / 2 + settings.tipOffsetX
      });
    }
    function drawPieSegments (animationDecimal) {
      var startRadius = -PI / 2,//-90 degree
          rotateAnimation = 1;
      if (settings.animation && settings.animateRotate) rotateAnimation = animationDecimal;//count up between0~1

      drawDoughnutText(animationDecimal, segmentTotal);

      $pathGroup.attr("opacity", animationDecimal);

      //If data have only one value, we draw hollow circle(#1).
      if (data.length === 1 && (4.7122 < (rotateAnimation * ((data[0].value / segmentTotal) * (PI * 2)) + startRadius))) {
        $paths[0].attr("d", getHollowCirclePath(doughnutRadius, cutoutRadius));
        return;
      }
      for (var i = 0, len = data.length; i < len; i++) {
        var segmentAngle = rotateAnimation * ((data[i].value / segmentTotal) * (PI * 2)),
            endRadius = startRadius + segmentAngle,
            largeArc = ((endRadius - startRadius) % (PI * 2)) > PI ? 1 : 0,
            startX = centerX + cos(startRadius) * doughnutRadius,
            startY = centerY + sin(startRadius) * doughnutRadius,
            endX2 = centerX + cos(startRadius) * cutoutRadius,
            endY2 = centerY + sin(startRadius) * cutoutRadius,
            endX = centerX + cos(endRadius) * doughnutRadius,
            endY = centerY + sin(endRadius) * doughnutRadius,
            startX2 = centerX + cos(endRadius) * cutoutRadius,
            startY2 = centerY + sin(endRadius) * cutoutRadius;
        var cmd = [
          'M', startX, startY,//Move pointer
          'A', doughnutRadius, doughnutRadius, 0, largeArc, 1, endX, endY,//Draw outer arc path
          'L', startX2, startY2,//Draw line path(this line connects outer and innner arc paths)
          'A', cutoutRadius, cutoutRadius, 0, largeArc, 0, endX2, endY2,//Draw inner arc path
          'Z'//Cloth path
        ];
        $paths[i].attr("d", cmd.join(' '));
        startRadius += segmentAngle;
      }
    }
    function drawDoughnutText(animationDecimal, segmentTotal) {
      $summaryNumber
        .css({opacity: animationDecimal})
        .text((segmentTotal * animationDecimal).toFixed(1));
    }
    function animateFrame(cnt, drawData) {
      var easeAdjustedAnimationPercent =(settings.animation)? CapValue(easingFunction(cnt), null, 0) : 1;
      drawData(easeAdjustedAnimationPercent);
    }
    function animationLoop(drawData) {
      var animFrameAmount = (settings.animation)? 1 / CapValue(settings.animationSteps, Number.MAX_VALUE, 1) : 1,
          cnt =(settings.animation)? 0 : 1;
      requestAnimFrame(function teste() {
          cnt += animFrameAmount;
          animateFrame(cnt, drawData);
          if (cnt <= 1) {
            requestAnimFrame(teste);
          } else {
            settings.afterDrawed.call($this);
          }
      });
    }
    function Max(arr) {
      return Math.max.apply(null, arr);
    }
    function Min(arr) {
      return Math.min.apply(null, arr);
    }
    function isNumber(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }
    function CapValue(valueToCap, maxValue, minValue) {
      if (isNumber(maxValue) && valueToCap > maxValue) return maxValue;
      if (isNumber(minValue) && valueToCap < minValue) return minValue;
      return valueToCap;
    }
    return $this;
  };
})(jQuery);
// fim do grafico de rosquinha

    }
  }
};
</script>

<style>
.org_risco {
  background: whitesmoke;
  padding: 15px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  box-shadow: inset 1px 1px 0 white;
  height: auto;
}

.org_risco > div {
  display: inline-block;
  width: 33%;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 13px;
}

h2{
  text-align: center;
}

.ul_lista {
  margin: 0 auto;
  padding: 0;
  max-height: 390px;
  min-height: 390px;
  overflow-y: auto;
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 5px 5px 0 5px;
  border-left: none;
  border-right: none;
  font-size: 16px;
}

.li_lista {
  list-style: none;
  background-color: rgba(0, 0, 0, 0.05);
  padding: 10px 15px 10px 25px;
  border: 1px solid #ccc;
  box-shadow: inset 1px 1px 0 rgba(255, 255, 255, 0.5);
  margin-bottom: 5px;
  width: 100%;
  box-sizing: border-box;
  cursor: pointer;
  border-radius: 3px;
}

.medio {
  background-image: linear-gradient(
    90deg,
    #ffd32e 10px,
    #eee 10px,
    #eee 11px,
    transparent 11px
  );
}

.alto {
  background-image: linear-gradient(
    90deg,
    rgb(238, 24, 16) 10px,
    #eee 10px,
    #eee 11px,
    transparent 11px
  );
}

.baixo {
  background-image: linear-gradient(
    90deg,
    rgb(9, 156, 21) 10px,
    #eee 10px,
    #eee 11px,
    transparent 11px
  );
}

.baixa_nota {
  background-image: linear-gradient(
    90deg,
    rgb(102, 9, 156) 10px,
    #eee 10px,
    #eee 11px,
    transparent 11px
  );
}

.baixa_freq {
  background-image: linear-gradient(
    90deg,
    rgb(9, 68, 156) 10px,
    #eee 10px,
    #eee 11px,
    transparent 11px
  );
}

/* grafico de rosquinha*/
@import url(//fonts.googleapis.com/css?family=Oswald:400);



.chart {
  position: relative;
  width: 450px;
  height: 340px;
}
.doughnutTip {
  position: absolute;
  min-width: 30px;
  max-width: 500px;
  padding: 5px 15px;
  border-radius: 1px;
  background: rgba(0,0,0,.8);
  color: white;
  font-size: 17px;
  text-shadow: 0 1px 0 #000;
  text-transform: uppercase;
  text-align: justify;
  line-height: 1.3;
  letter-spacing: .06em;
  box-shadow: 0 1px 3px rgba(0,0,0,0.5);
  pointer-events: none;
}
.doughnutSummary {
  position: absolute;
  top: 50%;
  left: 50%;
  color: rgb(59, 58, 58);
  text-align: center;
  /*text-shadow: 0 -1px 0 #111;*/
  cursor: default;
}
.doughnutSummaryTitle {
  position: absolute;
  top: 50%;
  width: 100%;
  margin-top: -27%;
  font-size: 22px;
  letter-spacing: .06em;
}
.doughnutSummaryNumber {
  position: absolute;
  top: 50%;
  width: 100%;
  margin-top: -15%;
  font-size: 40px;
}
.chart path:hover { opacity: 0.65; }

/* fim dos grafico de rosquinha*/

/* divs pai dos graficos*/
svg{
  height: 300px ;
}

.g1, .g2{
  width: 450px;
  display: inline-block;
  margin-left: 15%;
  text-align: center;
  color: rgb(59, 58, 58);
}

.graficos{
  background-color: rgb(230, 230, 230);
  font-family: Arial, Helvetica, sans-serif;
}
/* fim das divs pai dos graficos*/

footer{
  color: white;
  background-color: rgb(59, 58, 58);
  padding: 40px 0px;
}

.obs{
  text-align: justify;
  margin-left: 1%;
  padding: 0% 2%;
  border: 2px solid gray;
  border-radius: 40px;
  width: 40%;
}

.menu{
  padding: 2% 0% 2% 2%;
  background-image: linear-gradient(#ccc, white);
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
}

header{
  background: black;
}

header > img{
  height: 100px;
}
</style>
