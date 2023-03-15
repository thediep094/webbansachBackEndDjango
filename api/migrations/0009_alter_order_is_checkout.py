# Generated by Django 4.1.7 on 2023-03-15 10:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_alter_order_is_checkout'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='is_checkout',
            field=models.BooleanField(choices=[(True, 'Đã thanh toán - true'), (False, 'Chưa thanh toán - false')], default=False),
        ),
    ]
