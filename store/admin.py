from django.contrib import admin
from .models import Product, Rating # + Import Rating

class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'is_active', 'created_at')
    search_fields = ('name',)
    list_filter = ('is_active',)

# + Add this class for Ratings
class RatingAdmin(admin.ModelAdmin):
    list_display = ('user', 'product', 'score', 'created_at')
    list_filter = ('score', 'product')
    search_fields = ('comment', 'user__username')

admin.site.register(Product, ProductAdmin)
admin.site.register(Rating, RatingAdmin) # + Register it here