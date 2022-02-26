from rest_framework import generics
from django_filters import rest_framework as filters
from url_short.models import LinkUnshortening


class LinkUnshorteningFilter(filters.FilterSet):
    date = filters.DateTimeFilter('time', 'date__icontains')

    class Meta:
        model = LinkUnshortening
        fields = ['time']


# class ProductList(generics.ListAPIView):
#     queryset = Product.objects.all()
#     serializer_class = ProductSerializer
#     filter_backends = (filters.DjangoFilterBackend,)
#     filterset_class = ProductFilter