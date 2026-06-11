Fuzzy Text International 2
==========================

A watchface for [Pebble][] that displays the time as natural language - "quarter past three", "half past ten" - in your choice of language and visual style.

Originally based on [PebbleTextWatch][] by Mihai Dumitrache, with fuzzy time and Swedish support added by [Mattias Bäcklund][Mattias], and multi-language configuration by [Jesse Hallett][Jesse]. This fork extends that work with additional languages, user experience improvements, and a cleaner architecture for contributors.

[Pebble]: https://repebble.com/
[PebbleTextWatch]: https://github.com/wearewip/PebbleTextWatch


Features
--------

- Fuzzy time in natural language across nine languages
- Large, easy-to-read fonts with smooth staggered animations
- Supports all Pebble models including higher resolution screens such as the Pebble Time 2
- Between one and four lines of text, adapting to what fits
- Shake to show the date, with a configurable auto-revert timeout
- Ordinal date suffixes for English (GB): 1st, 2nd, 3rd…


Settings
--------

All settings are configurable from the Pebble app on your phone:

| Setting | Options |
|---|---|
| Invert colors | White-on-black / Black-on-white |
| Show date on shake | On / Off |
| Date view timeout | 3s / 5s / 8s / 60s / Never |
| Text alignment | Center / Left / Right |
| Font size | Small / Medium / Large |
| Language | See below |


Languages
---------

- Català
- Deutsch
- English (Great Britain)
- English (United States)
- Español
- Français
- Nederlands
- Norsk
- Português
- Svenska


Contributing a Translation
--------------------------

To add a new language:

1. **Create `src/c/strings-XX.h`** - declare the arrays, date macros, and suffix function:
   ```c
   #pragma once
   #include "strings-en_US.h"

   extern const char* const HOURS_XX[24];
   extern const char* const RELS_XX[12];

   #define DAYS_XX        DAYS_EN_US
   #define MONTHS_XX      MONTHS_EN_US
   #define DATE_FORMAT_XX "$1  $2 $3 "

   const char* date_suffix_XX(int date);
   ```
   If your language uses its own day/month names or date order, define `DAYS_XX[7]`, `MONTHS_XX[12]`, and `DATE_FORMAT_XX[]` as real arrays instead (see `strings-de.h` as an example).

2. **Create `src/c/strings-XX.c`** - define 24 hour names, 12 relative-time phrases, and a suffix function (return `""` if your language doesn't use ordinal suffixes):
   ```c
   #include "strings-XX.h"
   const char* const HOURS_XX[] = { /* 12 AM + 12 PM hour names */ };
   const char* const RELS_XX[] = {
     "*$1 ...",   /* on the hour   */
     /* 11 more five-minute intervals */
   };
   const char* date_suffix_XX(int date) { return ""; }
   ```
   In the `RELS_XX` phrases, `$1` is replaced with the current hour and `$2` with the next. A `*` prefix makes that word bold.

3. **Register the language in `src/c/num2words.h`** - add one row to `ALL_LANGUAGES` with a unique integer value:
   ```c
   X(XX, 0xN)
   ```

4. **Add the include in `src/c/num2words.c`**:
   ```c
   #include "strings-XX.h"
   ```

5. **Wire up the JS side** - add the language to `src/pkjs/pebble-js-app.js`:
   ```javascript
   xx: N
   ```
   And add an `<option>` to the select in `src/pkjs/config-html.js`.

Please [open an issue][issue] to report an error or discuss anything else.
Pull requests are welcome.

[issue]: https://github.com/adamboutcher/Pebble-Fuzzy-Text-International-PT2/issues/new


Authors
-------

- [Mihai Dumitrache][Mihai] - original open-source Text Watch
- [Mattias Bäcklund][Mattias] - Swedish fuzzy text watch
- [Jesse Hallett][Jesse] - configuration options and multi-language support
- [Adam Boutcher][Adam] - this fork: additional languages, UX improvements, and contributor architecture

[Mihai]: https://github.com/mmdumi
[Mattias]: https://github.com/Sarastro72
[Jesse]: https://github.com/hallettj
[Adam]: https://github.com/adamboutcher


Contributors
------------

- [Filip Horvei][iFlips] - Norwegian translation
- Tomi De Lucca - iOS bug fix and Spanish translation assistance
- nighto - Portuguese translation

[iFlips]: https://github.com/iFlips
