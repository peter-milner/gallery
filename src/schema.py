import requests
import graphene

from flask import current_app

class Photo(graphene.ObjectType):
    url = graphene.String()
    aspect_ratio = graphene.Float()
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
            'consumer_key': current_app.config['CONSUMER_KEY'],
            'page': page,
            'rpp': 50,
            'image_size': [6]
        }
        r = requests.get('https://api.500px.com/v1/photos', params=params)
        print(r.url, flush=True)
        r = r.json()
        result = {}
        result['current_page'] = r['current_page']
        result['total_pages'] = r['total_pages']
        result['photos'] = []
        for p in r['photos']:
            photo = {}
            photo['url'] = p['images'][0]['url']
            photo['aspect_ratio'] = p['width'] / p['height']
            result['photos'].append(photo)
        return result

schema = graphene.Schema(query=Query)
