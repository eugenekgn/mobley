import { first, last } from 'lodash'
import DATA from '../DATA.js'
import {
  pickBaseSofa,
  pickBaseEndTable,
  pickBaseCoffeTable,
  pickBaseSideChair,
  pickBaseFloorLamp,
  buildBaseEnsureSelections
} from './baseSelectors'

import {
  pickPremiumSofa,
  pickPremiumSideChair,
  pickPremiumCoffeTable,
  pickPremiumEndTable,
  pickPremiumFloorLamp,
  buildPremiumEnsureSelections
} from './PremiumSelectors'

// constatns.js
const BUDGET = {
  base: 'base',
  premium: 'premium'
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

  console.log(sideChairs)
  return filters.budget === BUDGET.base ? first(sideChairs) : last(sideChairs);
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
    livingRoom = buildBaseEnsureSelections(livingRoom, filters, DATA);

  } else if (filters.budget === BUDGET.premium) {
    livingRoom = buildPremiumLivingroom(furniture, filters);
    livingRoom = buildPremiumEnsureSelections(livingRoom, filters, DATA);
  }

  if (livingRoom.sofa.textileColor === livingRoom.sideChair.textileColor) {
    const sofaColor = livingRoom.sofa.textileColor
    livingRoom.sideChair = {
      ...pickDiffColorChair(furniture, filters, sofaColor),
      message: 'side chair changed due to conflict with sofa color'
    }
  }



  return livingRoom;
};

export const filterLivingRooms = async (filters) => {
  const filetedResults = buildLivingroom(DATA, filters)
  const items = Object.values(filetedResults)

  const results = {
    data: items,
    count: items.length,
    totalPrice: getTotalPrice(items)
  }

  return new Promise(resolve => {
    setTimeout(() => {
      resolve(results)
    }, 200);
  });

}