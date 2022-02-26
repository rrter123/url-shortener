from url_short.models import LinkUnshortening, ShortenedLink
from rest_framework import serializers


class ShortenedLinkSerializer(serializers.ModelSerializer):

    class Meta:
        model = ShortenedLink
        fields = ['id', 'short_link_suffix', 'full_link']
        read_only_fields = ['id', 'short_link_suffix']


class LinkUnshorteningSerializer(serializers.ModelSerializer):

    class Meta:
        model = LinkUnshortening
        fields = '__all__'