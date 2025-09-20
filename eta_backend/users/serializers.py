from rest_framework import serializers
from .models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "email", "first_name", "last_name", "role", "phone", "address"]


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    is_organizer = serializers.BooleanField(write_only=True, required=False)

    class Meta:
        model = User
        fields = ["id", "email", "password", "first_name", "last_name", "role", "is_organizer"]

    def create(self, validated_data):
        # Pop out is_organizer
        is_organizer = validated_data.pop("is_organizer", False)

        role = User.Role.ORGANIZER if is_organizer else validated_data.get("role", User.Role.ATTENDEE)

        user = User.objects.create_user(
            email=validated_data["email"],
            first_name=validated_data.get("first_name", ""),
            last_name=validated_data.get("last_name", ""),
            role=role,
        )
        
        user.set_password(validated_data['password'])
        user.save()
        return user
    
    
class CustomTokenObtainSerializer(TokenObtainPairSerializer):
    
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['id'] = user.id
        token['email'] = user.email
        token['role'] = user.role

        return token
    
    def validate(self, attrs):
        data = super().validate(attrs)

        data['id'] = self.user.id
        data['email'] = self.user.email
        data['role'] = self.user.role

        return data
