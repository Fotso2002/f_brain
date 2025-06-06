# translator/serializers.py

from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Translation

class UserSerializer(serializers.ModelSerializer):
    """
    Serializer pour le modèle User (pour l'enregistrement et la visualisation).
    """
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password']
        )
        return user

class TranslationSerializer(serializers.ModelSerializer):
    """
    Serializer pour le modèle Translation.
    """
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Translation
        fields = ('id', 'user', 'original_text', 'translated_text', 'source_language', 'target_language', 'timestamp')
        read_only_fields = ('user', 'translated_text', 'timestamp')