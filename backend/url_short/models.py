from django.db import models
import uuid


class ShortenedLink(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    full_link = models.TextField()
    short_link_suffix = models.TextField()



    def __str__(self) -> str:
        return f'{self.short_link_suffix}, {self.full_link}'


class LinkUnshortening(models.Model):
    time = models.DateTimeField(auto_now=True)
    shortened_link = models.ForeignKey(ShortenedLink, related_name='unshortenings')

    def __str__(self) -> str:
        return f'{self.time}, {self.shortened_link}'