# pylint: disable=redefined-outer-name,unused-argument

from collections import OrderedDict
import pytest
import responses

from app import app as _app
from schema import schema, PHOTOS_ENDPOINT

@pytest.fixture
def app(request):
    ctx = _app.app_context()
    ctx.push()

    def teardown():
        ctx.pop()

    request.addfinalizer(teardown)
    return _app

@responses.activate
def test_photos_query(app):
    response = {
        'feature': 'popular',
        'filters': {
            'category': False,
            'exclude': False
        },
        'current_page': 1,
        'total_pages': 250,
        'total_items': 5000,
        'photos': [
            {
                'id': 4910421,
                'name': 'Orange or lemon',
                'description': '',
                'times_viewed': 709,
                'rating': 97.4,
                'created_at': '2012-02-09T02:27:16-05:00',
                'category': 0,
                'privacy': False,
                'width': 472,
                'height': 709,
                'votes_count': 88,
                'comments_count': 58,
                'nsfw': False,
                'image_url':
                    'http://pcdn.500px.net/4910421/c4a10b46e857e33ed2df35749858a7e45690dae7/2.jpg',
                'images': [
                    {
                        'url': 'http://pcdn.500px.net/4910421/' \
                            'c4a10b46e857e33ed2df35749858a7e45690dae7/2.jpg'
                    }
                ],
                'user': {
                    'id': 386047,
                    'username': 'Lluisdeharo',
                    'firstname': 'Lluis ',
                    'lastname': 'de Haro Sanchez',
                    'city': 'Sabadell',
                    'country': 'Catalunya',
                    'fullname': 'Lluis de Haro Sanchez',
                    'userpic_url': 'http://acdn.500px.net/386047/' \
                        'f76ed05530afec6d1d0bd985b98a91ce0ce49049/1.jpg?0',
                    'upgrade_status': 0
                }
            },
            {
                'id': 4905955,
                'name': 'R E S I G N E D',
                'description': 'From the past of Tagus River, we have History' \
                    'and memories, some of them abandoned and disclaimed in their margins ...',
                'times_viewed': 842,
                'rating': 97.4,
                'created_at': '2012-02-08T19:00:13-05:00',
                'category': 0,
                'privacy': False,
                'width': 750,
                'height': 500,
                'votes_count': 69,
                'comments_count': 29,
                'nsfw': False,
                'image_url': 'http://pcdn.500px.net/4905955/' \
                    '7e1a6be3d8319b3b7357c6390289b20c16a26111/2.jpg',
                'images': [
                    {
                        'url': 'http://pcdn.500px.net/4905955/' \
                            '7e1a6be3d8319b3b7357c6390289b20c16a26111/2.jpg'
                    }
                ],
                'user': {
                    'id': 350662,
                    'username': 'cresendephotography',
                    'firstname': 'Carlos',
                    'lastname': 'Resende',
                    'city': 'Forte da Casa',
                    'country': 'Portugal',
                    'fullname': 'Carlos Resende',
                    'userpic_url': 'http://acdn.500px.net/350662.jpg',
                    'upgrade_status': 0
                }
            }
        ]
    }
    responses.add(
        responses.GET,
        PHOTOS_ENDPOINT,
        json=response
    )

    query = '''{
        photos {
            currentPage
            totalPages
            photos {
                url
                aspectRatio
                name
                description
                artist
            }
        }
    }'''

    result = schema.execute(query)
    assert not result.errors
    assert result.data == OrderedDict({
        'photos': OrderedDict({
            'currentPage': response['current_page'],
            'totalPages': response['total_pages'],
            'photos': [
                OrderedDict({
                    'url': response['photos'][0]['images'][0]['url'],
                    'aspectRatio': response['photos'][0]['width'] / response['photos'][0]['height'],
                    'name': response['photos'][0]['name'],
                    'description': response['photos'][0]['description'],
                    'artist': response['photos'][0]['user']['username'],
                }),
                OrderedDict({
                    'url': response['photos'][1]['images'][0]['url'],
                    'aspectRatio': response['photos'][1]['width'] / response['photos'][1]['height'],
                    'name': response['photos'][1]['name'],
                    'description': response['photos'][1]['description'],
                    'artist': response['photos'][1]['user']['username'],
                })
            ]
        })
    })
