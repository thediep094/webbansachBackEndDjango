from rest_framework.serializers import ModelSerializer
from .models import *

class NoteSerializers(ModelSerializer):
    class Meta:
        model = Note
        fields = '__all__'
