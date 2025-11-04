# Creator Management App

Creator Management App ist eine professionelle Expo- und React-Native-Anwendung zum Verwalten von Content-Creator-Workflows. Das Projekt ist für produktive Einsätze, eine GitHub-Veröffentlichung und eine App-Store-Submission vorbereitet.

## Überblick

- Zentrale Steuerung von Creator-Profilen, Content-Planung und Analytics
- Moderne Architektur mit TypeScript, Zustand, React Navigation und TanStack Query
- Expo SDK 54 mit New Architecture, OTA-Updates und EAS-Build-Pipeline
- App-Store-konforme Konfiguration inklusive Berechtigungen und Assets

## Funktionsumfang

- Authentifizierung mit persistenter Sessionverwaltung (Zustand + AsyncStorage)
- Dashboard, Creator-, Content- und Analytics-Screens als strukturierte Platzhalter
- Content-Uploads, Scheduling und AI-Chat (Platzhalter-Komponenten)
- Einstellungen und Profilbereich mit Navigation via Bottom Tabs und Native Stack

## Tech-Stack

- **Framework**: Expo SDK 54 (React Native 0.81, React 19)
- **Sprache**: TypeScript mit strikt konfiguriertem Compiler
- **State Management**: Zustand + TanStack Query
- **Networking**: Axios mit zentralen Services
- **Forms & Validation**: React Hook Form + Zod
- **Navigation**: React Navigation (Native Stack & Bottom Tabs)

## Voraussetzungen

- Node.js `>= 18`
- npm `>= 10`
- Expo CLI (`npm install --global expo-cli`) oder `npx expo`
- Für EAS Builds: `npm install --global eas-cli` sowie ein aktives Expo-Konto

## Installation

```bash
# Repository klonen
git clone https://github.com/yourusername/creator-management-app.git
cd creator-management-app

# Abhängigkeiten installieren
npm install
```

## Entwicklung starten

```bash
# Expo Dev Server starten
npm start

# Plattform-spezifische Schnellbefehle
npm run ios
npm run android
npm run web
```

## Qualitäts- und Build-Skripte

```bash
npm run lint           # ESLint-Regeln prüfen
npm run format         # Prettier-Formatierung anwenden
npm run typecheck      # TypeScript ohne Emission prüfen
npm run build:ios      # EAS iOS Production Build
npm run build:android  # EAS Android Production Build
npm run submit:ios     # Upload zur App Store Connect
npm run submit:android # Upload zur Google Play Console
```

## Projektstruktur

```text
.
├── App.tsx
├── app.json
├── assets/
├── index.ts
├── package.json
├── src/
│   ├── components/
│   ├── constants/
│   ├── hooks/
│   ├── navigation/
│   ├── screens/
│   ├── services/
│   ├── store/
│   ├── types/
│   └── utils/
├── tsconfig.json
└── README.md
```

Die Unterordner `components`, `hooks` und `utils` enthalten aktuell `.gitkeep`-Platzhalter und stehen für künftige Implementierungen bereit.

## Konfiguration & Umgebungsvariablen

1. Kopiere `.env.example` zu `.env`
2. Befülle die Variablen mit deinen API- und Service-Endpunkten
3. Expo exportiert Variablen mit Präfix `EXPO_PUBLIC_` automatisch an die App

```bash
cp .env.example .env
```

## Expo- und App-Store-Setup

- `app.json` enthält Bundle Identifier, Android Package Name und aktualisierte Berechtigungen
- `expo-image-picker`, `expo-splash-screen` und `expo-updates` sind vorkonfiguriert
- `extra.eas.projectId` muss nach `eas init` mit der echten Projekt-ID ersetzt werden
- Passe Icons, Splash-Screens und Texte unter `assets/` an das finale Branding an

## Build & Release Workflow

1. `eas login`
2. `npm run build:ios`
3. `npm run build:android`
4. `npm run submit:ios`
5. `npm run submit:android`
6. `eas update --branch production --message "Release Notes"` für OTA-Updates

## App-Store-Checkliste

- [ ] App-Name, Beschreibung, Keywords und Kategorie in App Store Connect / Google Play Console pflegen
- [ ] Store-Screenshots (iPhone, iPad, Android) erstellen
- [ ] Datenschutzrichtlinie und Support-URL (siehe `app.json`) finalisieren
- [ ] Datenschutz-/Tracking-Formulare ausfüllen (ATT, Data Safety)
- [ ] QA über TestFlight / Internal Testing durchführen

## Contributing

1. Fork erstellen
2. Feature-Branch anlegen (`git checkout -b feature/my-feature`)
3. Änderungen committen (`git commit -m "feat: add my feature"`)
4. Branch pushen (`git push origin feature/my-feature`)
5. Pull Request eröffnen

Bitte stelle sicher, dass `npm run lint`, `npm run format` und `npm run typecheck` fehlerfrei durchlaufen, bevor du einen PR eröffnest.

## Lizenz

Dieses Projekt steht unter der MIT-Lizenz. Details findest du in der Datei [LICENSE](LICENSE).
