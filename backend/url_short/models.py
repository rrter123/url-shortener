from django.db import models
import uuid
import random
import string


class FailedShorteningGenerationException(BaseException):
    ...


class ShortenedLink(models.Model):
    DEFAULT_SUFFIX_LENGTH = 5

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    full_link = models.TextField()
    short_link_suffix = models.TextField()

    def save(self, *args, **kwargs):
        if not self.short_link_suffix:
            self.short_link_suffix = self.generate_short_suffix()
        return super().save(*args, **kwargs)

    def generate_short_suffix(self) -> str:
        # Clean this up
        for length in range(self.DEFAULT_SUFFIX_LENGTH, self.DEFAULT_SUFFIX_LENGTH+2):
            for _ in range(5):
                random_string = self.generate_random_string(length)
                if not self.string_has_collision(random_string):
                    return random_string
        raise FailedShorteningGenerationException

    def generate_random_string(self, length: int) -> str:
        # Move this somewhere else
        return ''.join(random.choices(string.ascii_uppercase + string.digits, k=length))

    def string_has_collision(self, random_string: str) -> bool:
        return ShortenedLink.objects.filter(short_link_suffix=random_string).exists()

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
