from django.db import models
# sau khi tao modal chay python manage.py migrate
#sau do chay python manage.py makemigrations
# Create your models here.
class Account(models.Model):
    username = models.TextField(null=False, blank='')
    password = models.TextField(null=False, blank='')
    email = models.EmailField(null=False, blank='', default="")
    sdt = models.TextField(null=True, blank='')
    location = models.TextField(null=True, blank='')
    fullname = models.TextField(null=True, blank='')

    def __str__(self):
        return self.username

class Note(models.Model):
    body = models.TextField(null=True, blank=True)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.body[0:50]
    
class Collection(models.Model):
    title = models.CharField(max_length=100)
    slug = models.SlugField()

    def __str__(self):
        return self.title

class Book(models.Model):
    name = models.CharField(max_length=200)
    price = models.IntegerField()
    image = models.ImageField(null=True, blank=True, upload_to="static/images/")
    description = models.CharField(max_length=1000)
    author = models.CharField(max_length=50)
    publishYear = models.IntegerField()
    collection = models.ForeignKey(Collection, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.name
    
    @property
    def imageURL(self):
        try:
            url = self.image.url
        except:
            url = ''
        return url
    
class Order(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_checkout = models.BooleanField(default=False, choices=[(True,"Đã thanh toán"),(False,"Chưa thanh toán")])

    def __str__(self) -> str:
        return f"{self.account}"

class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self) -> str:
        return f"Order:{self.order} - Book:{self.book} - Quantity:{self.quantity}"