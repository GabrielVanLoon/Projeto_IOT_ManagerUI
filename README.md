# Projeto - Internet of Things User Application
Camada de aplicação do projeto da disciplina SSC0952 - Internet das Coisas (2020) utilizando uma Aplicação Web com React e Node.js.

## Descrição do Projeto

O projeto conta com duas aplicações web feitas com o framework **React.js**: `Front IOT` e `Websocket-Client`, ambas desenvolvidas com finalidades distintas.

## Aplicação: Front IOT 

Aplicação definitiva criada para servir como interface ao usuário final do projeto. Possui comunicações com o Broker e com a camada de Microsserviços.

![](https://i.imgur.com/prVEpHo.png)

Mais detalhes sobre como instalar e executar no [README.md](/frontiot).

## Aplicação: WebSocket Client

Aplicação criada para as primeiras etapas do projeto e que possui uma interface visual para se comunicar com o Broker MQTT utilizando conexões via Websocket.

Possui também o papel de, junto com um container docker, simular o broker e o comportamento dos dispositivos publicando dados no Mosquitto no formato JSON conforme as regras especificadas previamente no projeto.

![](https://i.imgur.com/LVdFy5z.png)

Mais detalhes sobre como instalar e executar no [README.md](/websock-client).
