import { isEmpty, get, first, last } from 'lodash'
import DATA from '../DATA.js'
import {
  pickBaseSofa,
  pickBaseEndTable,
  pickBaseCoffeTable,
  pickBaseSideChair,
  pickBaseFloorLamp,
  pickBaseSofaFiller,
  pickBaseSideChairFiller
} from './baseSelectors'
const BUDGET = {
  base: 'base',
  premium: 'premium'
}

const getRandom = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


const pickDiffColorChair = (furniture, filters, sofaColor) => {

  const sideChairs = furniture
    .filter(
      (m) =>
        m.type === "sideChair"
        && m.tone === filters.tone
        && m.textileColor !== sofaColor
    )
    .sort((a, b) => a.price - b.price);


  return filters.budget === BUDGET.base ? first(sideChairs) : sideChairs[Math.floor(Math.random() * sideChairs.length)];
};


const buildCheapestLivingroom = (furniture, filters) => {

  const livingRoom = {
    sofa: "",
    sideChair: "",
    coffeeTable: "",
    endTable: "",
    floorLamp: "",
  };

  livingRoom.sofa = pickBaseSofa(furniture, filters);
  livingRoom.sideChair = pickBaseSideChair(furniture, filters);
  livingRoom.coffeeTable = pickBaseCoffeTable(furniture, filters);
  livingRoom.endTable = pickBaseEndTable(furniture, filters);
  livingRoom.floorLamp = pickBaseFloorLamp(furniture, filters)

  return livingRoom
}


// utlis
const getTotalPrice = (livingRoom) => {
  return Object.values(livingRoom).reduce((total, current) => {
    if (current.price) {
      total += current.price
    }
    return total;
  }, 0)
}

const buildCheapestPlugInUnknowns = (livingRoom, filters) => {
  const modifiedLivingroom = {}
  for (const item in livingRoom) {

    const value = livingRoom[item]
    if (value.message) {
      switch (item) {
        case 'sofa':
          modifiedLivingroom[item] = { ...value, ...pickBaseSofaFiller(DATA, filters), }
          break;
        case 'sideChair':
          modifiedLivingroom[item] = { ...value, ...pickBaseSideChairFiller(DATA, filters) }
          break;
      }
    }
  }

  return { ...livingRoom, ...modifiedLivingroom }
}

const pickPremiumSofa = (furniture, filters) => {
  const sofas = furniture
    .filter((m) => m.type === "sofa"
      && m.tone === filters.tone
      && m.textileColor === filters.textileColor)
    .sort((a, b) => a.price - b.price)

  const randIndex = getRandom(0, sofas.length - 1);
  return sofas[randIndex] || { message: 'tone and color combination does not exist' }
};

const pickPremiumSideChair = (furniture, filters) => {

  const sideChairs = furniture
    .filter(
      (m) =>
        m.type === "sideChair"
        && m.tone === filters.tone
        && m.textileColor === filters.textileColor
    )
    .sort((a, b) => a.price - b.price);

  const randIndex = getRandom(0, sideChairs.length - 1);
  return sideChairs[randIndex] || { message: 'tone and color combination does not exist' }
}
const pickPremiumCoffeTable = (furniture, filters) => {
  const coffeTables = furniture
    .filter((m) => m.type === "coffeeTable"
      && m.tone === filters.tone
    )
    .sort((a, b) => a.price - b.price)

  const randIndex = getRandom(0, coffeTables.length - 1);
  return coffeTables[randIndex]
}
const pickPremiumEndTable = (furniture, filters) => {
  const endTables = furniture
    .filter((m) => m.type === "endTable"
      && m.tone === filters.tone)
    .sort((a, b) => a.price - b.price);

  return endTables[Math.floor(Math.random() * endTables.length)]
}
const pickPremiumFloorLamp = (furniture, filters) => {
  const floorLamps = furniture
    .filter((m) => m.type === "floorLamp"
      && m.tone === filters.tone
    )
    .sort((a, b) => a.price - b.price);

  return floorLamps[Math.floor(Math.random() * floorLamps.length)]
}

const buildPremiumLivingroom = (furniture, filters) => {
  const livingRoom = {
    sofa: "",
    sideChair: "",
    coffeeTable: "",
    endTable: "",
    floorLamp: "",
  };

  livingRoom.sofa = pickPremiumSofa(furniture, filters);
  livingRoom.sideChair = pickPremiumSideChair(furniture, filters);
  livingRoom.coffeeTable = pickPremiumCoffeTable(furniture, filters);
  livingRoom.endTable = pickPremiumEndTable(furniture, filters);
  livingRoom.floorLamp = pickPremiumFloorLamp(furniture, filters)

  return livingRoom
}

const buildLivingroom = (furniture, filters) => {
  let livingRoom = {}

  if (filters.budget === BUDGET.base) {
    livingRoom = buildCheapestLivingroom(furniture, filters);
    livingRoom = buildCheapestPlugInUnknowns(livingRoom, filters);
    console.log(livingRoom)
  } else if (filters.budget === BUDGET.premium) {
    livingRoom = buildPremiumLivingroom(furniture, filters);
  }



  //MUST BE HERE! fallback alg
  //base mod and cheapest mod 
  if (livingRoom.sofa.textileColor === livingRoom.sideChair.textileColor) {
    const sofaColor = livingRoom.sofa.textileColor
    livingRoom.sideChair = {
      ...pickDiffColorChair(furniture, filters, sofaColor),
      message: 'side chair changed due to conflict with sofa color'
    }
  }

  return livingRoom;
};

export const filterLivingRooms = async (reqFilters) => {

  const filters = {
    ...reqFilters,
    minBudget: reqFilters.budget === 'base' ? 90 : 115,
    maxBudget: reqFilters.budget === 'base' ? 115 : Infinity
  }

  console.log('client filters ', filters)
  const filetedResults = buildLivingroom(DATA, filters)

  const items = Object.values(filetedResults)

  const results = {
    data: items,
    count: items.length,
    totalPrice: getTotalPrice(items)
  }

  console.log(results)
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(results)
    }, 200);
  });

}