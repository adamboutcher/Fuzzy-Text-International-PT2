#include "strings-pt.h"

const char* const HOURS_PT[] = {
  /* AM */
  "meia noite", "uma", "duas", "três",
  "quatro", "cinco", "seis", "sete",
  "oito", "nove", "dez", "onze",
  /* PM */
  "meio dia", "uma", "duas", "três",
  "quatro", "cinco", "seis", "sete",
  "oito", "nove", "dez", "onze"
};

/* $1 = current hour, $2 = next hour, * = bold */
const char* const RELS_PT[] = {
  "*$1 em ponto",
  "*$1 e cinco",
  "*$1 e dez",
  "*$1 e quinze",
  "*$1 e vinte",
  "*$1 e vinte e cinco",
  "*$1 e meia",
  "*$1 e trinta e cinco",
  "vinte pras *$2",
  "quinze pras *$2",
  "dez pras *$2",
  "cinco pras *$2"
};
