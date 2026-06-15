"""hibot-python-cli — flashcards in your terminal.

A tiny, dependency-free Python program. It quizzes you on the cards in
cards.py, keeps score, and is written so the logic is easy to test.

Run:
    python cli.py            # all cards, shuffled
    python cli.py --limit 5  # just five
    python cli.py --no-shuffle
Type 'skip' to pass, or 'q' to quit early.
"""
import argparse
import random

from cards import CARDS
from sanitize import clean_text


def normalize(text: str) -> str:
    """Lowercase, trim, and collapse whitespace for forgiving comparison."""
    return " ".join(clean_text(text).lower().split())


def is_correct(answer: str, expected: str) -> bool:
    return normalize(answer) == normalize(expected)


def grade(score: int, answered: int) -> float:
    return round(score / answered * 100, 1) if answered else 0.0


def run(cards, ask, say, shuffle=True, limit=None):
    """Quiz loop. ``ask`` and ``say`` are injected so this is easy to test:
    ``ask(prompt) -> str|None`` reads input, ``say(text)`` shows output."""
    deck = list(cards)
    if shuffle:
        random.shuffle(deck)
    if limit:
        deck = deck[:limit]

    score = 0
    answered = 0
    for card in deck:
        raw = ask(f"\n{card['q']}\n> ")
        if raw is None:
            break
        command = normalize(raw)
        if command in {"q", "quit", "exit"}:
            break
        if command in {"s", "skip"}:
            say(f"Skipped. Answer: {card['a']}")
            continue
        answered += 1
        if is_correct(raw, card["a"]):
            score += 1
            say("✓ Correct!")
        else:
            say(f"✗ Not quite. Answer: {card['a']}")

    say(f"\nScore: {score}/{answered} ({grade(score, answered)}%)")
    return score, answered


def main(argv=None):
    parser = argparse.ArgumentParser(description="Hi Bot flashcards — practice in your terminal.")
    parser.add_argument("--limit", type=int, default=None, help="number of cards to ask")
    parser.add_argument("--no-shuffle", action="store_true", help="keep cards.py order")
    args = parser.parse_args(argv)

    def ask(prompt):
        try:
            return input(prompt)
        except (EOFError, KeyboardInterrupt):
            return None

    print("Flashcards — type your answer, 'skip' to pass, 'q' to quit.")
    run(CARDS, ask=ask, say=print, shuffle=not args.no_shuffle, limit=args.limit)


if __name__ == "__main__":
    main()
