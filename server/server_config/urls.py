"""
URL configuration for server_config project.
"""
from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse
from django.shortcuts import redirect
from django_prometheus import urls as prometheus_urls

# Votre vue api_default_view (optionnel)
def api_default_view(request):
    html_content = """
    <!DOCTYPE html>
    <html>
    <head>
        <title>F-Brain API</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 40px; }
            h1 { color: #417690; }
            .info { background: #f0f0f0; padding: 20px; border-left: 4px solid #417690; }
        </style>
    </head>
    <body>
        <h1>F-Brain API</h1>
        <div class="info">
            <p>L'API F-Brain fonctionne correctement.</p>
            <p>Points d'accès disponibles :</p>
            <ul>
                <li><a href="/admin/">/admin/</a> - Interface d'administration</li>
                <li><a href="/api/">/api/</a> - Endpoint API principal</li>
            </ul>
        </div>
        <p>Endpoints API:</p>
        <ul>
            <li>/api/register/ - Enregistrement utilisateur (POST)</li>
            <li>/api/token/ - Obtenir token JWT (POST)</li>
            <li>/api/token/refresh/ - Rafraîchir token JWT (POST)</li>
            <li>/api/translate/ - Traduction (POST, nécessite auth)</li>
            <li>/api/history/ - Historique traductions (GET, nécessite auth)</li>
            <li>/api/history/&lt;id&gt;/ - Détails traduction (GET, nécessite auth)</li>
        </ul>
    </body>
    </html>
    """
    return HttpResponse(html_content)

# Votre vue simple pour la racine (optionnel)
def home_view(request):
    return HttpResponse("<h1>Bienvenue sur la racine de l'API Django !</h1><p>Accédez à <a href='/api/'>/api/</a> pour l'endpoint principal.</p>")


urlpatterns = [
    path('admin/', admin.site.urls),
    # Incluez les URLs de votre application translator sous le préfixe 'api/'
    path('api/', include('translator.urls')),
    # Ajoutez l'URL pour les métriques de Prometheus
    path('metrics/', include(prometheus_urls)),
    # Ajoutez ce pattern pour afficher votre vue api_default_view sur /api/
    path('api/', api_default_view, name='api-default'), # Ajoutez cette ligne
    # Vous pouvez garder ou supprimer la vue home_view pour la racine
    path('', home_view, name='home'),
    # Ou si vous voulez rediriger la racine vers /api/
    # path('', redirect('api-default')), # Nécessite l'importation de redirect
]