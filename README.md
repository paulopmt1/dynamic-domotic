# dynamic-domotic

Projeto de automação residencial dinâmica e flexível, independente de tecnologia embarcada, prevendo programação gráfica por um usuário comum.


![alt tag](https://cloud.githubusercontent.com/assets/1044309/6201161/0f57f06e-b481-11e4-8739-b9f9ef589566.png)


# Instalação Dependências
O diretório raiz tem o arquivo package.json que contém todas as dependências do projeto. 
Para instalá-las use:

$ npm install


# Rodar o servidor
Para que o servidor funcione, precisa configurar a linha 2 do ServerListening com o IP da máquina local. Então rode:
$ sudo nodejs src/server/ServerListening.js


# Para rodar o cliente
Assim como o servidor, o cliente precisa usar um ip válido na máquina que o está rodando. Altera a variável clientIP do arquivo test/UDPClient/udpclientbroadcast.js.
Enfim, rode:
$ sudo nodejs test/UDPClient/udpclientbroadcast.js
