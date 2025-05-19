# Tageslosung

Die Tageslosung kann mithilfe eines kleinen Javascript Scripts oder einer Joomla Extension zu eurer Webseite hinzugefügt werden.

# Tageslosung Joomla Component

Im `joomla` Ordner befindet sich sämtlicher Code zur Joomla Komponente. In `joomla/build` befindet sich die aktuelle Version als zip Datei, die direkt als Joomla Erweiterung installiert werden kann.

## Wie benutze ich diese Erweiterung?

Ihr geht auf die Joomla Administration Seite eure Webseite. Dort installiert ihr die Zip Datei aus dem `joomla/build` Ordner als Erweiterung. Daraufhin werdet ihr sie als "Site Module" finden können.

### Losungsdaten vorbereiten

Die Losungen müssen als `CSV / TXT (Tab getrennt)` von [losungen.de/download](https://www.losungen.de/download) heruntergeladen werden.

Danach müssen sie ins UTF-8 Format gebracht werden. Dies geht zum Beispiel mit Nodepad++. Dafür muss die Datei mit dem Programm geöffnet und daraufhin oben im Menü `Codierung` / `Konvertiere zu UTF-8` ausgewählt werden.

Im letzten Schritt müssen die Dateien auf eurem Server gehostet werden, damit die Erweiterung darauf zugreifen kann. Der Dateiname muss folgendermaßen aussehen: "Losungen20XX.csv".

Der Ordner, in dem diese csv Dateien liegen müssen lässt sich im Modul einstellen. Im Standard ist es `modules/mod_losung/data` und hier können auch einfach zukünftige Jahre hinzugefügt werden.

### Styling verändern

Das Ergebnis wird folgendermaßen aussehen:

```html
<div class="losung">
  <h5 class="losungshead">Tageslosung vom 16.11.2023</h5>
  <p class="losungstext">
    Ich will einen ewigen Bund mit meinem Volk schließen, dass ich nicht
    ablassen will, ihnen Gutes zu tun.
  </p>
  <p class="losungsvers">Jeremia 32,40</p>
</div>
```

Es ist also möglich das Aussehen zu verändern indem man `css` Klassen mit den gegebenen Namen definiert.

# Tageslosung Javascript

Dies beinhaltet ein einfaches Skript, um die aktuelle Evangelische Tageslosung per Javascript auf einer Webseite anzuzeigen. Falls ihr php bevorzugt, empfehle ich euch [dieses Projekt](http://www.combib.de/losungphp/).

## Wie benutze ich dieses Skript?

### 1. Losungsdaten vorbereiten

Die Losungen müssen als `CSV / TXT (Tab getrennt)` von [losungen.de/download](https://www.losungen.de/download) heruntergeladen werden.

Danach müssen sie ins UTF-8 Format gebracht werden. Dies geht zum Beispiel mit Nodepad++. Dafür muss die Datei mit dem Programm geöffnet und daraufhin oben im Menü `Codierung` / `Konvertiere zu UTF-8` ausgewählt werden.

Im letzten Schritt müssen die Dateien auf eurem Server gehostet werden, damit das Skript darauf zugreifen kann. Der Dateiname muss folgendermaßen aussehen: "Losungen20XX.csv".

### 2. Skript einbinden

Das fertige Skript befindet sich im `js/build` Ordner. Die dort vorhandene `bundle.js` Datei muss ebenfalls auf eurem Server gehostet werden.

Das Skript braucht folgende HTML Elemente um zu funktionieren:

```js
<div id="losung"></div>
<script src="EURE_URL/bundle.js"></script>
<script>window.showLosung("EURE_URL");</script>
```

In das `div` Element wird das Skript den Inhalt schreiben. Das erste `script` Element lädt das tatsächliche Skript. `EURE_URL` sieht bspw so aus: "http://kirche.de/media/losungen" und muss an euren Server angepasst werden. Das zweite `script` Element führt die Funktion dann aus.

### 3. Styling verändern

Das Ergebnis wird folgendermaßen aussehen:

```html
<h5 class="losungshead">Tageslosung vom 16.11.2023</h5>
<p class="losungstext">
  Ich will einen ewigen Bund mit meinem Volk schließen, dass ich nicht ablassen
  will, ihnen Gutes zu tun.
</p>
<p class="losungsvers">Jeremia 32,40</p>
```

Es ist also möglich das Aussehen zu verändern indem man `css` Klassen mit den gegebenen Namen definiert.
