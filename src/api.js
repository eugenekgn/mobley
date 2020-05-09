import { isEmpty } from 'lodash'

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


export const filterLivingRooms = async (filters) => {

  const filetedResults = DATA
    .filter(item => item.tone === filters.tone)
    .filter(item => isEmpty(item.textileColor) || item.textileColor === filters.textileColor)

  const results = {
    data: filetedResults,
    count: filetedResults.length,
    totalPrice: filetedResults.reduce((total, current) => total += current.price, 0) 
  }

  return new Promise(resolve => {
    setTimeout(() => {
      resolve(results)
    }, 200);
  });

}