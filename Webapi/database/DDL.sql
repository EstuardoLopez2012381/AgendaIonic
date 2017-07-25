CREATE DATABASE IONIC
USE IONIC


CREATE TABLE Categoria(
	idCategoria INT NOT NULL AUTO_INCREMENT,
    nombreCa VARCHAR(50) default 'Sin Categoria',
    PRIMARY KEY (idCategoria)
);

CREATE TABLE Contacto(
	idContacto INT NOT NULL AUTO_INCREMENT,
	nombreCo VARCHAR (50) NOT NULL,
	apellido VARCHAR (50) NOT NULL,
	direccion VARCHAR (50) NOT NULL,
	telefono VARCHAR (50) NOT NULL,	
	correo VARCHAR (50) NOT NULL,
	idCategoria INT NOT NULL,
	PRIMARY KEY (idContacto),
	FOREIGN KEY (idCategoria) REFERENCES Categoria(idCategoria)
);
    

CREATE TABLE Usuario(
	idUsuario INT NOT NULL AUTO_INCREMENT,
	nick VARCHAR (50) NOT NULL,
	contrasena VARCHAR (50) NOT NULL,
    primary key (idUsuario)
);

CREATE TABLE Cita(
	idCita INT NOT NULL AUTO_INCREMENT,
	fecha VARCHAR (50) NOT NULL,
	lugar VARCHAR (50) NOT NULL, 
    asunto VARCHAR (50) NOT NULL,
    idContacto INT NOT NULL,
    detalle VARCHAR (100) NOT NULL,
    primary key (idCita),
    FOREIGN KEY (idContacto) REFERENCES Contacto(idContacto)
);

CREATE TABLE UsuarioDetalle(
	idUsuarioDetalle INT NOT NULL AUTO_INCREMENT,
	idUsuario INT NOT NULL,
	idContacto INT NOT NULL,
	PRIMARY KEY (idUsuarioDetalle),
	FOREIGN KEY (idUsuario) REFERENCES Usuario (idUsuario),
	FOREIGN KEY (idContacto) REFERENCES Contacto (idContacto)
);

CREATE TABLE Tarea(
	idTarea INT NOT NULL AUTO_INCREMENT,
	titulo VARCHAR (50) NOT NULL,
	descripcion VARCHAR (100) NOT NULL,
	fechaInicial VARCHAR(50) NULL,
	fechaFinal VARCHAR(50) NULL, 
	estado VARCHAR (50) NOT NULL,
	PRIMARY KEY(idTarea)
);

CREATE VIEW  vistaContacto AS
SELECT contacto.idContacto, nombreCo, apellido, direccion, telefono, correo, nombreCa FROM Contacto 
INNER JOIN categoria ON contacto.idCategoria = categoria.idCategoria;

DELIMITER $$
CREATE PROCEDURE SP_insertUsuario(
IN u_nick VARCHAR (50), 
IN u_contrasena VARCHAR (50))
	BEGIN
	INSERT INTO Usuario(nick, contrasena) 
    VALUES (u_nick, u_contrasena);
END $$
DELIMITER ;


DELIMITER $$
CREATE PROCEDURE SP_insertTarea(
IN t_titulo VARCHAR (50), 
IN t_descripcion VARCHAR (100), 
IN t_fechaInicial VARCHAR (50), 
IN t_fechaFinal VARCHAR (50), 
IN t_estado VARCHAR(50))
	BEGIN
	INSERT INTO Tarea(
    titulo, 
    descripcion, 
    fechaInicial, 
    fechaFinal, 
    estado) 
    VALUES (t_titulo, t_descripcion, t_fechaInicial, t_fechaFinal, t_estado);
END $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE SP_insertCategoria(
IN ca_nombre VARCHAR (50))
	BEGIN
    INSERT INTO Categoria(nombreCa) 
    VALUES (ca_nombre);
END $$
DELIMITER ;


DELIMITER $$
CREATE PROCEDURE SP_insertCita(
IN ci_fecha VARCHAR (50),
IN ci_lugar VARCHAR (50),
IN ci_asunto VARCHAR (50),
IN ci_idContacto INT,
IN ci_detalle VARCHAR (100))
	BEGIN
    INSERT INTO Cita(
    fecha,
    lugar,
    asunto,
    idContacto,
    detalle) 
    VALUES (ci_fecha, ci_lugar, ci_asunto, ci_idContacto, ci_detalle);
END $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE SP_insertContacto(
IN co_nombre VARCHAR (50), 
IN co_apellido VARCHAR (50), 
IN co_direccion VARCHAR(50), 
IN co_telefono VARCHAR (50), 
IN co_correo VARCHAR (50), 
IN co_idCategoria INT)
	BEGIN
	INSERT INTO Contacto(
    nombreCo, 
    apellido, 
    direccion, 
    telefono, 
    correo, 
    idCategoria) 
    VALUES (co_nombre, co_apellido, co_direccion, co_telefono, co_correo, co_idCategoria);
END $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE SP_insertDetalleU(
IN dt_idUsuario INT, 
IN dt_idContacto INT)
	BEGIN
	INSERT INTO UsuarioDetalle(
    idUsuario, 
    idContacto) 
    VALUES (dt_idUsuario, dt_idContacto);
END $$
DELIMITER ;



DELIMITER $$
CREATE PROCEDURE SP_deleteUsuario(
IN u_idUsuario INT)
	BEGIN 
		
    DELETE FROM Usuario
    WHERE  idUsuario = u_idUsuario;
END $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE SP_deleteCita(
IN ci_idCita INT)
	BEGIN 
		
    DELETE FROM Cita
    WHERE  idCita = ci_idCita;
END $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE SP_deleteContacto(
IN co_idContacto INT)
	BEGIN 
		
    DELETE FROM Contacto
    WHERE  idContacto = co_idContacto;
END $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE SP_deleteTarea(
IN t_idTarea INT)
	BEGIN
    
    DELETE FROM Tarea
    WHERE idTarea = t_idTarea;
END $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE SP_deleteDetalleUsuario(
IN dt_idDetalleUsuario INT)
	BEGIN 
		
    DELETE FROM UsuarioDetalle
    WHERE  idUsuarioDetalle = dt_idDetalleUsuario;
END $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE SP_deleteCategoria(
IN ca_idCategoria INT)
	BEGIN 
		
    DELETE FROM Categoria
    WHERE  idCategoria= ca_idCategoria;
END $$
DELIMITER ;