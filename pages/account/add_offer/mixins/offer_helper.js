export default class Helper {
  instance = null;

  static getInstance() {
    if (Helper.instance == null) {
      Helper.instance = new Helper();
    }
    return Helper.instance;
  }

  offer = {
    checkOfferTypes(account, deal, estate, object_living, object_commercy) {
      // квартира + собственник + агент
      return {
        object: {
          inputs: {
            area:
              object_living == "apartment" ||
              object_living == "room" ||
              object_commercy == "office"
                ? area_data
                : null,
            area_room: object_living == "room" ? area_room_data : null,
            area_land:
              object_living == "ground" || object_living == "house"
                ? area_land_data
                : null,
            area_house: object_living == "house" ? area_house_data : null,
            area_building:
              object_commercy == "building" ? area_building_data : null,
            count_rooms:
              object_living == "apartment" ||
              object_living == "house" ||
              object_living == "room"
                ? count_rooms_data
                : null,
            count_rooms_rent:
              object_living == "room" ? count_rooms_rent_data : null,
            floor:
              object_living == "apartment" || object_living == "room"
                ? floor_data
                : null,
            floorsHouse:
              object_living == "apartment" ||
              object_living == "house" ||
              object_living == "room"
                ? floors_house_data
                : null,
            floors_building:
              object_commercy == "building" ? floors_building_data : null
          },
          selects: {
            office_type: object_commercy == "office" ? office_type_data : null,
            building_type:
              object_living == "apartment" || object_living == "room"
                ? building_type_data
                : null,
            building_renovation:
              object_living == "apartment" ||
              object_living == "house" ||
              object_living == "room"
                ? building_renovation_data
                : null,
            ground_type:
              object_living == "ground" || object_living == "house"
                ? ground_type_data
                : null,
            cities: cities_data
          }
        },
        price: {
          inputs: {
            price: deal == "sell" ? price_data : null,
            price_mounth: deal == "rent_long" ? price_mounth_data : null,
            price_day: deal == "rent_day" ? price_day_data : null,
            percentageTransaction:
              account == "agent" ? percentageTransaction_data : null,
            deposit: deal == "rent_long" ? deposit_data : null
          },
          selects: {
            type_sell: deal == "sell" ? type_sell_data : null,
            prepayment: deal == "rent_long" ? prepayment_data : null,
            for_who:
              deal == "rent_long" || deal == "rent_day" ? for_who_data : null
          }
        }
      };
    }
  };
}

const area_data = { title: "Общая площадь", value: null, min: 1, max: 100000 };
const area_room_data = {
  title: "Площадь комнаты",
  value: null,
  min: 1,
  max: 200
};
const area_land_data = {
  title: "Площадь участка",
  value: null,
  min: 1,
  max: 100000
};
const area_house_data = {
  title: "Площадь дома",
  value: null,
  min: 1,
  max: 10000
};
const area_building_data = {
  title: "Площадь здания",
  value: null,
  min: 1,
  max: 200000
};

const count_rooms_data = {
  title: "Общее количество комнат",
  value: null,
  min: 1,
  max: 100
};
const count_rooms_rent_data = {
  title: "Количество комнат в аренду",
  value: null,
  min: 1,
  max: 100
};

const floor_data = { title: "Этаж", value: null, min: 1, max: 200 };
const floors_house_data = {
  title: "Этажей в доме",
  value: null,
  min: 1,
  max: 200
};
const floors_building_data = {
  title: "Этажей в зданиие",
  value: null,
  min: 1,
  max: 100
};

const cities_data = {
  title: "Выберите город",
  value: "dushanbe",
  data: [
    {
      value: "dushanbe",
      label: "Душанбе"
    },
    {
      value: "Hudzhand",
      label: "Худжанд"
    },
    {
      value: "AburahmoniDzhomi",
      label: "Абдурахмони Джоми"
    },
    {
      value: "Aini",
      label: "Айни"
    },
    {
      value: "Asht",
      label: "Ашт"
    },
    {
      value: "Baldzhuvan",
      label: "Бальджуван"
    },
    {
      value: "BobdjonGafurov",
      label: "Бободжон Гафуров"
    },
    {
      value: "Bohtar",
      label: "Бохтар (Курган-Тюбе)"
    },
    {
      value: "Buston",
      label: "Бустон (Чкаловск)"
    },
    {
      value: "Vanzh",
      label: "Вандж"
    },
    {
      value: "Varzob",
      label: "Варзоб"
    },
    {
      value: "Vahdat",
      label: "Вахдат"
    },
    {
      value: "Vash",
      label: "Вахш"
    },
    {
      value: "Vose",
      label: "Восе"
    },
    {
      value: "Gissar",
      label: "Гиссар"
    },
    {
      value: "GornayaMatcha",
      label: "Горная Матча"
    },
    {
      value: "Guliston",
      label: "Гулистон (Кайраккум)"
    },
    {
      value: "Dangara",
      label: "Дангара"
    },
    {
      value: "Devashtich",
      label: "Деваштич (Ганчи)"
    },
    {
      value: "DzhaborRasulov",
      label: "Джаббор Расулов"
    },
    {
      value: "Dzhaihun",
      label: "Джайхун (Кумсангир)"
    },
    {
      value: "DzhaloliddinaBalhi",
      label: "Джалолиддина Балхи (Руми)"
    },
    {
      value: "Dzhami",
      label: "Джами"
    },
    {
      value: "Dusti",
      label: "Дусти (Джиликуль)"
    },
    {
      value: "Zafarbad",
      label: "Зафарабад"
    },
    {
      value: "Istaravshan",
      label: "Истаравшан"
    },
    {
      value: "Istiklol",
      label: "Истиклол"
    },
    {
      value: "Isfara",
      label: "Исфара"
    },
    {
      value: "Ishkamshim",
      label: "Ишкашим"
    },
    {
      value: "Kabodien",
      label: "Кабодиён"
    },
    {
      value: "Kanibadam",
      label: "Канибадам"
    },
    {
      value: "Kulyab",
      label: "Куляб"
    },
    {
      value: "Kushonien",
      label: "Кушониён (Бохтар)"
    },
    {
      value: "Lahsh",
      label: "Лахш (Джиргиталь)"
    },
    {
      value: "Levakand",
      label: "Леваканд (Сарбанд)"
    },
    {
      value: "Matcha",
      label: "Матча"
    },
    {
      value: "Muminabad",
      label: "Муминабад"
    },
    {
      value: "Murgab",
      label: "Мургаб"
    },
    {
      value: "Nosiri Husrav",
      label: "Носири Хусрав"
    },
    {
      value: "Nurabad",
      label: "Нурабад"
    },
    {
      value: "Nurek",
      label: "Нурек"
    },
    {
      value: "Pendjakent",
      label: "Пенджикент"
    },
    {
      value: "Pyandzh",
      label: "Пяндж"
    },
    {
      value: "Rasht",
      label: "Рашт"
    },
    {
      value: "Rogun",
      label: "Рогун"
    },
    {
      value: "Roshtkala",
      label: "Рошткала"
    },
    {
      value: "Rudaki",
      label: "Рудаки"
    },
    {
      value: "Rushan",
      label: "Рушан"
    },
    {
      value: "Sangvor",
      label: "Сангвор (Тавильдара)"
    },
    {
      value: "Spitamen",
      label: "Спитамен"
    },
    {
      value: "Tadzhikabad",
      label: "Таджикабад"
    },
    {
      value: "Temurmalik",
      label: "Темурмалик"
    },
    {
      value: "Tursunzade",
      label: "Турсунзаде"
    },
    {
      value: "Faizabad",
      label: "Файзабад"
    },
    {
      value: "Farhor",
      label: "Фархор"
    },
    {
      value: "Hamadani",
      label: "Хамадани"
    },
    {
      value: "Hovaling",
      label: "Ховалинг"
    },
    {
      value: "Horog",
      label: "Хорог"
    },
    {
      value: "Huroson",
      label: "Хуросон"
    },
    {
      value: "ShamsiddinShohin",
      label: "Шамсиддин Шохин (Шуроабад)"
    },
    {
      value: "Shahrinav",
      label: "Шахринав"
    },
    {
      value: "Shariston",
      label: "Шахристон"
    },
    {
      value: "Shahritus",
      label: "Шахритус"
    },
    {
      value: "Shugan",
      label: "Шугнан"
    },
    {
      value: "Yavan",
      label: "Яван"
    }
  ]
};

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
};

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
};

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
};

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
};

const percentageTransaction_data = {
  title: "Процент от сделки агенту",
  value: null,
  suffix: "%"
};
const price_data = { title: "Цена", value: null, suffix: "сомони" };
const price_mounth_data = {
  title: "Арендная плата в месяц",
  value: null,
  suffix: "сомони"
};
const price_day_data = {
  title: "Арендная плата в сутки",
  value: null,
  suffix: "сомони"
};
const deposit_data = { title: "Залог", value: null, suffix: "сомони" };
const type_sell_data = {
  title: "Тип продажи",
  value: "freeSell",
  data: [
    {
      value: "freeSell",
      label: "Свободная продажа"
    },
    {
      value: "mortgage",
      label: "Возможна ипотека"
    },
    {
      value: "credit",
      label: "Возможен кредит"
    }
  ]
};
const for_who_data = {
  title: "Состав съемщиков",
  value: "any",
  data: [
    {
      value: "any",
      label: "Любой"
    },
    {
      value: "family",
      label: "Семья"
    },
    {
      value: "woman",
      label: "Женщина"
    },
    {
      value: "man",
      label: "Мужчина"
    }
  ]
};
const prepayment_data = {
  title: "Предоплата",
  value: "prpt_one",
  data: [
    {
      value: "prpt_one",
      label: "1 месяц"
    },
    {
      value: "prpt_two",
      label: "2 месяца"
    },
    {
      value: "prpt_three",
      label: "3 месяца"
    },
    {
      value: "prpt_four",
      label: "4 месяца"
    },
    {
      value: "prpt_five",
      label: "5 месяцев"
    },
    {
      value: "prpt_six",
      label: "6 месяцев"
    },
    {
      value: "prpt_seven",
      label: "7 месяцев"
    },
    {
      value: "prpt_eight",
      label: "8 месяцев"
    },
    {
      value: "prpt_nine",
      label: "9 месяцев"
    },
    {
      value: "prpt_ten",
      label: "10 месяцев"
    },
    {
      value: "prpt_eleven",
      label: "11 месяцев"
    },
    {
      value: "prpt_year",
      label: "1 год"
    }
  ]
};
