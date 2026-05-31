#pragma once
#include "string.h"
#include <stdbool.h>

typedef enum {
  CA    = 0x0,  /* ca    | Català                  */
  DE    = 0x1,  /* de    | Deutsch                 */
  EN_GB = 0x2,  /* en_GB | English (Great Britain) */
  EN_US = 0x3,  /* en_US | English (United States) */
  ES    = 0x4,  /* es    | Español                 */
  FR    = 0x5,  /* fr    | Français                */
  NO    = 0x6,  /* no    | Norsk                   */
  SV    = 0x7,  /* sv    | Svenska                 */
  NL    = 0x8,  /* nl    | Nederlands               */
  PT    = 0x9   /* pt    | Português                */
} Language;

void time_to_words(Language lang, int hours, int minutes, int seconds, char* words, size_t length);
void date_to_words(Language lang, int day, int date, int month, char* words, size_t length);
const char* get_date_suffix(Language lang, int date);

char * itoa10(int value, char *result);