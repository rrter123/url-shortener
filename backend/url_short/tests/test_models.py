from unittest import mock

import pytest
from url_short.models import ShortenedLink


@pytest.mark.django_db
@mock.patch.object(ShortenedLink, 'generate_random_string', return_value='test123')
def test_shortening_model(generate_mock):
    s = ShortenedLink.objects.create(full_link='https://test.com')
    generate_mock.assert_called_once()
    assert s.short_link_suffix == 'test123'
