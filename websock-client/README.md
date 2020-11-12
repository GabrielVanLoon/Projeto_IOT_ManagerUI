# Utilitário - Broker Simulator
Aplicação web utilitária que permite simular os dispositivos (*things*) que serão acessados no projeto no formato JSON previamente definido e facilitando a realização dos testes de sua camada.

## Instalação e Dependências
Para utilizar a aplicação e o broker será necessário a instalação do `docker` para executar o container com o broker mosquitto e o `npm` para rodar a aplicação react (preferencialmente última versão estável de ambos). Após baixar as dependências, basta executar os seguintes comandos:

```bash=
sudo apt-get install mosquitto-clients # Opcional - Clients CLI para testar pub e subscribe no mosquitto
docker pull eclipse-mosquitto # Baixa a imagem do mosquitto para o docker
npm install # instala as depedências do projeto na pasta node_modules 
```

## Configurando o Schema dos dispositivos
Para configurar o ID do time, da sala e dos dispositivos para serem simulados, basta modificar o arquivo localizado em `src/things_schemas.json`. Ex: Caso o seu time seja o nº 2, responsável pela sala nº 3 e com os sensores de temperatura 1, 2 e 3 o arquivo deverá ser do seguinte formato:

```json
{
    "team": 2,
    "room": {
        "id": 3,
        "sensors": { "temperature": [1, 2, 3]  }
    }
}
```

## Como Executar

### Executando o Container Mosquitto
Após a instalação das dependências, basta abrir o projeto no seu terminal de preferência, navegar até a raíz do projeto (que contém o arquivo de configuração `mosquitto.conf` e executar o seguinte comando para iniciar o container:

```bash
docker run -it -p 1883:1883 -p 9001:9001 -v $(pwd)/mosquitto.conf:/mosquitto/config/mosquitto.conf eclipse-mosquitto
```

Obs: Caso a porta 1883 ou 9001 esteja ocupada, a inicialização irá falhar e será necessário encerrar o dispositivo que está ocupando as portas antes de rodar o comando acima novamente.

Após a inicialização do container, as mensagens de que as portas IPv4, IPv6 e Websocket foram expostas serão exibidas e o broker irá executar até que seja encerrado com um sinal `CTRL^C`

### Executando o Broker Simulator
Após iniciar a execução do mosquitto, basta iniciar a aplicação React utilizando o seguinte comando:

```
npm start
```

Isso irá abrir um webserver na url `http://localhost:3000` e inicializará a aplicação no navegador padrão automaticamente.

## Como Utilizar
Para cada um dos dispositivos definidos no `things_schema.json`, será gerado um card. O tópico ao qual o card se refere irá aparecer em destaque logo ao topo do card e, em seguida, haverão duas áreas:

- **Dados do Subscriber:** à esquerda ficam os dados (inicialmente vazios) que serão exibidos sempre que o client for informado que uma nova mensagem foi publicada no tópico, os dados estão dispostos de forma amigável mas a mensagem bruta (no formato JSON) também é mostrado no campo **raw**.
- **Formulário de Publish:** à direira fica um formulário para simular os publish's no tópico (facilitando os testes ao automatizar a transformação dos dados para JSON). Após realizar um publish, os dados são enviados para o Mosquitto que, por consequência, irão retornar e atualizar os **Dados do Subscriber**.

### Sobre o Ar Condicionado
Todas as regras de codificação da especificação são feitas automaticamentes, além disso a aplicação também simula o dispositivo que publica a resposta no tópico `{time}/response`.

