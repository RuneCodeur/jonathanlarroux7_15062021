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
users
	id					SMALLINT NOT NULL AUTO_INCREMENT PRIMARY KEY
 	status				CHAR(5) NOT NULL
	nom					TINYTEXT NOT NULL
	mail				TINYTEXT NOT NULL
	mdp					TINYTEXT NOT NULL
list_messages
	id					SMALLINT NOT NULL AUTO_INCREMENT PRIMARY KEY
	id_user				SMALLINT
	name_user			TINYTEXT NOT NULL
	message				TEXT
	media				TEXT
	date				DATETIME NOT NULL
	position_sujet		SMALLINT NOT NULL
	position_canal		SMALLINT NOT NULL
sujets
	id 					SMALLINT NOT NULL AUTO_INCREMENT PRIMARY KEY 
	nom-sujet			TINYTEXT NOT NULL
	position-forum		SMALLINT NOT NULL UNSIGNED
	creator				SMALLINT
forums
	id 					SMALLINT NOT NULL AUTO_INCREMENT PRIMARY KEY 
	nom-canal			TINYTEXT NOT NULL






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