# Dashboard - An Epitech Project

## Sommaire

 1. Documentation Utilisateur
	 1. Introduction
	 2. Se connecter
	 3. Connecter un Service
	 4. Liste des Services & Widgets
 2. Documentation Développeur
	 1. Introduction
	 2. Installer le projet
 3. Aperçus

# Documentation Utilisateur

## Introduction

Dashboard est un site de gestion de Widgets. Il a pour but de permettre à l'utilisateur de se connecter à divers Services (ex: Twitch, Spotify, Météo, Minecraft, et d'autres...).

Une fois connecté aux Services de son choix, il est possible d'utiliser des Widgets liés à ce Service (ex: skin minecraft d'un utilisateur, nombre de followers de sa chaine Twitch, et d'autres...).

Lorsque l'utilisateur à choisi et configuré ses Widgets, il peut visualiser leurs informations à tout moment depuis leur page respective. Les informations de ceux-ci sont actualisées en fonction de la configuration du Widget.

## Se connecter
Pour se connecter sur le Dashboard**, rendez-vous à l'adresse suivante: http://localhost:5000/Home

Une fois sur la page d'accueil du site, cliquez sur S'inscrire en haut à droite de l'écran pour créer un compte. Un email, un mot de passe et un nom d'utilisateur vous seront demandé.

> ASTUCE: Choisissez un mot de passe unique et complexe.

**Si vous posséder déjà un compte Dashboard**, vous n'avez qu'à rentrer vos informations après avoir cliqué sur le bouton Se connecter.

Félicitation, vous êtes connectés sur Dashboard.

## Connecter un Service
À ce stade, vous devriez être sur une page blanche avec un menu à votre gauche. Y sont présentes les pages:

 - Home
 - Spotify
 - Twitch
 - Youtube
 - Battenet
 - Météo
 - Money
 - Lorem Ipsum
 - Pays
 - Fuseau Horaire
 - Minecraft

Rendez-vous sur la page du Service voulu.

À partir de là, deux cas sont possibles:

 1. Le Service que je souhaite connecter est un Service SANS authentification:
Dans ce cas la, pas de soucis, le(s) widget(s) de ce Service sont mis à disposition.

 2. Le Service que je souhaite connecter est un Service AVEC authentification:
Dans ce cas la, vous devez cliquer sur le bouton Se connecter en haut à droite de votre écran. Le site va alors automatiquement vous rediriger vers la page d'authentification du Service concerné. Il vous sera alors demandé d'accepter  que l'application Dashboard récolte des informations liées à votre compte (toujours celui du Service concerné).
Libre à vous d'accepter ou pas ces conditions. Mais si vous les refusez, il vous sera alors impossible d'utiliser ce Service dans le cadre du site Dashboard.
Une fois votre décision prise, vous serez à nouveau redirigé vers le site Dahsboard. Si vous avez accepté les conditions, le Service se connecte tout seul et le status Connecté est maintenant en haut à droite de votre écran pour vous alerter que le Service à bien été connecté. Les Widgets de ce Service sont à présent à votre disposition.

## Liste des Services & Widgets

Liste mise à jour le **29 Novembre 2020**
 - Twitch
	 - Follow / Unfollow une channel : C
 - Spotify
     - Abonné / Désabonné d'une playlist : P
 - Minecraft
     - Afficher un skin d'une User : U
 - Lorem Ipsum
     - Afficher un Lorem Ipsum : L
 - Currency
     - Afficher la valeur d'une monnaie : M à un temps T

# Documentation Utilisateur

## Introduction
Bienvenue sur la documentation développeur du projet Dashboard. Dans cette documentation, nous verront comment installer Dashboard. Si vous n'êtes pas familier avec les notions de Service ou de Widget, je vous conseille de lire dans un premier temps la documentation utilisateur du projet.

## Installer le projet
Pour installer le projet Dashboard, rendez-vous sur le dépôt Github suivant: https://github.com/EpitechIT2020/B-DEV-500-MPL-5-1-cardgames-tom.treboulou

> ATTENTION: Vous aurez besoin des packets suivants:
>  - python3
>  - docker
>  - docker-compose

Clonez le dépôt
> git clone https://github.com/EpitechIT2020/B-DEV-500-MPL-5-1-cardgames-tom.treboulou.git

Déplacez-vous dans le dépôt
> cd B-DEV-500-MPL-5-1-cardgames-tom.treboulou

Instanciez le projet
> docker-compose build

Lancez le projet
> docker-compose up

Le site Dashboard si situe sur le port 5000 tandis que le serveur sur le port 8080.

# Aperçus

![Alt text](/teasing.png)
