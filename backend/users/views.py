from django.contrib.auth.models import User
from django.contrib.auth import authenticate

from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from rest_framework import status

from rest_framework_simplejwt.tokens import RefreshToken

from .models import Assessment

@api_view(['GET'])
def test_api(request):

    return Response({
        "message": "Backend Connected Successfully"
    })


@api_view(['POST'])
def register_user(request):

    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')

    if User.objects.filter(username=username).exists():

        return Response({
            "error": "Username already exists"
        }, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(
        username=username,
        email=email,
        password=password
    )

    return Response({
        "message": "User Registered Successfully"
    })


@api_view(['POST'])
def login_user(request):

    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(
        username=username,
        password=password
    )

    if user is None:

        return Response({
            "error": "Invalid Credentials"
        }, status=status.HTTP_401_UNAUTHORIZED)

    refresh = RefreshToken.for_user(user)

    return Response({

        "refresh": str(refresh),

        "access": str(refresh.access_token),

    })


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile(request):

    return Response({

        "username": request.user.username,

        "email": request.user.email,

    })



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def submit_assessment(request):

    q1 = int(request.data.get('q1'))
    q2 = int(request.data.get('q2'))
    q3 = int(request.data.get('q3'))
    q4 = int(request.data.get('q4'))
    q5 = int(request.data.get('q5'))
    q6 = int(request.data.get('q6'))
    q7 = int(request.data.get('q7'))
    q8 = int(request.data.get('q8'))
    q9 = int(request.data.get('q9'))
    q10 = int(request.data.get('q10'))

    total_score = q1 + q2 + q3 + q4 + q5 + q6 + q7 + q8 + q9 + q10

    if total_score <= 10:
        addiction_level = "Low"

    elif total_score <= 20:
        addiction_level = "Moderate"

    else:
        addiction_level = "High"

    assessment = Assessment.objects.create(

        user=request.user,

        q1=q1,
        q2=q2,
        q3=q3,
        q4=q4,
        q5=q5,
        q6=q6,
        q7=q7,
        q8=q8,
        q9=q9,
        q10=q10,
        

        total_score=total_score,

        addiction_level=addiction_level
    )

    return Response({

        "message": "Assessment Submitted",

        "total_score": total_score,

        "addiction_level": addiction_level

    })


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def assessment_history(request):

    assessments = Assessment.objects.filter(
        user=request.user
    ).order_by('-created_at')

    data = []

    for assessment in assessments:

        data.append({

            "id": assessment.id,

            "score": assessment.total_score,

            "level": assessment.addiction_level,

            "created_at": assessment.created_at,

        })

    return Response(data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def dashboard_stats(request):

    assessments = Assessment.objects.filter(
        user=request.user
    )

    if not assessments.exists():

        return Response({

            "latest_score": 0,

            "latest_level": "No Data",

            "total_assessments": 0,

            "average_score": 0

        })

    latest = assessments.latest('created_at')

    total_assessments = assessments.count()

    total_score = 0

    for assessment in assessments:

        total_score += assessment.total_score

    average_score = total_score / total_assessments

    return Response({

        "latest_score": latest.total_score,

        "latest_level": latest.addiction_level,

        "total_assessments": total_assessments,

        "average_score": round(average_score, 2)

    })