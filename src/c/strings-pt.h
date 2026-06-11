#pragma once
#include "strings-en_US.h"

#define DAYS_PT        DAYS_EN_US
#define MONTHS_PT     MONTHS_EN_US
#define DATE_FORMAT_PT "$1  $2 $3 "

extern const char* const HOURS_PT[24];
extern const char* const RELS_PT[12];

const char* date_suffix_PT(int date);
