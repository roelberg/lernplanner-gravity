# Lernplaner

Eine kompakte Webanwendung zur Organisation und Verwaltung von persönlichen Lernaufgaben.

## Ziel der Anwendung

Der Lernplaner hilft Lernenden dabei, anstehende Aufgaben für verschiedene Fächer oder Themen strukturiert zu erfassen, Prioritäten und Fristen im Blick zu behalten und den Bearbeitungsstatus festzuhalten.

## Hauptfunktionen

- **Aufgaben erstellen**: Neue Aufgaben mit Titel, Fach/Thema, optionalem Fälligkeitsdatum, Priorität (`hoch`, `normal`, `niedrig`) und Status (`offen`, `erledigt`) anlegen.
- **Eingabevalidierung**: Verhindert das Speichern von leeren Titeln sowie Titeln, die nur aus Leerzeichen bestehen, inklusive klarer Fehlermeldung und automatischer Fehlerbereinigung bei korrekter Eingabe.
- **Aufgabenliste anzeigen**: Übersicht aller gespeicherten Aufgaben mit Metadaten-Badges sowie einem Leerzustand-Hinweis bei leerer Liste.
- **Status umschalten**: Status einer Aufgabe direkt per Klick zwischen „offen“ und „erledigt“ wechseln (inklusive visueller Kennzeichnung erledigter Aufgaben).
- **Aufgaben löschen**: Bestehende Aufgaben bei Bedarf aus der Liste entfernen.

## Verwendete Technologien

- **HTML5** (Semantische Struktur des Formulars und der Aufgabenliste)
- **CSS3** (Responsives Styling, CSS-Variablen, Status- und Prioritäts-Badges)
- **JavaScript (Vanilla JS)** (DOM-Manipulation, Validierungslogik und Event-Handling)

## Lokale Ausführung

Für die Ausführung sind keine externen Abhängigkeiten, Paketmanager oder Build-Schritte erforderlich:

1. Projektordner lokal öffnen.
2. Die Datei `index.html` direkt in einem beliebigen modernen Webbrowser (z. B. Chrome, Firefox, Edge, Safari) öffnen – entweder per Doppelklick oder über `Rechtsklick → Öffnen mit...`.
3. Alternativ kann die Datei über einen lokalen Entwicklungsserver ausgeführt werden (z. B. die VS Code-Erweiterung *Live Server* oder `npx serve .`).

## Datenspeicherung

Alle Aufgaben werden clientseitig im **LocalStorage** des Browsers unter dem Schlüssel `lernplaner_tasks` als JSON gespeichert. Dadurch bleiben die Daten auch nach dem Neuladen oder Schließen des Browsers erhalten.

## Hinweis

Dieses Projekt wurde als praxisnahe **Mini-App zu Lernzwecken** entwickelt.
