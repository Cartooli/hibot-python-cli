"""Input sanitization helper — clean anything typed at the prompt."""
import re

_CONTROL_CHARS = re.compile(r"[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]")


def clean_text(raw, max_len: int = 200) -> str:
    """Trim, strip control characters, and length-cap user input."""
    if raw is None:
        return ""
    text = str(raw)
    text = _CONTROL_CHARS.sub("", text)
    text = text.strip()
    if len(text) > max_len:
        text = text[:max_len]
    return text
