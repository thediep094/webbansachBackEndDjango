from rest_framework.serializers import ModelSerializer
from .models import *

class NoteSerializers(ModelSerializer):
    class Meta:
        model = Note
        fields = '__all__'

class BookSerializer(ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'

class AccountSerializer(ModelSerializer):
    class Meta:
        model = Account
        fields = '__all__'

class CollectionSerializer(ModelSerializer):
    class Meta:
        model = Collection
        fields = '__all__'