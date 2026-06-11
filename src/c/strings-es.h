#pragma once
#include "strings-en_US.h"

#define DAYS_ES        DAYS_EN_US
#define MONTHS_ES     MONTHS_EN_US
#define DATE_FORMAT_ES "$1  $2 $3 "

extern const char* const HOURS_ES[24];
extern const char* const RELS_ES[12];

const char* date_suffix_ES(int date);
