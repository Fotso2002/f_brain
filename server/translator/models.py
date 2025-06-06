# translator/models.py

from django.db import models
from django.contrib.auth.models import User

class Translation(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='translations')
    original_text = models.TextField()
    translated_text = models.TextField(blank=True, null=True)
    source_language = models.CharField(max_length=10)
    target_language = models.CharField(max_length=10)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Translation by {self.user.username} at {self.timestamp.strftime('%Y-%m-%d %H:%M')}"

    class Meta:
        ordering = ['-timestamp']