import { isEmpty, get, first } from 'lodash'
import { getTimeProps } from 'antd/lib/date-picker/generatePicker';

const DATA = [
  {
    type: "sofa",
    itemName: "Elia Reversible Sectional",
    textileColor: "grey",
    tone: "light",
    price: 72,
    image: 'https://cdn.shopify.com/s/files/1/2065/6315/products/sofa-and-seating-elia-reversible-sectional-1.jpeg?v=1571550686',
    link:
      "https://getmobley.com/collections/living-room-1/products/elia-reversible-sectional",
  },
  {
    type: "sofa",
    itemName: "Riva Sleeper sofa",
    textileColor: "grey",
    tone: "light",
    price: 64,
    image: 'https://cdn.shopify.com/s/files/1/2065/6315/products/RivaSleeperSofa.jpg?v=1583447570',
    link:
      "https://getmobley.com/collections/living-room-1/products/riva-sleeper-sofa",
  },
  {
    type: "sofa",
    itemName: "Oliver sofa",
    textileColor: "green",
    tone: "dark",
    price: 60,
    image: 'https://cdn.shopify.com/s/files/1/2065/6315/products/sofa-and-seating-oliver-sofa-1.jpeg?v=1571550686',
    link:
      "https://getmobley.com/collections/living-room-1/products/oliver-sofa",
  },
  {
    type: "sofa",
    itemName: "Zephyr sofa",
    textileColor: "blue",
    tone: "dark",
    price: 58,
    image: 'https://cdn.shopify.com/s/files/1/2065/6315/products/Mobley_Zephyr_Sofa_01.jpg?v=1571550692',
    link:
      "https://getmobley.com/collections/living-room-1/products/zephyr-sofa",
  },
  {
    type: "sofa",
    itemName: "Ali sofa",
    textileColor: "grey",
    tone: "light",
    price: 44,
    image: 'https://cdn.shopify.com/s/files/1/2065/6315/products/Ali_Sofa_1.jpg?v=1571550688',
    link: "https://getmobley.com/collections/living-room-1/products/ali-sofa",
  },
  {
    type: "sideChair",
    itemName: "Lydia Chair Set",
    textileColor: "grey",
    tone: "light",
    price: 36,
    image: 'https://cdn.shopify.com/s/files/1/2065/6315/products/Lydia.jpg?v=1583868361',
    link:
      "https://getmobley.com/collections/living-room-1/products/lydia-chair-set",
  },
  {
    type: "sideChair",
    itemName: "Arvo Chair",
    textileColor: "blue",
    tone: "dark",
    price: 33,
    image: 'https://cdn.shopify.com/s/files/1/2065/6315/products/side-chair-arvo-chair-1.jpeg?v=1571550687',
    link: "https://getmobley.com/collections/living-room-1/products/arvo-chair",
  },
  {
    type: "sideChair",
    itemName: "Vela Chair",
    textileColor: "grey",
    tone: "dark",
    price: 21,
    image: 'https://cdn.shopify.com/s/files/1/2065/6315/products/Vela_Chair_1.jpg?v=1571550693',
    link: "https://getmobley.com/collections/living-room-1/products/vela-chair",
  },
  {
    type: "sideChair",
    itemName: "Aril Chair",
    textileColor: "beige",
    tone: "light",
    price: 15,
    image: 'https://cdn.shopify.com/s/files/1/2065/6315/products/Aril_Chair_3.jpg?v=1571550693',
    link: "https://getmobley.com/collections/living-room-1/products/aril-chair",
  },
  {
    type: "coffeeTable",
    itemName: "Koen coffeeTable",
    textileColor: "",
    tone: "dark",
    price: 21,
    image: 'https://cdn.shopify.com/s/files/1/2065/6315/products/coffee-table-koen-coffee-table-2.jpeg?v=1571550685',
    link:
      "https://getmobley.com/collections/living-room-1/products/koen-coffee-table",
  },
  {
    type: "coffeeTable",
    itemName: "Svet coffeeTable",
    textileColor: "",
    tone: "dark",
    price: 17,
    image: 'https://cdn.shopify.com/s/files/1/2065/6315/products/coffee-table-svet-coffee-table-2.jpeg?v=1583420180',
    link:
      "https://getmobley.com/collections/living-room-1/products/svet-coffee-table",
  },
  {
    type: "coffeeTable",
    itemName: "Elia coffeeTable",
    textileColor: "",
    tone: "light",
    price: 14,
    image: 'https://cdn.shopify.com/s/files/1/2065/6315/products/coffee-table-elia-coffee-table-2.jpeg?v=1571550685',
    link:
      "https://getmobley.com/collections/living-room-1/products/elia-coffee-table",
  },
  {
    type: "endTable",
    itemName: "Acai End Table",
    textileColor: "",
    tone: "light",
    price: 15,
    image: 'https://cdn.shopify.com/s/files/1/2065/6315/products/end-table-acai-end-table-2.jpeg?v=1571550687',
    link:
      "https://getmobley.com/collections/living-room-1/products/acai-end-table",
  },
  {
    type: "endTable",
    itemName: "Velka End Table",
    textileColor: "",
    tone: "dark",
    price: 13,
    image: 'https://cdn.shopify.com/s/files/1/2065/6315/products/Velka2.jpg?v=1571550695',
    link:
      "https://getmobley.com/collections/living-room-1/products/velka-end-table",
  },
  {
    type: "endTable",
    itemName: "Svet End Table",
    textileColor: "",
    tone: "dark",
    price: 9,
    image: 'https://cdn.shopify.com/s/files/1/2065/6315/products/end-table-svet-end-table-1.jpeg?v=1571550685',
    link:
      "https://getmobley.com/collections/living-room-1/products/svet-end-table?variant=8009544695859",
  },
  {
    type: "floorLamp",
    itemName: "Tati Floor Lamp",
    textileColor: "",
    tone: "dark",
    price: 13,
    image: 'https://cdn.shopify.com/s/files/1/2065/6315/products/lighting-tati-floor-lamp-1.jpeg?v=1571550686',
    link:
      "https://getmobley.com/collections/living-room-1/products/tati-floor-lamp",
  },
  {
    type: "floorLamp",
    itemName: "Lian Arc Lamp",
    textileColor: "",
    tone: "light",
    price: 12,
    image: "https://cdn.shopify.com/s/files/1/2065/6315/products/lighting-lian-arc-lamp-1.jpeg?v=1571550686",
    link:
      "https://getmobley.com/collections/living-room-1/products/lian-arc-lamp",
  },
  {
    type: "floorLamp",
    itemName: "Vard Floor Lamp",
    textileColor: "",
    tone: "light",
    price: 10,
    image: 'https://cdn.shopify.com/s/files/1/2065/6315/products/Vard_Floor_Lamp_1.png?v=1571550686',
    link:
      "https://getmobley.com/collections/living-room-1/products/vard-floor-lamp",
  },
  {
    type: "floorLamp",
    itemName: "Mia Floor Lamp",
    textileColor: "",
    tone: "dark",
    price: 8,
    link: 'https://getmobley.com/collections/living-room-1/products/mia-floor-lamp',
    image:
      "https://cdn.shopify.com/s/files/1/2065/6315/products/lighting-mia-floor-lamp-1.jpeg?v=1571550686",
  },
];


const getRandom = (min, max) => {
  return min + Math.random() * (max - min);
}

const pickCheapestSofa = (furniture, filters) => {
  const sofas = furniture
    .filter((m) => m.type === "sofa"
      && m.tone === filters.tone
      && m.textileColor === filters.textileColor)
    .sort((a, b) => a.price - b.price)


  return first(sofas) || { error: 'tone and color combination does not exist' }
};

const pickCheapestSideChair = (furniture, filters) => {

  const sideChairs = furniture
    .filter(
      (m) =>
        m.type === "sideChair"
        && m.tone === filters.tone
        && m.textileColor === filters.textileColor
    )
    .sort((a, b) => a.price - b.price);


  return first(sideChairs) || { error: 'tone and color combination does not exist' }
};

const pickCheapestCoffeTable = (furniture, filters) => {
  const coffeTables = furniture
    .filter((m) => m.type === "coffeeTable"
      && m.tone === filters.tone
    )
    .sort((a, b) => a.price - b.price);

  return first(coffeTables)
};


const pickCheapestEndTable = (furniture, filters) => {
  const endTables = furniture
    .filter((m) => m.type === "endTable"
      && m.tone === filters.tone)
    .sort((a, b) => a.price - b.price);

  return first(endTables)
};

const pickCheapestFloorLamp = (furniture, filters) => {
  const floorLamps = furniture
    .filter((m) => m.type === "floorLamp"
      && m.tone === filters.tone
    )
    .sort((a, b) => a.price - b.price);

  return first(floorLamps)
};

const pickSofa = (filters) => {
  const sofas = DATA
    .filter((m) => m.type === "sofa")
    .sort((a, b) => a.price - b.price)


  return first(sofas)
};

const pickSideChair = (filters) => {

  const sideChairs = DATA
    .filter(
      (m) =>
        m.type === "sideChair"
    )
    .sort((a, b) => a.price - b.price);


  return sideChairs[Math.floor(Math.random() * sideChairs.length)];
};


const pickDiffColorChair = (furniture, tone, color) => {

  const sideChairs = furniture
    .filter(
      (m) =>
        m.type === "sideChair"
        && m.tone === tone
        && m.textileColor !== color
    )
    .sort((a, b) => a.price - b.price);


  return sideChairs[Math.floor(Math.random() * sideChairs.length)];
};


const buildCheapestLivingroom = (furniture, filters) => {

  const livingRoom = {
    sofa: "",
    sideChair: "",
    coffeeTable: "",
    endTable: "",
    floorLamp: "",
  };

  livingRoom.sofa = pickCheapestSofa(furniture, filters);
  livingRoom.sideChair = pickCheapestSideChair(furniture, filters);
  livingRoom.coffeeTable = pickCheapestCoffeTable(furniture, filters);
  livingRoom.endTable = pickCheapestEndTable(furniture, filters);
  livingRoom.floorLamp = pickCheapestFloorLamp(furniture, filters)

  return livingRoom
}


const getTotalPrice = (livingRoom) => {
  return Object.values(livingRoom).reduce((total, current) => {
    if (current.price) {
      total += current.price
    }
    return total;
  }, 0)
}

const buildLivingroom = (furniture, filters) => {
  let livingRoom = {}

  if (filters.budget === 'base') {


    livingRoom = buildCheapestLivingroom(furniture, filters);
    console.log('total firs ', getTotalPrice(livingRoom))

    //fill in the unknowns
    for (const item in livingRoom) {
      console.log(item)
      const value = livingRoom[item]
      console.log(value)
      if (value.error) {
        switch (item) {
          case 'sofa':
            livingRoom[item] = { ...pickSofa(filters), message: value.error }
            break;
          case 'sideChair':
            livingRoom[item] = { ...pickSideChair(filters), message: value.error }
            break;
        }
      }
    }

  } else {

  }

  // most effective way to do premium

  //MUST BE HERE! fallback alg 
  if (livingRoom.sofa.textileColor === livingRoom.sideChair.textileColor) {
    livingRoom.sideChair = {
      ...pickDiffColorChair(furniture, filters.tone, livingRoom.sofa.textileColor),
      message: 'Side Chair changes due to color'
    }
  }

  return livingRoom;
};

export const filterLivingRooms = async (reqFilters) => {

  const filters = {
    ...reqFilters,
    minBudget: reqFilters.budget === 'base' ? 90 : 115,
    maxBudget: reqFilters.budget === 'base' ? 90 : Infinity
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