export default class Helper {
    instance = null;

    static getInstance() {
        if (Helper.instance == null) {
            Helper.instance = new Helper;
        }
        return Helper.instance;
    }

    offer = {
      checkOfferTypes (account, deal, estate, object_living, object_commercy) {
        // квартира + собственник + агент
        if ((account == "owner" || account=="agent") && (deal == "sell" || deal == "rent_long" || deal == "rent_day") && (estate == "living" || estate == "commercy") && object_living == "apartment") {
          return {
            object: {
              inputs: {
                area: area_data,
                count_rooms: count_rooms_data,
                floor: floor_data,
                floorsHouse: floorsHouse_data
              },
              selects: {
                building_type: building_type_data,
                building_renovation: building_renovation_data
              }
            },
            price: {
              inputs: {
                price_mounth: price_mounth_data,
                deposit: deposit_data
              },
              selects: {
                prepayment: prepayment_data,
              }
            }
          };
        }
        // комната + собственник + агент
        else if ( (account == "owner" || account=="agent") && (deal == "sell" || deal == "rent_long" || deal == "rent_day") && (estate == "living" || estate == "commercy") && object_living == "room"){
          return {
            object: {
              inputs: {
                area: area_data,
                area_room: area_room_data,
                count_rooms: count_rooms_data,
                count_rooms_rent: count_rooms_rent_data,
                floor: floor_data,
                floorsHouse: floorsHouse_data
              },
              selects: {
                building_type: building_type_data,
                building_renovation: building_renovation_data
              }
            },
            price: {}
          };
        }
        // участок + собственник + агент
        else if ((account == "owner" || account=="agent") && (deal == "sell" || deal == "rent_long" || deal == "rent_day") && (estate == "living" || estate == "commercy") && object_living == "ground") {
          return {
            object: {
              inputs: {
                area_land: area_land_data,
              },
              selects: {
                ground_type: ground_type_data
              }
            },
            price: {}
          };
        }
        // дом + собственник + агент
        else if ((account == "owner" || account=="agent") && (deal == "sell" || deal == "rent_long" || deal == "rent_day") && (estate == "living" || estate == "commercy") && object_living == "house") {
          floorsHouse_data.max = 9
          return {
            object: {
              inputs: {
                area_house: area_house_data,
                area_land: area_land_data,
                count_rooms: count_rooms_data,
                floorsHouse: floorsHouse_data
              },
              selects: {
                building_type: building_type_data,
                building_renovation: building_renovation_data
              }
            },
            price: {}
          };
        }


        if ((account == "owner" || account=="agent") && (deal == "sell" || deal == "rent_long" || deal == "rent_day") && (estate == "living" || estate == "commercy") && object_commercy == "office") {
          return {
            object: {
              inputs: {
                area: area_data,
              },
              selects: {
                office_type: office_type_data,
              }
            },
            price: {}
          };
        }
        else if ((account == "owner" || account=="agent") && (deal == "sell" || deal == "rent_long" || deal == "rent_day") && (estate == "living" || estate == "commercy") && object_commercy == "garage") {
          return {
            object: {
              inputs: {
                area_land: area_land_data,
              },
              selects: {
                ground_type: ground_type_data
              }
            },
            price: {}
          };
        }
      }
    }
}

const area_data = { title: 'Общая площадь', value: null, min: 1, max: 100000}
const area_room_data = { title: "Площадь комнаты", value: null, min: 1, max: 200 }
const area_land_data = { title: "Площадь участка (соток)", value: null, min: 1, max: 10000 }
const area_house_data = { title: "Площадь дома", value: null, min: 1, max: 10000 }

const count_rooms_data = { title: "Общее количество комнат", value: null, min: 1, max: 100 }
const count_rooms_rent_data = { title: "Количество комнат в аренду", value: null, min: 1, max: 100 }

const floor_data = { title: "Этаж", value: null, min: 1, max: 200 }
const floorsHouse_data = { title: "Этажей в доме", value: null, min: 1, max: 200 }

const office_type_data = {
  title: "Тип помещения",
  value: "shop",
  data: [
    {
      value: "office",
      label: "Офис"
    },
    {
      value: "garage",
      label: "Гараж"
    },
    {
      value: "warehouse",
      label: "Склад"
    },
    {
      value: "premisessFreeAppointment",
      label: "Помещения свободного назначения"
    },
    {
      value: "smallArchitecturalForms",
      label: "Малые архитектурные формы"
    },
    {
      value: "productionPremises",
      label: "Производственное помещение"
    },
    {
      value: "shop",
      label: "Магазин"
    },
    {
      value: "restaurant",
      label: "Общепит"
    },
    {
      value: "salon",
      label: "Салон"
    },
    {
      value: "recreationСenter",
      label: "База отдыха"
    },
    {
      value: "healthСare",
      label: "Здравоохранение"
    },
    {
      value: "service",
      label: "Сервис"
    },
    {
      value: "sport",
      label: "Спорткомплекс"
    }
  ]
}

const building_type_data = {
  title: "Тип застройки",
  value: "newBuilding",
  data: [
    {
      value: "newBuilding",
      label: "Новостройка"
    },
    {
      value: "secondaryBuilding",
      label: "Вторичный рынок"
    }
  ]
}

const building_renovation_data = {
  title: "Ремонт",
  value: "cosmetic",
  data: [
    {
      value: "cosmetic",
      label: "Косметический"
    },
    {
      value: "euro",
      label: "Евро"
    },
    {
      value: "design",
      label: "Дизайнерский"
    },
    {
      value: "without",
      label: "Без ремонта"
    }
  ]
}

const ground_type_data = {
  title: "Статус участка",
  value: "farm",
  data: [
    {
      value: "farm",
      label: "Фермерское хоз-во"
    },
    {
      value: "subsidiaryFarm",
      label: "Личное подсобное хозяйство"
    },
    {
      value: "secondaryBuilding",
      label: "Садоводство"
    },
    {
      value: "individualСonstruction",
      label: "ИЖС"
    },
    {
      value: "industrialDestination",
      label: "Земля промназначения"
    },
    {
      value: "nonProfitPartnership",
      label: "ДНП"
    }
  ]
}



const price_mounth_data = { title: 'Арендная плата в месяц', value: 1 }
const price_day_data = { title: 'Арендная плата в сутки', value: 1 }
const deposit_data = { title: 'Залог', value: 1 }
const prepayment_data = {
  title: 'Предоплата',
  value: 'prpt_one',
  data: [
    {
      value: "prpt_one",
      label: "1 месяц"
    },    {
      value: "prpt_two",
      label: "2 месяца"
    },    {
      value: "prpt_three",
      label: "3 месяца"
    },    {
      value: "prpt_four",
      label: "4 месяца"
    },    {
      value: "prpt_five",
      label: "5 месяцев"
    },    {
      value: "prpt_six",
      label: "6 месяцев"
    },    {
      value: "prpt_seven",
      label: "7 месяцев"
    },    {
      value: "prpt_eight",
      label: "8 месяцев"
    },    {
      value: "prpt_nine",
      label: "9 месяцев"
    },    {
      value: "prpt_ten",
      label: "10 месяцев"
    },    {
      value: "prpt_eleven",
      label: "11 месяцев"
    },    {
      value: "prpt_year",
      label: "1 год"
    }
  ]
}
