#pragma once
#include "strings-en_US.h"

#define DAYS_CA        DAYS_EN_US
#define MONTHS_CA     MONTHS_EN_US
#define DATE_FORMAT_CA "$1  $2 $3 "

extern const char* const HOURS_CA[24];
extern const char* const RELS_CA[12];

const char* date_suffix_CA(int date);
