# SendMail

> Ce projet m'a permis de savoir comment on package un service sous debian manuellement

Le système de template de service permet de rendre chaque projet indépendant

## Prérequies

Si vous utilisez gmail il faut autoriser l'utilisation de votre login et mot de passe

cliquez [ici]( https://www.google.com/accounts/DisplayUnlockCaptcha) pour forcer

## Dependences pour le packaging

Télécharger le dpkg_changelog [ici](http://deb.regdrasil.com/) en __root__

```Shell
echo "deb http://deb.regdrasil.com/apt/debian regdrasil main" > /etc/apt/sources.list.d/regdrasil.com.list

wget -O - http://deb.regdrasil.com/apt/debian/regdrasil.gpg.key | apt-key add -

# Installer les MAJ
apt update
```

```Shell
apt-get install dh-make dpkg-changelog git
```

## Dossier Debian

Voici le contenu du dossier debian

```Config
changelog : journal des modifications
compat:
control: métadonnées sur le paquet (dépendances)
dh_install ( *.dirs, *.docs, *.manpages...)
install :
rules : 
```

## Builder

- faire un premier commit
- Modifier la version dans `debian/control`  
- `ctrl+shift+p` pour creer un tag avec __create:tag__
- tapez la version exemple __1.0.0__ arrivez au message même chose
- Un nouveau commit avec pour message uniquement le numéro version
- `dpkg-changelog`
- `dpkg-buildpackage -us -uc -b` pour builder un .deb ( /!\ le build n'est pas construit dans le répertoire courant, mais un niveau au dessus )
- `dpkg-buildpackage -Tclean` pour effacer les traces de build
- `dpkg -i` suivi du .deb créé dans le repertoire parent du projet

## Execute service

Initialiser le projet

```
# Ce rendre dans sendmailer
/etc/sendmailer

# Creer un dossier
mkdir projet1

# Creer votre fichier `.env` avec l'exemple dans /usr/share/doc/sendmailer
```

`.env`

```Env
MAIL_SENDER=monadresse@email.com  
PASS_SENDER=monmotdepasse
MAIL_RECEIVER=desitnataire@outlook.com
```

Lancer le service ( recommandé pour une crontab )

```
/bin/systemctl start sendmailer@projet1
```

Regarder le service

```
#
## Rappel journalctl : -t pour definir un tag, et -u pour les services comme ici
#

# rajouté pour l'argument -f pour visualiser en direct
journalctl -u sendmailer@projet1
```