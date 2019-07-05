import os
import requests
import graphene

CONSUMER_KEY = os.environ.get('CONSUMER_KEY')

class Photo(graphene.ObjectType):
    url = graphene.String()
    title = graphene.String()
    description = graphene.String()
    artist = graphene.String()

class Photos(graphene.ObjectType):
    current_page = graphene.Int()
    total_pages = graphene.Int()
    photos = graphene.List(Photo)    

class Query(graphene.ObjectType):
    photos = graphene.Field(Photos, page=graphene.Int())

    def resolve_photos(self, _info, page):
        params = {
            'feature': 'popular',
            'consumer_key': CONSUMER_KEY,
            'page': page
        }
        r = requests.get('https://api.500px.com/v1/photos', params=params).json()
        result = {}
        result['current_page'] = r['current_page']
        result['total_pages'] = r['total_pages']
        result['photos'] = []
        for p in r['photos']:
            photo = {}
            photo['url'] = p['image_url'][0]
            result['photos'].append(photo)
        return result

schema = graphene.Schema(query=Query)
