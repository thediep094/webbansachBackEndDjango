from django.shortcuts import render, get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser 
from rest_framework import status
from .models import *
from .serializers import *
# Create your views here.

@api_view(['GET'])
def getRoutes(request):
    routes = [
        {
            'Endpoint': '/notes/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of notes'
        },
        {
            'Endpoint': '/notes/id',
            'method': 'GET',
            'body': None,
            'description': 'Returns a single note object'
        },
        {
            'Endpoint': '/notes/create/',
            'method': 'POST',
            'body': {'body': ""},
            'description': 'Creates new note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/update/',
            'method': 'PUT',
            'body': {'body': ""},
            'description': 'Creates an existing note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/delete/',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes and exiting note'
        },
    ]
    return Response(routes)

@api_view(['GET'])
def getNotes(request):
    notes = Note.objects.all()
    serializer = NoteSerializers(notes, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getNote(request,pk):
    notes = Note.objects.get(id=pk)
    serializer = NoteSerializers(notes, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def createNote(request):
    data = request.data
    note = Note.objects.create(
        body=data['body']
    )
    serializer = NoteSerializers(note, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
def updateNote(request, pk):
    data = request.data
    note = Note.objects.get(id=pk)
    serializer = NoteSerializers(instance=note, data=data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


@api_view(['DELETE'])
def deleteNote(request, pk):
    note = Note.objects.get(id=pk)
    note.delete()
    return Response('Note was deleted!')


# Book
@api_view(['GET'])
def getBooks(request):
    books = Book.objects.all()
    serializer = BookSerializer(books, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getBook(request, id):
    books = Book.objects.get(id = id)
    serializer = BookSerializer(books, many=False)
    return Response(serializer.data)


# Account
@api_view(['GET'])
def getAccounts(request):
    accounts = Account.objects.all()
    serializer = AccountSerializer(accounts, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getAccount(request, id):
    account = Account.objects.get(id = id)
    serializer = AccountSerializer(account, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def createAccount(request):
    data = request.data
    serializer = AccountSerializer(data=data, many=False)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def loginAccount(request):
    data = request.data
    account = Account.objects.get(username = data['username'])
    if(data['password'] == account.password):
        serializer = AccountSerializer(account, many= False)   
        return Response(serializer.data) 
    else:
        return Response(status=404)
    

# Order
@api_view(['POST'])
def createOrder(request):
    """
    Tạo đơn hàng mới.
    """
    account = Account.objects.get(id = request.data.get('id'))
    if not account:
            return Response({'error': 'Account ID is required.'}, status=status.HTTP_400_BAD_REQUEST)
    order_data = {
            'account': account.id,
        }

    serializer = OrderSerializer(data = order_data)
    if serializer.is_valid():
        order = serializer.save()
        # Tạo chi tiết đơn hàng
        cart_items = request.data.get('items')
        for cart_item in cart_items:
            book_id = cart_item.get('id')
            book = get_object_or_404(Book, id=book_id)
            quantity = cart_item.get('quantity')
            price = book.price
            OrderItem.objects.create(order=order, book=book, quantity=quantity, price=price)

        return Response(serializer.data)
    return Response(serializer.errors)

@api_view(['GET'])
def retrieveOrder(request, id):
    """
    Lấy thông tin chi tiết của một đơn hàng.
    """
    account = Account.objects.get(id = id)
    if not account:
            return Response({'error': 'Account ID is required.'}, status=status.HTTP_400_BAD_REQUEST)

    order = Order.objects.filter(account = account).order_by('-created_at')
    serializer = OrderSerializer(order, many=True)
    return Response(serializer.data)