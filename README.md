# dynamic-domotic

Projeto de automação residencial dinâmica e flexível, independente de tecnologia embarcada, prevendo programação gráfica por um usuário comum.


![alt tag](https://cloud.githubusercontent.com/assets/1044309/6205813/5df7ae76-b562-11e4-979b-9aa9bea7cd8a.png)


### Instalação Dependências

O diretório raiz tem o arquivo package.json que contém todas as dependências do projeto. 
Para instalá-las use:
```sh
$ npm install
```

### Rodar o servidor
Para que o servidor funcione, precisa configurar a linha 2 do ServerListening com o IP da máquina local. Então rode:
```sh
$ sudo nodejs src/server/ServerListening.js
```


### Para rodar o cliente
Assim como o servidor, o cliente precisa usar um ip válido na máquina que o está rodando. Altera a variável clientIP do arquivo test/UDPClient/udpclientbroadcast.js.
Enfim, rode:
```sh
$ sudo nodejs test/UDPClient/udpclientbroadcast.js
```

### Adicionar reposit�rio externo Closure Library
Esse projeto usa a Closure Library do Google, atrav�s do git submodule. Estando a raiz do projeto acesse:
```sh
$ cd src/server/
```

Ent�o, baixe a biblioteca:
```sh
$ git clone https://github.com/chaconinc/MainProject
```

Finalmente, basta atualizar o projeto:
```sh
$ git submodule update
```