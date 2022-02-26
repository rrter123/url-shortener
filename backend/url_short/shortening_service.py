import random
import string

from url_short.models import ShortenedLink


class FailedShorteningGenerationException(BaseException):
    ...


class ShorteningService:
    DEFAULT_SUFFIX_LENGTH = 5

    @classmethod
    def generate_short_suffix(cls) -> str:
        for length in range(cls.DEFAULT_SUFFIX_LENGTH, cls.DEFAULT_SUFFIX_LENGTH+2):
            for _ in range(5):
                random_string = cls.generate_random_string(length)
                if not cls.string_has_collision(random_string):
                    return random_string
        raise FailedShorteningGenerationException

    @classmethod
    def string_has_collision(cls, random_string: str) -> bool:
        # circular import will happen here
        return ShortenedLink.objects.filter(short_link_suffix=random_string).exists()

    @classmethod
    def generate_random_string(length: int) -> str:
        return ''.join(random.choices(string.ascii_uppercase + string.digits, k=length))
