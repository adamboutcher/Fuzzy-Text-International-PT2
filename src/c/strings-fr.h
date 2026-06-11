#pragma once
#include "strings-en_US.h"

#define DAYS_FR        DAYS_EN_US
#define MONTHS_FR     MONTHS_EN_US
#define DATE_FORMAT_FR "$1  $2 $3 "

extern const char* const HOURS_FR[24];
extern const char* const RELS_FR[12];

const char* date_suffix_FR(int date);
