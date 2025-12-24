from rest_framework import serializers
from .models import Product
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

# 1. This handles the Watches (Products)
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

# 2. This handles the Login (checks if you are Admin)
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        
        # Add extra data to the response so React knows if this is the Owner
        data['username'] = self.user.username
        data['email'] = self.user.email
        data['isAdmin'] = self.user.is_staff 
        
        return data