# translator/views.py

from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.models import User
from .models import Translation
from .serializers import UserSerializer, TranslationSerializer
from django.shortcuts import get_object_or_404
# from .tasks import translate_text_task # Commenté pour l'instant

# Assurez-vous que ces classes sont correctement définies
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.AllowAny,) # Permet à tout le monde de s'enregistrer

class TranslateView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        serializer = TranslationSerializer(data=request.data)
        if serializer.is_valid():
            # Crée l'objet Translation avec le texte original et les langues
            # Le champ translated_text sera vide initialement
            translation = Translation.objects.create(
                user=request.user,
                original_text=serializer.validated_data['original_text'],
                source_language=serializer.validated_data['source_language'],
                target_language=serializer.validated_data['target_language']
            )

            # --- Logique de traduction simulée (temporaire) ---
            # Remplacez ceci par l'appel à la tâche Celery plus tard
            translation.translated_text = f"Simulated translation of '{translation.original_text}'"
            translation.save()
            # --- Fin de la logique simulée ---

            # Déclenche la tâche Celery pour effectuer la traduction de manière asynchrone (commenté pour l'instant)
            # from .tasks import translate_text_task # Importation locale
            # translate_text_task.delay(translation.id)

            # Retourne une réponse immédiate avec les détails de la traduction
            response_serializer = TranslationSerializer(translation)
            return Response(response_serializer.data, status=status.HTTP_201_CREATED) # 201 Created pour la simulation

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TranslationHistoryView(generics.ListAPIView):
    serializer_class = TranslationSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        return Translation.objects.filter(user=self.request.user)

class TranslationDetailView(generics.RetrieveAPIView):
    queryset = Translation.objects.all()
    serializer_class = TranslationSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        return Translation.objects.filter(user=self.request.user)