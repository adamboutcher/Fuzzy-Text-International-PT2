#pragma once
#include "strings-en_US.h"

#define DAYS_NL        DAYS_EN_US
#define MONTHS_NL     MONTHS_EN_US
#define DATE_FORMAT_NL "$1  $2 $3 "

extern const char* const HOURS_NL[24];
extern const char* const RELS_NL[12];

const char* date_suffix_NL(int date);
