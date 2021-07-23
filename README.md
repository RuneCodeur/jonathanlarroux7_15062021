projet 7 openclassrooms : création d'un réseau social d'entreprise

le site fonctionne avec MySQL, Vue et Node et nécéssite un procédé d'instalation et de lancement : 
--------------------------------
INSTALLATION
--------------------------------

telechargez le dossier sur :
	https://github.com/rackhamledev/jonathanlarroux7_15062021.git

lancez un invite de commande et executez le code suivant :

	cd "chemin_du_dossier_backend"
	npm install

	cd "chemin_du_dossier_groupomania-vue-cli-app"
	npm install

connectez vous à votre compte MySQL et executez le code suivant :

	CREATE DATABASE groupomania;
	USE groupomania;
	SOURCE "chemin_du_fichier_groupomaniaDB.sql";

--------------------------------
pour relier la base de donnée au serveur:

ouvrez le fichier 'connect.js' présent dans le dossier backend du projet
replacez les valeurs suivantes aux lignes 5-6

	user:"superman",
    password:"crypto",

par votre nom d'utilisateur et mot de passe MySQL
afin que le serveur puisse correctement se connecter à la base de donnée
--------------------------------
LANCEMENT DU SERVEUR
--------------------------------

pour lancer le serveur FRONTEND
lancer un invite de commande et executer :

	cd "chemin_du_dossier_groupomania-vue-cli-app"
	npm run serve

pour lancer le serveur BACKEND
lancer un deuxième invite de commande et executer :

	cd "chemin_du_dossier_backend"
	nodemon server

le site web est accessible en suivant le lien suivant:

	http://localhost:8080

-------------------------------
si vous rencontrez un problème, envoyez un mail à l'adresse suivante:
rackhamledev@gmail.com