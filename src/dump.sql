create database dindin;


create table usuarios (
    id serial primary key unique,
    nome varchar(255) not null,
    email varchar(255) unique not null,
    senha varchar(255) not null
);

create table categorias (
    id serial primary key unique,
    descricao varchar(255)
);

create table transacoes (
    id serial primary key unique,
    descricao varchar(255) not null,
    valor int not null,
    data timestamp not null,
    categoria_id int references categorias (id) not null,
    usuario_id int references usuarios (id) not null,
    tipo varchar(10) not null 
);

insert into categorias
(descricao)
values
('Alimentação'),
('Assinaturas e Serviços'),
('Casa'),
('Mercado'),
('Cuidados Pessoais'),
('Educação'),
('Família'),
('Lazer'),
('Pets'),
('Presentes'),
('Roupas'),
('Saúde'),
('Transporte'),
('Salário'),
('Vendas'),
('Outras receitas'),
('Outras despesas');
