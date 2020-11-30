# Aplicação Internet of Things

Camada de aplicação do projeto da disciplina SSC0952 - Internet das Coisas (2020) utilizando uma Aplicação Web com React e Node.js.

## Etapas para Instalar e Configurar

### Instalando Pacotes

O projeto possui como dependências os seguintes pacotes:

* **Node.js:** versão 10.23.x ou superior.
* **NPM:** gerenciador de pacotes do Node.js versão 3.5.x ou superior.

Caso esteja utilizando uma distribuição Debian like é possível baixar as dependências utilizando os seguintes comandos:

```bash=
$ sudo apt update
$ sudo apt install npm
$ curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
$ sudo apt-get install -y nodejs
```

### Instalando Dependências e Fazendo Build

Para instalar as dependências da aplicação basta utilizar o próprio gerenciar **npm** com o comando:

```bash=
$ npm install
$ npm build
```

Caso não ocorra nenhum erro, duas novas pastas: `/node_modules` e `/build` serão criadas dentro da pasta da aplicação.

### Variáveis de Ambiente

Por fim, para que o projeto seja executado corretamente é necessário configurar as variáveis de ambiente do projeto criando um arquivo `.env` similar ao modelo definido em `.env.example`.

A seguir uma breve explicação de cada uma das variáveis:

* VARIÁVEIS DO NODE.JS
    * **SERVER_PORT:** porta aberta pelo servidor Express do Node.js.
* VARIÁVEIS DE AUTENTICAÇÃO
    * **USERNAME e PASSWORD:** utilizadas para validar o nível de acesso do usuário durante o login.
* VARIÁVEIS DO BROKER
    * **BROKER_URL:** url completa em que se encontra o WebSocket do broker (ex: `ws://dominio.do.broker:9001`)
    * **BROKER_HOST:** apenas o host do BROKER_URL (ex: `dominio.do.broker`)
    * **BROKER_PORT:** apenas a porta do BROKER_URL (ex: `9001`)
    * **BROKER_USERNAME & PASSWORD:** dados de autenticação no broker caso seja necessário.
* VARIÁVEIS DO MICROSSERVIÇO
    * **MICRO_HOST:** domínio em que se encontra os endpoints dos microsserviços (obs: não adicionar protocolo ou porta).
    * **MICRO_PORT:** porta em que se encontra os endpoints dos microsserviços.
    * **MICRO_APIKEY:** chave utilizada pelos microsserviços para validar o nivel de acesso aos endpoints.

Com todas as variáveis configuradas ja é possível executar e testar o projeto.

## Execução em Foreground

Para executar o servidor e verificar se está tudo OK basta executar o seguinde comando:

```bash=
$ node server.js
```

E então utilizar o navegador para verificar se a tela de login carregou corretamente (caso contrário alguma etapa ou variável de ambiente foi configurado de forma errônea).

## Telas e Funcionalidades

Para visualizar as telas do projeto sem realizar a instação e configuração dos arquivos [clique aqui](./TELAS.md).

