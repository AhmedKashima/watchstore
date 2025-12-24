# # from django.shortcuts import render

# # from django.contrib.auth.models import User
# # from django.contrib.auth.hashers import make_password
# # from rest_framework import status

# # from rest_framework.decorators import api_view
# # from rest_framework.response import Response
# # from .models import Product
# # from .serializers import ProductSerializer

# # @api_view(['POST'])
# # def register_user(request):
# #     data = request.data
# #     try:
# #         # Check if email already exists
# #         if User.objects.filter(username=data['email']).exists():
# #             return Response({'detail': 'البريد الإلكتروني مسجل مسبقاً'}, status=status.HTTP_400_BAD_REQUEST)

# #         user = User.objects.create(
# #             first_name=data['name'],
# #             username=data['email'], # We use email as the username
# #             email=data['email'],
# #             password=make_password(data['password'])
# #         )
# #         return Response({'detail': 'تم إنشاء الحساب بنجاح'}, status=status.HTTP_201_CREATED)
# #     except Exception as e:
# #         return Response({'detail': 'حدث خطأ ما، يرجى المحاولة لاحقاً'}, status=status.HTTP_400_BAD_REQUEST)
    

# # @api_view(['GET'])
# # def get_products(request):
# #     # Get all watches that are marked as "Active" (Available)
# #     products = Product.objects.filter(is_active=True).order_by('-created_at')
    
# #     # Convert them to JSON
# #     serializer = ProductSerializer(products, many=True)
    
# #     # Send the data
# #     return Response(serializer.data)

# # @api_view(['GET'])
# # def get_product_detail(request, pk):
# #     # Get a single watch by ID
# #     product = Product.objects.get(id=pk)
# #     serializer = ProductSerializer(product, many=False)
# #     return Response(serializer.data)


# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import IsAdminUser, IsAuthenticatedOrReadOnly
# from rest_framework.response import Response
# from rest_framework import status
# from .models import Product
# from .serializers import ProductSerializer

# # 1. Get All Products (Public)
# @api_view(['GET'])
# def get_products(request):
#     products = Product.objects.filter(is_active=True).order_by('-created_at')
#     serializer = ProductSerializer(products, many=True)
#     return Response(serializer.data)

# # 2. Get Single Product (Public)
# @api_view(['GET'])
# def get_product_detail(request, pk):
#     product = Product.objects.get(id=pk)
#     serializer = ProductSerializer(product, many=False)
#     return Response(serializer.data)

# # 3. Create Product (Admin Only)
# @api_view(['POST'])
# @permission_classes([IsAdminUser]) # Security: Only Admin can do this
# def create_product(request):
#     data = request.data
#     serializer = ProductSerializer(data=data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data, status=status.HTTP_201_CREATED)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# # 4. Update Product (Admin Only)
# @api_view(['PUT'])
# @permission_classes([IsAdminUser])
# def update_product(request, pk):
#     product = Product.objects.get(id=pk)
#     serializer = ProductSerializer(product, data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# # 5. Delete Product (Admin Only)
# @api_view(['DELETE'])
# @permission_classes([IsAdminUser])
# def delete_product(request, pk):
#     product = Product.objects.get(id=pk)
#     product.delete()
#     return Response('Product Deleted')

# # 6. Auth Views (Keep these as they are or import from urls if needed)
# # (For login/register we use the ones we set up in urls.py directly)


from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import Product
from .serializers import ProductSerializer, MyTokenObtainPairSerializer

# --- AUTHENTICATION VIEWS ---

# 1. Custom Login View (Returns isAdmin status)
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

# 2. Register User
@api_view(['POST'])
def register_user(request):
    data = request.data
    try:
        if User.objects.filter(username=data['email']).exists():
            return Response({'detail': 'البريد الإلكتروني مسجل مسبقاً'}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create(
            first_name=data['name'],
            username=data['email'],
            email=data['email'],
            password=make_password(data['password'])
        )
        return Response({'detail': 'تم إنشاء الحساب بنجاح'}, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({'detail': 'حدث خطأ ما'}, status=status.HTTP_400_BAD_REQUEST)

# --- PRODUCT VIEWS ---

# 3. Get All Products (Public)
@api_view(['GET'])
def get_products(request):
    products = Product.objects.filter(is_active=True).order_by('-created_at')
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

# 4. Get Single Product (Public)
@api_view(['GET'])
def get_product_detail(request, pk):
    try:
        product = Product.objects.get(id=pk)
        serializer = ProductSerializer(product, many=False)
        return Response(serializer.data)
    except Product.DoesNotExist:
        return Response({'detail': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

# 5. Create Product (Admin Only)
@api_view(['POST'])
@permission_classes([IsAdminUser])
def create_product(request):
    data = request.data
    serializer = ProductSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# 6. Update Product (Admin Only)
@api_view(['PUT'])
@permission_classes([IsAdminUser])
def update_product(request, pk):
    product = Product.objects.get(id=pk)
    serializer = ProductSerializer(product, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# 7. Delete Product (Admin Only)
@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def delete_product(request, pk):
    product = Product.objects.get(id=pk)
    product.delete()
    return Response('Product Deleted')