# AREA - An Epitech Project

## Sommaire

 1. Documentation Utilisateur
	 1. Introduction
	 2. Se connecter à Area of Effect
	 3. Se connecter à un service
	 4. Liste des Services & Actions / Réactions
 2. Documentation Développeur
	 1. Introduction
	 2. Installer le projet
 3. Documentation Bonus
	 1. Diagramme de Séquence
	 2. Diagramme de Classe
 4. Aperçus
	 1. Mobile
	 2. Web

# Documentation Utilisateur

## Introduction

L'AREA est un site web et une app mobile de gestion d'Action / Reaction. Il a pour but de permettre à l'utilisateur de se connecter à divers Services (ex: Twitch, Spotify, Youtube, Imgur, et d'autres...).

Une fois connecté aux Services de son choix, il est possible de choisir quel action vous voulez faire (ex: Aimer une image sur Imgur, Follow un streamer sur Twitch, et d'autres...) et de choisir la réaction qui en découle de cette première action (ex: Partager le like sur un channel Discord, Partager le follow sur Facebook, et d'autres...).

## Se connecter à Area of Effect
Pour se connecter sur le site web de l' Area, rendez-vous à l'adresse suivante: https://area-babyb.herokuapp.com/login
Pour se connecter sur l'application mobile de l' Area, rendez-vous sur à l'adresse suivante : https://area-babyb.herokuapp.com/client.apk pour télécharger le .apk puis l'installer sur votre téléphone

Une fois sur la bonne page, cliquez sur S'inscrire en haut à droite de l'écran pour créer un compte. Un email, un mot de passe ainsi qu'une confirmation de mot de passe vous seront demandé.

> ASTUCE: Choisissez un mot de passe unique et complexe.

**Si vous posséder déjà un compte AREA**, vous n'avez qu'à rentrer vos informations après avoir visité l'adresse: https://area-babyb.herokuapp.com/login.

Félicitation, vous êtes connectés sur AREA OF EFFECT.

## Se connecter à un Service
À ce stade, vous devriez être sur une page blanche avec un menu en haut de l'écran. Y sont présent les services :

 - Spotify
 - Twitch
 - Youtube
 - Imgur
 - Discord
 - Office

Rendez-vous sur la page du Service voulu.

Pour vous connecter au Service choisi, vous devez cliquer sur le logo du Service en haut de votre écran. Le site va alors automatiquement vous rediriger vers la page d'authentification du Service concerné. Il vous sera alors demandé d'accepter que l'application AREA récolte des informations liées à votre compte (toujours celui du Service concerné).
Libre à vous d'accepter ou pas ces conditions. Mais si vous les refusez, il vous sera alors impossible d'utiliser ce Service dans le cadre du site AREA.
Une fois votre décision prise, vous serez à nouveau redirigé vers le site Area. Si vous avez accepté les conditions, le Service se connecte tout seul et le status Connecté est maintenant en haut de votre écran pour vous alerter que le Service à bien été connecté.
Pour savoir si vous êtes connecté rien de plus simple le logo du Servcice en question est maintenant en couleur. Les Actions / Reactions de ce Service sont maintenant à votre disposition.

## Liste des Services & Actions / Réactions

Liste mise à jour le **7 Mars 2021**
 - Twitch
	 - Action : 
		1. Atteindre un palier de vues.
		2. Recevoir un follow.
		3. Savoir si une chaine commence un live.
		4. Follow une chaine.
	 - Reaction :
		1. Changer le titre de son stream.
 - Spotify
     - Action :
		1. Aimer une image Spotify.
	 - Reaction :
 - Youtube
     - Action :
	 - Reaction :
 - Imgur
     - Action : 
		1. Recevoir un Upvotes sur une de nos postes.
		2. Recevoir un Downvotes sur une de nos postes.
		3. Recevoir un Favorites sur un de nos postes.
		4. Recevoir un Commentaires sur un de nos postes.
		5. Poster une image.
		6. Aimer une image.
 - Discord
     - Action : 
		1. Rejoindre un serveur.
	 - Reaction :
		1. Poster un message sur un channel.
 - Yammer
	 - Action : 
	 - Reaction :
		1. Envoyer un message privé.

# Documentation Utilisateur

## Introduction
Bienvenue sur la documentation développeur du projet AREA. Dans cette documentation, nous verront comment installer AREA. Si vous n'êtes pas familier avec les notions de Service ou d'Action / Reaction, je vous conseille de lire dans un premier temps la documentation utilisateur du projet.

## Installer le projet
Pour installer le projet AREA, rendez-vous sur le dépôt Github suivant: https://github.com/EpitechIT2020/B-DEV-500-MPL-5-1-area-tom.treboulou

> ATTENTION: Vous aurez besoin des packets suivants:
>  - docker
>  - docker-compose
>  - npm

Clonez le dépôt
> git clone https://github.com/EpitechIT2020/B-YEP-500-MPL-5-1-area-tom.treboulou.git

Déplacez-vous dans le dépôt
> cd B-YEP-500-MPL-5-1-area-tom.treboulou

Instanciez le projet
> docker-compose build

Lancez le projet
> docker-compose up

# Documentation Supplémentaire

 ## Diagramme de Séquence

![Alt text](/screenshots/sequence_diagram.png)

 ## Diagramme de Classe

![Alt text](/screenshots/classDiagram.png)

# Aperçus

## Mobile

![Alt text](/screenshots/mobile.jpg)
![Alt text](/screenshots/mobile_loading.jpg)

## Web

![Alt text](/screenshots/teasing_web.png)
![Alt text](/screenshots/teasing_web_2.png)