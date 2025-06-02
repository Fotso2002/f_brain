"""
URL configuration for server_config project.
"""
from django.contrib import admin
from django.urls import path
from django.http import HttpResponse

def api_default_view(request):
    """Vue simple qui ressemble aux pages par défaut de Django"""
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
                <li><a href="/api/">/api/</a> - Cette page</li>
            </ul>
        </div>
    </body>
    </html>
    """
    return HttpResponse(html_content)

# Ajoutez une vue simple pour la racine
def home_view(request):
    return HttpResponse("<h1>Bienvenue sur la racine de l'API Django !</h1><p>Accédez à <a href='/api/'>/api/</a> pour l'endpoint principal.</p>")


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', api_default_view, name='api-default'),
    # Ajoutez ce pattern pour la racine
    path('', home_view, name='home'),
]