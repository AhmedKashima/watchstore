from django.db import models
from django.contrib.auth.models import User

# 1. Product must be defined FIRST
class Product(models.Model):
    name = models.CharField(max_length=200, verbose_name="اسم الساعة")
    description = models.TextField(verbose_name="وصف الساعة")
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="السعر (ريال)")
    image = models.ImageField(upload_to='products/', blank=True, null=True, verbose_name="صورة الساعة")
    is_active = models.BooleanField(default=True, verbose_name="متاح للبيع؟")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="تاريخ الإضافة")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "ساعة"
        verbose_name_plural = "الساعات"

# 2. Rating is defined SECOND (because it links to Product)
class Rating(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='ratings', verbose_name="الساعة")
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="المستخدم")
    score = models.IntegerField(default=5, verbose_name="التقييم (من 5)")
    comment = models.TextField(verbose_name="التعليق", blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="تاريخ التقييم")

    def __str__(self):
        return f"{self.user.username} - {self.product.name}"

    class Meta:
        verbose_name = "تقييم"
        verbose_name_plural = "التقييمات"