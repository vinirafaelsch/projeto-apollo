# Projeto Apollo Solutions

## Respostas para as perguntas do documento

#### 1. Quais seriam as suas primeiras melhorias caso possuísse mais tempo de implementação?
Por conta do tempo e se tratar de um desafio acabei não implementando usuário/senha para o acesso ao banco, o que me leva a pensar também na implementação de um `envfile` para manter as variáveis sensíveis seguras em minha máquina.

Outro ponto que eu melhoraria seria na parte de adição de novos produtos, mais especificamente no `select` de categorias. Por conta do tempo acabei deixando estático as 5 categorias apresentadas. Como eu criei uma collection `discounts` que é resposável por armazenar as categorias, o ideal é que uma consulta fosse realizada e o `select` fosse preenchido dinamicamente, assim, caso uma nova categoria fosse criada não precisaria realizar alterações no código para esta tela.

Uma melhoria que não poderia faltar em uma tabela de dados é a paginação, sendo assim também daria prioridade para isso. Em casos onde ainda não existe nenhum dado, também seria interessante adicionar uma linha informando isso ao usuário ao invés de deixar a tabela somente vazia.

#### 2. Pensando na sua solução, como seria a manutenção em caso da adição de novas categorias de produtos? O que precisaria ser alterado?
O desconto é aplicado na hora da inserção de um novo produto na base de dados e ocorre através da collection de `discounts`, que armazena a categoria e seu desconto. Sendo assim após adicionar uma nova categoria na collection, a única alteração que seria necessária seria a adição dessa categoria na tela de novos produtos, no `select` estático que foi citado acima. Caso a melhoria que consta na respota da pergunta 1 fosse implementada, nenhuma manutenção seria necessária pois o código está preparado para isso.

#### 3. Caso fosse necessário, quais alterações precisariam ser feitas para suportar atualizações na porcentagem de desconto da categoria de produto, de modo que, sempre que a porcentagem de desconto fosse alterada, o novo preço fosse refletido em todos os produtos da mesma?
Após alterar a porcentagem de desconto de uma categoria de produto, deverá ser acionada uma função responsável por atualizar automaticamente o preço promocional de todos produtos daquela categoria. Portanto, assim que a porcentagem do desconto for atualizada na collection `discounts`, é implementada uma função que vai filtrar pelos produtos daquela categoria e sobreescrever o valor presente no campo preço promocional com o valor do cálculo com a nova porcentagem.

## Passo-a-passo para execução da aplicação

### Pré-requisitos

1. **Docker**: Instale o Docker seguindo o passo-a-passo de acordo com o sistema operacional instalado em sua máquina [aqui](https://docs.docker.com/get-docker/).
2. **Docker Compose**: É necessário ter em sua máquina também o Docker Compose instalado, para o passo-a-passo de instalação clique [aqui](https://docs.docker.com/compose/install/).

### Como Executar o Projeto

#### 1. Clonar o Repositório
```bash
git clone https://github.com/vinirafaelsch/projeto-apollo.git
```
#### 2. Acessar a pasta do projeto
```bash
cd projeto-apollo
```

#### 3. Buildar e Executar o Projeto com Docker Compose
```bash
docker-compose up --build
```

### 4. Acessar a Aplicação
Abrir o navegador e acessar o site
```bash
http://localhost:3000/
```
Com isso o projeto estará rodando localmente através do Docker.
