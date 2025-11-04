# Beitragende Richtlinien

Vielen Dank für dein Interesse, zum Creator Management App Projekt beizutragen! Dieses Dokument beschreibt den empfohlenen Workflow für Pull Requests und Issue-Erstellung.

## Grundsätze

- Halte dich an den Verhaltenskodex und respektiere andere Beitragende.
- Bevor du mit der Implementierung beginnst, öffne ein Issue oder nimm Kontakt zu den Maintainerinnen auf.
- Schreibe wartbaren, getesteten und typisierten Code.

## Entwicklungs-Setup

1. Repository forken und lokal klonen.
2. Eine neue Branche von `main` erstellen (`git checkout -b feature/mein-feature`).
3. `npm install` ausführen und sicherstellen, dass `npm run lint`, `npm run format` und `npm run typecheck` erfolgreich sind.

## Pull Requests

- Beschreibe die Motivation und die wichtigsten Änderungen im PR-Text.
- Verlinke das zugehörige Issue (`Closes #123`).
- Füge Screenshots oder GIFs für UI-relevante Änderungen hinzu.
- Stelle sicher, dass alle Checks grün sind, bevor du um Review bittest.

## Commit-Konvention

- Nutze das Schema `type(scope): beschreibung`, z. B. `feat(auth): implement login mutation`.
- Häufige Typen: `feat`, `fix`, `refactor`, `chore`, `docs`, `test`.

## Tests & QA

- Schreibe Unit-Tests für Business-Logik und kritische Komponenten.
- Überprüfe deine Änderung auf iOS- und Android-Targets (Simulator/Emulator).
- Nutze `npm run lint` und `npm run format` vor dem Commit.

## Sicherheit & Datenschutz

- Checke keine Geheimnisse (API Keys, Zugangsdaten) ein.
- Beachte geltende Datenschutzanforderungen (GDPR, DSGVO).

## Fragen?

Bei Fragen oder Anregungen kannst du Issues öffnen oder dich direkt an `support@creatorapp.com` wenden.
