#include "strings-de.h"
#include "strings-en_US.h"

const char* const* DAYS_DE = DAYS_EN_US;
const char* const* MONTHS_DE = MONTHS_EN_US;
const char* DATE_FORMAT_DE = DATE_FORMAT_EN_US;

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

const char* date_suffix_DE(int date) { return ""; }
