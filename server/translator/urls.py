# translator/urls.py

from django.urls import path
# Assurez-vous que ces imports sont corrects
from .views import RegisterView, TranslateView, TranslationHistoryView, TranslationDetailView
from rest_framework_simplejwt.views import (TokenObtainPairView, TokenRefreshView)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('translate/', TranslateView.as_view(), name='translate'),
    path('history/', TranslationHistoryView.as_view(), name='translation-history'),
    path('history/<int:pk>/', TranslationDetailView.as_view(), name='translation-detail'),
]