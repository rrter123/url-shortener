from django.db import models
import typing as t
import random
import string

class FailedShorteningGenerationException(BaseException):
    ...

class GenerateRandomStringService:
    DEFAULT_SUFFIX_LENGTH = 5

    def __init__(self, class_type: t.Type[models.Model]):
        self.class_type = class_type

    def generate_short_suffix(self) -> str:
        # Clean this up
        for length in range(self.DEFAULT_SUFFIX_LENGTH, self.DEFAULT_SUFFIX_LENGTH+2):
            for _ in range(5):
                random_string = self._generate_random_string(length)
                if not self._string_has_collision(random_string):
                    return random_string
        raise FailedShorteningGenerationException

    def _generate_random_string(self, length: int) -> str:
        return ''.join(random.choices(string.ascii_letters + string.digits, k=length))

    def _string_has_collision(self, random_string: str) -> bool:
        return self.class_type.objects.filter(short_link_suffix=random_string).exists()