#pragma once

extern const char* const HOURS_DE[24];
extern const char* const RELS_DE[12];
extern const char* const MONTHS_DE[12];
extern const char* const DAYS_DE[7];
extern const char DATE_FORMAT_DE[];

const char* date_suffix_DE(int date);

extern const char* const RELS_DE2[12];

#define HOURS_DE2        HOURS_DE
#define MONTHS_DE2       MONTHS_DE
#define DAYS_DE2         DAYS_DE
#define DATE_FORMAT_DE2  DATE_FORMAT_DE
#define date_suffix_DE2  date_suffix_DE
