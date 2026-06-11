#pragma once
#include "strings-en_US.h"

#define DAYS_SV        DAYS_EN_US
#define MONTHS_SV     MONTHS_EN_US
#define DATE_FORMAT_SV "$1  $2 $3 "

extern const char* const HOURS_SV[24];
extern const char* const RELS_SV[12];

const char* date_suffix_SV(int date);
