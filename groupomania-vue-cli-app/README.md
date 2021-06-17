les pages de vue
page de connexion
page d'inscription
	page mon profil
		page suppression de compte
	page affiche les canaux
		page affiche les thread
			page affiche les messages du thread
	page affiche news


base de serveur SQL:
compte
	id			SMALLINT NOT NULL AUTO_INCREMENT DEFAULT 0 
 	status			CHAR(5) NOT NULL
	nom			TINYTEXT NOT NULL
	adresse			TINYTEXT NOT NULL
	mdp			TINYTEXT NOT NULL
liste message
	id			SMALLINT NOT NULL AUTO_INCREMENT DEFAULT 0 
	id-utilisateur		SMALLINT
	nom-utilisateur		TINYTEXT NOT NULL
	message			TEXT
	media			TEXT
	date			DATETIME NOT NULL
	parent-message		SMALLINT NOT NULL
liste thread
	id 			SMALLINT NOT NULL AUTO_INCREMENT DEFAULT 0 
	nom-thread		TINYTEXT NOT NULL
	position-canal		SMALLINT NOT NULL UNSIGNED
	id-utilisateur		SMALLINT
list canaux
	id 			SMALLINT NOT NULL AUTO_INCREMENT DEFAULT 0 
	nom-canal		TINYTEXT NOT NULL
	position-canal		SMALLINT NOT NULL UNSIGNED

comptes:
status user :
	creer, modifier son thread
	creer, modifier, suprimer son message
	supprimer son compte
	voir les 10 derniers messages
status modo: +
	modifier, supprimer les messages de tout le monde
	modifier, supprimer le thread de tout le monde,
	creer, modifier, supprimer un canal

procédé
création sommaire du front
création sommaire du back
création sommaire de la BDD
connexion entre le back la BDD
connexion entre le front et le back
integration de GIPHY
ajustement de la BDD et back