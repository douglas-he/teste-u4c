https://orkhan.gitbook.io/typeorm/docs/using-cli#installing-cli
https://www.postgresql.org/download/

Exercício
Modele um domínio para o seguinte problema:
Modele um sistema para uma empresa de proteção veicular.
Nesse sistema existem clientes e terceiros.
Os clientes podem criar uma conta inserindo informações básicas de cadastro.
Os clientes podem editar alguns dados cadastrados.

Os clientes podem criar um evento de acidente, onde será possível informar o veículo envolvido no acidente e o(s) terceiro(s).
Os terceiros são cadastrados quando é criado um acidente, se não houver um registro prévio na base de dados.

Todos os usuários(clientes e terceiros) precisam ter documentos associados as suas contas.

Quando um houve o cadastro de um cliente que já foi envolvido como terceiro em um acidente, é preciso migrar o usuário para cliente sem perder o vínculo criado no acidente.
Crie uma API RESTful em NodeJS com as seguintes tecnologias:
Typescript.
HapiJS.
TypeORM.
PostgresSQL.
Jest