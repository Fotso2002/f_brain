# Utilisez l'image officielle de Nginx comme base
FROM nginx:latest

# Supprimez le fichier de configuration par défaut de Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copiez votre fichier de configuration personnalisé
COPY default.conf /etc/nginx/conf.d/default.conf

# Exposez les ports (si vous voulez un accès direct en plus de Nginx)
EXPOSE 80
EXPOSE 443

# Commande par défaut pour démarrer Nginx en mode non-daemon (requis pour Docker)
CMD ["nginx", "-g", "daemon off;"]