create database db_doceria_ianes;
use db_doceria_ianes;

CREATE TABLE tbl_usuario (
	id_usuario int primary key not null auto_increment,
    nome varchar(100) not null,
    email varchar(80) not null,
    senha varchar(20) not null
);

CREATE TABLE tbl_produto (
	id_produto int primary key not null auto_increment,
    nome varchar(50) not null,
    preco decimal(10,2) not null,
    peso decimal(5,2),
    fk_id_usuario int not null, constraint fk_id_usuario foreign key (fk_id_usuario) references tbl_usuario(id_usuario)
);

CREATE TABLE tbl_estoque (
	id_estoque int primary key not null auto_increment,
    quantidade int not null,
    data_vencimento date,
    fk_id_produto int not null, constraint fk_id_produto foreign key (fk_id_produto) references tbl_produto(id_produto) on delete cascade
);

select * from tbl_produto;
select * from tbl_estoque;
insert into tbl_usuario (nome, email, senha) values ("Pedro", "pedro@gmail.com", "123");