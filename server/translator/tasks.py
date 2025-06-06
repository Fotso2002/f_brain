# translator/tasks.py

from celery import shared_task
from googletrans import Translator
from .models import Translation # Importation locale

@shared_task
def translate_text_task(translation_id):
    try:
        translation = Translation.objects.get(id=translation_id)
        translator = Translator()

        translated = translator.translate(
            translation.original_text,
            src=translation.source_language,
            dest=translation.target_language
        )

        translation.translated_text = translated.text
        translation.save()

        print(f"Translation task completed for ID {translation_id}")

    except Translation.DoesNotExist:
        print(f"Translation with ID {translation_id} does not exist.")
    except Exception as e:
        print(f"Error during translation task for ID {translation_id}: {e}")