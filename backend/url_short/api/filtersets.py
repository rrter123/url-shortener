from django_filters import rest_framework as filters
from url_short.models import LinkUnshortening


class LinkUnshorteningFilter(filters.FilterSet):
    """
    Filters for LinkUnshorteningViewSet
    Unfortunately django_filters does not support
    icontains lookup on a datetime field
    """
    date = filters.CharFilter('time', method='filter_time')

    def filter_time(self, queryset, name, value):
        lookup = '__'.join([name, 'icontains'])
        return queryset.filter(**{lookup: value})

    class Meta:
        model = LinkUnshortening
        fields = ['time']
