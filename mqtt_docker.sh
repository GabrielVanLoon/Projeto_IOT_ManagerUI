#!/bin/bash

# Instala utilitarios do mosquitto (https://www.vultr.com/docs/how-to-install-mosquitto-mqtt-broker-server-on-ubuntu-16-04)
# sudo apt-get update
#sudo apt-get install mosquitto
# sudo apt-get install mosquitto-clients

# Instalando a imagem do Mosquitto MQTT (https://hub.docker.com/_/eclipse-mosquitto)
docker pull eclipse-mosquitto

# Inicia usando um mosquitto.conf personalizado
docker run -it -p 1883:1883 -p 9001:9001 -v $(pwd)/mosquitto.conf:/mosquitto/config/mosquitto.conf eclipse-mosquitto

# Inicia usando mosquitto.conf default
# docker run -it -p 1883:1883 -p 9001:9001 eclipse-mosquitto

# Criando um subscriber + publisher para verificar o docker (copiar e colar manualmente)
# mosquitto_sub -h localhost -t "test"
# mosquitto_pub -h localhost -t "test" -m "message from mosquitto_pub client" 