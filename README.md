# Sistema de Reembolso


Aplicação web para gerenciamento de solicitações de reembolso.

O sistema permite que colaboradores criem solicitações de reembolso, informem os dados da despesa e anexem os comprovantes. Usuários com perfil de manager podem visualizar e acompanhar as solicitações realizadas.

O projeto foi desenvolvido utilizando React no frontend e Node.js no backend.




### Funcionalidades

### Employee

- Criar solicitações de reembolso.
- Informar o nome da solicitação.
- Selecionar a categoria do custo.
- Informar o valor do reembolso.
- Anexar comprovantes da despesa.
- Enviar a solicitação para análise do manager.


### Manager

- Visualizar as solicitações de reembolso.
- Identificar o employee responsável pela solicitação.
- Visualizar a descrição da solicitação.
- Consultar o valor do reembolso.
- Visualizar a data da solicitação.
- Acessar os comprovantes anexados.
- Acompanhar a quantidade de solicitações realizadas.


### Tecnologias

### Frontend

- React
- Tailwind CSS
- Axios 
- Vite 
- TypeScript

### Backend

- Node.js
- Express
- Prisma
- SQLite
- JWT
- bcrypt
- Zod
- Multer

### Autenticação e autorização

A autenticação da aplicação é feita utilizando JWT.
No cadastro, a senha do usuário é transformada em um hash utilizando bcrypt antes de ser armazenada no banco.
No login, o sistema verifica a senha informada e, caso esteja correta, gera um token JWT.
Esse token é utilizado nas requisições que precisam de autenticação.


### Autorização — o que o usuário pode fazer?

Além de saber quem está autenticado, a aplicação também verifica o nível de acesso do usuário.
Existem dois tipos de usuário:

`employee`

`manager`

O employee pode criar solicitações e consultar suas próprias solicitações.
O manager pode visualizar as solicitações realizadas pelos employees.
Também existe uma verificação para impedir que um employee consulte uma solicitação que pertence a outro usuário.
A solicitação possui relação com o usuário que a criou e, durante a consulta, o `userId` é utilizado para verificar se aquele recurso pertence ao usuário autenticado.

### Upload

Os comprovantes das solicitações são enviados através do Multer.
Durante o desenvolvimento, os arquivos são armazenados localmente na pasta tmp/uploads.
Essa pasta está no .gitignore e os arquivos utilizados durante os testes não são enviados para o GitHub.

### Banco de dados 

O projeto utiliza SQLite com Prisma.
O modelo do banco pode ser encontrado em:
prisma/schema.prisma
As alterações do banco são controladas através das migrations do Prisma.

### Como executar


Backend

Clone o projeto:

git clone https://github.com/vitormanoeldossantossilva0/sistema-reembolso-refund-system.git

### Entre na pasta:

cd sistema-reembolso-refund-system

Instale as dependências:

npm install

Crie um arquivo .env baseado no .env.example.

Depois execute as migrations:

npx prisma migrate dev

### Inicie a API:

npm run dev
Frontend

### Entre na pasta do frontend:

cd sistema-reembolso/web

### Instale as dependências:

npm install

### Execute o projeto:

Crie um arquivo `.env` e configure o JWT_SECRET=seu_secret_aqui

npm run dev

O Vite irá informar no terminal o endereço para acessar a aplicação.

Observações

Este projeto foi desenvolvido durante meus estudos de desenvolvimento Full Stack.

O objetivo principal foi praticar a integração entre frontend e backend e entender melhor conceitos como:

criação de API REST
autenticação com JWT
autorização por perfil de usuário
hash de senhas
relacionamento entre entidades com Prisma
upload de arquivos
integração entre React e API
utilização de banco de dados


Próximos passos

Algumas melhorias que pretendo implementar futuramente:

Melhorar o tratamento de erros no frontend
Adicionar validações adicionais
Melhorar a experiência do usuário
Adicionar testes automatizados
Publicar a aplicação
