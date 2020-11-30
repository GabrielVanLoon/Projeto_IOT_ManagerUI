# Telas e Funcionalidades

A seguir veja as screenshots das telas desenvolvidas para a aplicação. Todas as telas possuem otimização para serem responsivas e podem, portanto, ser utilizadas tanto num dispositivo desktop quanto mobile.

## Tela de Login

A tela de login possui uma interface bastante simples que solicita ao usuário que forneça um username e senha. Caso os dados estejam corretos o mesmo é redirecionado para a tela de dispositivos.

![](https://i.imgur.com/AC4mm1A.png)

## Tela de Dispositivos (login required)

A tela de dispositivos se conecta ao broker e exibe em tempo real os valores salvos em cada um dos tópicos de interesse. Caso o tópico não possua nenhuma informação o ícone de sinal sinaliza com uma cor vermelha de que não há informações para serem mostradas.

![](https://i.imgur.com/xSgq8Q4.png)

Também é possível clicar no ícone de sinal para verificar com mais detalhes outras informações como: o tópico do dispositivo, a data e hora de publicação do dado, outros valores.

![](https://i.imgur.com/Y8AEnR9.png)

O Ar condicionado também exibe uma área de controle que permite enviar requisições ao microsserviço para atualizar o modo de operação e os valores de temperatura desejado.

## Tela Histórico dos Dispositivos (login required)

A tela de histórico permite visualizar graficamente os valores que um dado dispositivo assumiu do momento atual até um período anterior. Também é possível visualizar um gráfico com a média dos valores de todos os dispositivos de uma mesma categoria.

![](https://i.imgur.com/I2fJXvZ.png)

Veja que apensar sensores que capturam informações do ambiente podem ser selecionados, sendo uma melhoria futura a inserção de gráficos mais condizentes para os sensores de movimento, luminosidade e o ar-condicionado.
