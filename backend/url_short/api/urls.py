from django.urls import re_path
from rest_framework import routers

from .views import LinkUnshorteningViewSet, ShortenedLinkViewSet

router = routers.DefaultRouter()
router.register(r'link', ShortenedLinkViewSet, basename='link')

urlpatterns = [
    re_path(r'^unshortening/(?P<short_link_id>.+)/$', LinkUnshorteningViewSet.as_view({'get': 'list'}))
]
urlpatterns += router.urls
