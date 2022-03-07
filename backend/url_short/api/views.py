
from django.shortcuts import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import mixins, viewsets
from rest_framework.decorators import action
from rest_framework.request import Request
from rest_framework.response import Response
from url_short.api.filtersets import LinkUnshorteningFilter
from url_short.api.serializers import (LinkUnshorteningSerializer,
                                       ShortenedLinkSerializer)
from url_short.models import LinkUnshortening, ShortenedLink


class ShortenedLinkViewSet(mixins.CreateModelMixin, mixins.RetrieveModelMixin, mixins.DestroyModelMixin, viewsets.GenericViewSet):
    serializer_class = ShortenedLinkSerializer
    queryset = ShortenedLink.objects.all()

    @action(detail=True, methods=['get'])
    def unshorten(self, request: Request, pk=None) -> Response:
        obj = get_object_or_404(self.queryset, short_link_suffix=pk)

        serializer = self.serializer_class(obj)
        self._create_unshortening_action(obj)
        return Response(serializer.data)

    def _create_unshortening_action(self, obj: ShortenedLink) -> None:
        LinkUnshortening.objects.create(shortened_link=obj)


class LinkUnshorteningViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    # TODO: Add filtering and pagination
    serializer_class = LinkUnshorteningSerializer
    queryset = LinkUnshortening.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_class = LinkUnshorteningFilter

    def get_queryset(self):
        qs = super().get_queryset()
        sl_id = self.kwargs['short_link_id']
        print('?', qs.filter(shortened_link__id=sl_id))
        return qs.filter(shortened_link__id=sl_id)
