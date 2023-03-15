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

class OrderItemSerializer(ModelSerializer):
    book = BookSerializer()
    class Meta:
        model = OrderItem
        fields = '__all__'

class OrderSerializer(ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    class Meta:
        model = Order
        fields = '__all__'
