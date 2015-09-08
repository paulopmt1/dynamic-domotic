// Programa : Teste modulo wireless ESP8266
// Autor : Arduino e Cia

// Carrega as bibliotecas ESP8266 e SoftwareSerial
#include "ESP8266.h"
#include "SoftwareSerial.h"
    
// Cria uma serial nas portas 2 (RX) e 3 (TX)
SoftwareSerial minhaSerial(2 , 3); 

// Configuracao ID e senha da rede Wireless
#define SSID        "KAIOMY"
#define PASSWORD    ""

char *rede = "KAIOMY";
char *senha = "";

// Configuraçao de porta a ouvir no HTTP
String HTTP_LISTENING_PORT = "80";
#define SERVER_REMOTE_UDP_PORT 1010

#define DEBUG true

void setup()
{
    Serial.begin(115200);
    startup();
    startupHTTPServer();
    
}


boolean aguardaResposta(const char *sucesso, unsigned long limite=7000, boolean mostrar=false) {
  char resp[90];
  unsigned long chegada=millis();
  unsigned long tempo;
  boolean continuar=true; 
  boolean timeout=false;
  int contaChars=0;
  while (continuar) { 
    if (minhaSerial.available()) {
      resp[contaChars] = minhaSerial.read();
      contaChars++;
      if (contaChars>88) contaChars=0;  // aqui deveria haver uma condicao de erro
#ifndef debug
      if (mostrar) {
        Serial.print(resp[contaChars-1]);
      }
#else
      Serial.print(resp[contaChars-1]);
#endif      
      if (resp[contaChars-1]==10) {  // LF, fim da linha recebida
        if (contaChars>1) {
          resp[contaChars-2]='∖0';
          if (0==strcmp(resp,"OK")) continuar=false;
          else if (0==strcmp(resp,"SEND OK")) continuar=false;
          else if (0==strcmp(resp,"ready")) continuar=false;
          else if (0==strcmp(resp,"error")) continuar=false;
          else if (0==strcmp(resp,"ERROR")) continuar=false;
          else if (0==strcmp(resp,"Unlink")) continuar=false;
          contaChars=0;
        }  
      }  
    }  
    tempo=millis()-chegada;
    if (tempo > limite) {
      timeout=true;
      continuar=false;
    }  
  }
  boolean retorno=false;
  if (!timeout & (0==strcmp(resp,sucesso))) retorno=true;  
  return retorno;
} 

void startup(){
  Serial.print("Inicializando modulo\r\n");
    
  
  minhaSerial.begin(19200); // your esp's baud rate might be different
  
  sendData("AT+RST\r\n"); // reset module
  sendData("AT+GMR\r\n");
  aguardaResposta("OK",300);
  if (!conectaWiFi()){
    Serial.println("Falha ao conectar wifi");
  }
  
  sendData("AT+CIFSR\r\n"); // get ip address
  aguardaResposta("OK",300);
  Serial.println("velocidade atual");
  sendData("AT+CIOBAUD?\r\n");
  aguardaResposta("OK",300);
  
  startupHTTPServer();
  
}

boolean conectaWiFi() {
  sendData("AT+CWMODE=3\r\n"); // configure as access point
  
  char comando[100]="AT+CWJAP=\"";
  strcat(comando,rede);
  strcat(comando,"\",\"");
  strcat(comando,senha);
  strcat(comando,"\"");
  strcat(comando, "\r\n");
  sendData(comando);
  return aguardaResposta("OK",3000);
} 

void startupHTTPServer(){
  // Ativa servidor
  sendData("AT+CIPMUX=1\r\n"); // configure for multiple connections
  aguardaResposta("OK",500);
  sendData("AT+CIPSERVER=1,80\r\n"); // turn on server on port 80
  aguardaResposta("OK",500);
  Serial.println("aguardando conexao");
}




void loop()
{
  if(minhaSerial.available()) // check if the esp is sending a message 
  {
    if(minhaSerial.find("+IPD,")){
      delay(100);
      
      int test = minhaSerial.read() -48;
      Serial.print("conexaoId: ");
      Serial.println(test);
      
      // Limpa leitura serial
      /*while(minhaSerial.available()){
        //minhaSerial.read();
      }*/
      
      String data = "HTTP/1.1 200 OK\n";
      data += "Connection: close\n";
      data += "Content-Type: text/html\n";
      data += "Content-Length: 14\n\n";
      data += "<h1>teste</h1>\r\n";
      
      // Informa que vai enviar um pacote de tamanho X
      String final = "AT+CIPSEND=";
      final += test;
      final += ",";
      final += data.length();
      final += "\r\n";
      
      sendData(final);
      sendData(data);
      
      String closeConn = "AT+CIPCLOSE=";
      closeConn += test;
      closeConn += "\r\n";
      sendData(closeConn);
    }
  }
}


String sendData(String command)
{
  const int timeout = 1000;
  boolean debug = true;
    String response = "";
    
    minhaSerial.print(command); // send the read character to the esp8266
    
    long int time = millis();
    
    while( (time+timeout) > millis())
    {
      while(minhaSerial.available())
      {
        
        // The esp has data so display its output to the serial window 
        char c = minhaSerial.read(); // read the next character.
        response+=c;
      }  
    }
    
    if(debug)
    {
      Serial.print(response);
    }
    
    return response;
}



