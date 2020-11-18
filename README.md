# Projeto - Internet of Things User Application
Camada de aplicação do projeto da disciplina SSC0952 - Internet das Coisas (2020) utilizando uma Aplicação Web com React e Node.js.

## Informações do Checkpoint 2 

Para o segundo checkpoint foi desenvolvido a aplicação web `websocket-client` que teve como objetivos:

- Testar a comunicação do protocolo MQTT utilizando Websockets
- Implementar as comunicações e regras de mensagens para cada um tipos de sensores
- Criar uma aplicação que simulasse o comportamento do laboratório real

Esta aplicação está pronta e funcional. Para executá-la basta seguir as instruções da pasta [README.md](/websock-client).

Já a aplicação `frontiot` (que será a aplicação com interface e funcionalidades finais) ainda está com a interface em construção mas conseguirá reaproveitar toda a lógica de conexão já criada no `websocket-client`. O objetivo dela será, além de agir como client do broker,  possuir uma tela simples de autenticação e também algumas telas que exibam informações vindas do microsserviços.

