from django.contrib import admin
from .models import *
# Register your models here.

admin.site.register(Note)
admin.site.register(Book)
admin.site.register(Account)
admin.site.register(Collection)
admin.site.register(Order)
admin.site.register(OrderItem)