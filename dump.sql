CREATE TABLE Usuario (
                id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
                senha VARCHAR NOT NULL,
                email VARCHAR NOT NULL,
                nome VARCHAR NOT NULL
);


CREATE TABLE Autor (
                id_autor INTEGER PRIMARY KEY AUTOINCREMENT,
                nome VARCHAR NOT NULL,
                nacionalidade VARCHAR,
                data_nascimento DATE
);


CREATE TABLE Livro (
                id_livro INTEGER PRIMARY KEY AUTOINCREMENT,
                id_autor INTEGER NOT NULL,
                nome VARCHAR NOT NULL,
                classificacao INTEGER,
                descricao VARCHAR NOT NULL,
                imagem LONGBLOB,
                FOREIGN KEY (id_autor) REFERENCES Autor(id_autor)
);


CREATE TABLE UsuarioLivro (
                id_livro INTEGER NOT NULL,
                id_usuario INTEGER NOT NULL,
                FOREIGN KEY (id_livro) REFERENCES Livro(id_livro),
                FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario)
);
