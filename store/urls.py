# from django.urls import path
# from . import views

# from django.urls import path
# from . import views
# # Import the JWT views
# from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
# from .views import MyTokenObtainPairView, register_user, get_products, get_product_detail, create_product, update_product, delete_product

# urlpatterns = [
#     path('products/', views.get_products, name="products"),
#     path('products/create/', views.create_product, name="product-create"), # New
#     path('products/update/<str:pk>/', views.update_product, name="product-update"), # New
#     path('products/delete/<str:pk>/', views.delete_product, name="product-delete"), # New
#     path('products/<str:pk>/', views.get_product_detail, name="product"),
#     path('users/login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),

# ]

from django.urls import path
from . import views

urlpatterns = [
    # Auth
    path('users/login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('users/register/', views.register_user, name='register'),

    # Products
    path('products/', views.get_products, name="products"),
    path('products/create/', views.create_product, name="product-create"),
    path('products/update/<str:pk>/', views.update_product, name="product-update"),
    path('products/delete/<str:pk>/', views.delete_product, name="product-delete"),
    path('products/<str:pk>/', views.get_product_detail, name="product"),
]