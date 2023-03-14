from rest_framework.serializers import ModelSerializer, SerializerMethodField
from django.contrib.auth.models import User
from .models import *

class NoteSerializers(ModelSerializer):
    class Meta:
        model = Note
        fields = '__all__'

class BookSerializer(ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'

    

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class CollectionSerializer(ModelSerializer):
    class Meta:
        model = Collection
        fields = '__all__'