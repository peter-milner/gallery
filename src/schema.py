import requests
import graphene

from flask import current_app

from cache import cache

class Photo(graphene.ObjectType):
    url = graphene.String()
    aspect_ratio = graphene.Float()
    name = graphene.String()
    description = graphene.String()
    artist = graphene.String()

class Photos(graphene.ObjectType):
    current_page = graphene.Int()
    total_pages = graphene.Int()
    photos = graphene.List(Photo)

class Query(graphene.ObjectType):
    photos = graphene.Field(Photos, page=graphene.Int())

    @cache.memoize(timeout=60)
    def resolve_photos(self, _info, page=1):
        params = {
            'feature': 'popular',
            'consumer_key': current_app.config['CONSUMER_KEY'],
            'page': page,
            'rpp': 50,
            'image_size': 1080
        }

        r = requests.get('https://api.500px.com/v1/photos', params=params).json()
        result = {}
        result['current_page'] = r['current_page']
        result['total_pages'] = r['total_pages']
        result['photos'] = []
        for p in r['photos']:
            photo = {}
            photo['url'] = p['images'][0]['url']
            photo['aspect_ratio'] = p['width'] / p['height']
            photo['name'] = p['name']
            photo['description'] = p['description']
            photo['artist'] = p['user']['username']
            result['photos'].append(photo)
        return result

schema = graphene.Schema(query=Query)
