"""Tests for the flashcard logic — no real keyboard needed.

    pip install -r requirements-dev.txt
    pytest
"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from cli import grade, is_correct, normalize, run


def test_normalize_is_forgiving():
    assert normalize("  Paris  ") == "paris"
    assert normalize("CARBON   dioxide") == "carbon dioxide"


def test_normalize_strips_control_chars():
    assert normalize("Pa\x00ris") == "paris"


def test_is_correct_ignores_case_and_spacing():
    assert is_correct("  mars ", "Mars")
    assert not is_correct("Venus", "Mars")


def test_grade():
    assert grade(3, 4) == 75.0
    assert grade(0, 0) == 0.0


def _scripted_ask(answers):
    """Return an ``ask`` that feeds queued answers, then None (quit)."""
    queue = list(answers)
    def ask(_prompt):
        return queue.pop(0) if queue else None
    return ask


def test_run_scores_a_session():
    cards = [{"q": "2+2?", "a": "4"}, {"q": "Capital of France?", "a": "Paris"}]
    said = []
    score, answered = run(
        cards,
        ask=_scripted_ask(["4", "London"]),
        say=said.append,
        shuffle=False,
    )
    assert (score, answered) == (1, 2)
    assert any("Correct" in line for line in said)


def test_run_handles_skip_and_quit():
    cards = [{"q": "a?", "a": "x"}, {"q": "b?", "a": "y"}]
    score, answered = run(
        cards,
        ask=_scripted_ask(["skip", "q"]),
        say=lambda _: None,
        shuffle=False,
    )
    assert (score, answered) == (0, 0)
