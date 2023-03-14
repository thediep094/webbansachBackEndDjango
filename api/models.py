from django.db import models
# sau khi tao modal chay python manage.py migrate
#sau do chay python manage.py makemigrations
# Create your models here.

class Note(models.Model):
    body = models.TextField(null=True, blank=True)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.body[0:50]