from django.db import models
import uuid
from .services import GenerateRandomStringService


class ShortenedLink(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    full_link = models.TextField()
    short_link_suffix = models.TextField()

    def save(self, *args, **kwargs):
        if not self.short_link_suffix:
            self.short_link_suffix = GenerateRandomStringService(ShortenedLink).generate_short_suffix()
        return super().save(*args, **kwargs)


    def __str__(self) -> str:
        return f'{self.short_link_suffix}, {self.full_link}'


class LinkUnshortening(models.Model):
    time = models.DateTimeField(auto_now=True)
    shortened_link = models.ForeignKey(
        ShortenedLink,
        related_name='unshortenings',
        on_delete=models.CASCADE
    )

    def __str__(self) -> str:
        return f'{self.time}, {self.shortened_link}'
