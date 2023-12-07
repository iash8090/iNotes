from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Note
from .serializers import NoteSerializer

# Create your views here.

@api_view(['GET'])
def getRoutes(request):

    routes = [
        {
            'Endpoint': '/api/notes/',
            'method': 'GET / POST',
            'body': None,
            'description': 'Returns an array of notes'
        },
        {
            'Endpoint': '/api/notes/id',
            'method': 'GET / PUT / DELETE' ,
            'body': None,
            'description': 'Returns a single note object'
        },
    ]

    return Response(routes)


@api_view(['GET','POST'])
def Notes(request):
    if request.method == "GET":
        notes=Note.objects.all().order_by('-updated')
        serializer = NoteSerializer(notes, many=True)
        return Response(serializer.data)


    if request.method == "POST":
        data = request.data
        new_note = Note.objects.create( body = data['body'])
        serializer = NoteSerializer(new_note, many=False)
        return Response(serializer.data)
    


@api_view(['GET', 'PUT', 'DELETE'])
def modifyNote(request,nid):
    if request.method == "GET":
        notes=Note.objects.get(id=nid)
        serializer = NoteSerializer(notes, many=False)
        return Response(serializer.data)


    if request.method == "PUT":
        data = request.data
        note = Note.objects.get(id=nid)
        serializer = NoteSerializer(instance=note, data=data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)


    if request.method == "DELETE":
        note=Note.objects.get(id=nid)
        note.delete()
        return Response('Note is deleted')

