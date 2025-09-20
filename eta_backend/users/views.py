from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import CustomTokenObtainSerializer, UserSerializer, RegisterSerializer
from rest_framework.permissions import AllowAny
from .models import User
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.decorators import api_view


class RegisterView(APIView):
    permission_classes = [AllowAny]    
    
    def post(self, request):
        try:
            serializer = RegisterSerializer(data=request.data)
            if serializer.is_valid():
                user = serializer.save()
                return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

class CustomLoginView(TokenObtainPairView):
    permission_classes = [AllowAny]
    serializer_class = CustomTokenObtainSerializer
    
    

@api_view(['GET'])
def getAllData(self, pk):
    try:
        try:
            user = User.objects.get(id=pk)
            userData = UserSerializer(user)

            response = {
                "data": userData.data,
                "status": 200,
                "message": "All user Data",
                "success": True,
            }
        
        except Exception as e:
            response = {
                "data": {},
                "status": 500,
                "message": "Somthing went wrong",
                "success": False,
            }
        
        return Response(response, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_403_FORBIDDEN)
    
