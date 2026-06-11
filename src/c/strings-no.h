#pragma once
#include "strings-en_US.h"

#define DAYS_NO        DAYS_EN_US
#define MONTHS_NO     MONTHS_EN_US
#define DATE_FORMAT_NO "$1  $2 $3 "

extern const char* const HOURS_NO[24];
extern const char* const RELS_NO[12];

const char* date_suffix_NO(int date);
