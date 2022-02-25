from url_short.models import ShortenedLink
import pytest


@pytest.mark.django_db
def test_shortening_model():
    s = ShortenedLink.objects.create(full_link='https://test.com')
    assert s.short_link_suffix != ''
