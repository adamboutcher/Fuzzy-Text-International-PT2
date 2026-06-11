#include "strings-de.h"

const char* const HOURS_DE[] = {
  // AM hours
  "zwölf",
  "eins",
  "zwei",
  "drei",
  "vier",
  "fünf",
  "sechs",
  "sieben",
  "acht",
  "neun",
  "zehn",
  "elf",

  // PM hours
  "zwölf",
  "eins",
  "zwei",
  "drei",
  "vier",
  "fünf",
  "sechs",
  "sieben",
  "acht",
  "neun",
  "zehn",
  "elf"
};

/**
 * The string "$1" will be replaced with the current hour (e.g., "three"
 * at 3:45).  The string "$2" will be replaced with the *next* hour
 * (e.g., "four" at 3:45).
 *
 * A "*" character before a word makes that word bold.
 */
const char* const RELS_DE[] = {
  "*$1 Uhr",
  "fünf nach *$1",
  "zehn nach *$1",
  "viertel nach *$1",
  "zwanzig nach *$1",
  "fünf vor halb *$2",
  "halb *$2",
  "fünf nach halb *$2",
  "zwanzig vor *$2",
  "viertel vor *$2",
  "zehn vor *$2",
  "fünf vor *$2"
};

const char* const MONTHS_DE[] = {
  "jan",
  "feb",
  "mär",
  "apr",
  "mai",
  "jun",
  "jul",
  "aug",
  "sep",
  "okt",
  "nov",
  "dez"
};

const char* const DAYS_DE[] = {
  "so",
  "mo",
  "di",
  "mi",
  "do",
  "fr",
  "sa"
};

// Date format: $1 = day name, $2 = month name, $3 = date number (with suffix)
const char* const DATE_FORMAT_DE = "$1  $3 $2 ";

const char* date_suffix_DE(int date) { return "."; }
