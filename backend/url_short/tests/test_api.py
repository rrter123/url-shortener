import datetime

import pytest
from url_short.models import LinkUnshortening, ShortenedLink


@pytest.mark.django_db
def test_post_create_shortened_link(client):
    test_link = 'https://test.com'

    response = client.post('/url-short/link/', {'full_link': test_link})

    assert response.status_code == 201
    assert ShortenedLink.objects.count() == 1
    sl = ShortenedLink.objects.first()
    assert sl.full_link == test_link


@pytest.mark.django_db
def test_get_shortened_link(client):
    test_link = 'https://test.com'
    sl = ShortenedLink.objects.create(full_link=test_link)

    response = client.get(f'/url-short/link/{sl.id}/')

    assert response.status_code == 200
    assert response.data == {'id': str(
        sl.id), 'full_link': sl.full_link, 'short_link_suffix': sl.short_link_suffix}


@pytest.mark.django_db
def test_get_unshortened_link(client):
    test_link = 'https://test.com'
    sl = ShortenedLink.objects.create(full_link=test_link)

    response = client.get(f'/url-short/link/{sl.short_link_suffix}/unshorten/')

    assert response.status_code == 200
    assert response.data == {'id': str(
        sl.id), 'full_link': sl.full_link, 'short_link_suffix': sl.short_link_suffix}
    assert LinkUnshortening.objects.count() == 1


@pytest.mark.django_db
def test_get_404_unshortened_link(client):
    response = client.get('/url-short/link/non_existing/unshorten/')
    assert response.status_code == 404


@pytest.mark.django_db
def test_get_unshortenings(client):
    test_link = 'https://test.com'
    sl = ShortenedLink.objects.create(full_link=test_link)
    lu = LinkUnshortening.objects.create(shortened_link=sl)

    response = client.get(f'/url-short/unshortening/{sl.id}/')

    assert response.status_code == 200
    assert dict(response.data[0])['id'] == lu.id


@pytest.mark.django_db
def test_get_unshortenings_by_date(client):
    test_link = 'https://test.com'
    sl = ShortenedLink.objects.create(full_link=test_link)
    lu = LinkUnshortening.objects.create(shortened_link=sl)
    LinkUnshortening.objects.create(shortened_link=sl)
    # bypass save
    LinkUnshortening.objects.filter(id=lu.id).update(time=datetime.datetime(
        2022, 2, 23, 17, 34, 14, 464503, tzinfo=datetime.timezone.utc))

    response = client.get(
        f'/url-short/unshortening/{sl.id}/', {'date': '2022-02-23'})

    assert response.status_code == 200
    assert len(response.data) == 1
    assert dict(response.data[0])['id'] == lu.id
