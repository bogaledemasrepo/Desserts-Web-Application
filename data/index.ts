const data =  [
  {
    id:"1",
    thumbnail: "/assets/images/image-waffle-thumbnail.jpg",
    images:["/assets/images/image-waffle-mobile.jpg",],
    name: "Waffle with Berries",
    summary: "Delicious waffle topped with fresh berries and syrup",
    description:"Delicious waffle topped with fresh berries and syrup",
    category: "Waffle",
    price: 6.5,
  },
  {
    id:"2",
    image: {
      thumbnail: "/assets/images/image-creme-brulee-thumbnail.jpg",
      mobile: "/assets/images/image-creme-brulee-mobile.jpg",
      tablet: "/assets/images/image-creme-brulee-tablet.jpg",
      desktop: "/assets/images/image-creme-brulee-desktop.jpg",
    },
    name: "Vanilla Bean Crème Brûlée",
    description:"Classic French dessert with a creamy custard base and caramelized sugar top",
    category: "Crème Brûlée",
    price: 7,
  },
  {
    id:"3",
    image: {
      thumbnail: "/assets/images/image-macaron-thumbnail.jpg",
      mobile: "/assets/images/image-macaron-mobile.jpg",
      tablet: "/assets/images/image-macaron-tablet.jpg",
      desktop: "/assets/images/image-macaron-desktop.jpg",
    },
    name: "Macaron Mix of Five",
    description:"Assorted flavors of delicate French macarons",
    category: "Macaron",
    price: 8,
  },
  {
    id:"4",
    image: {
      thumbnail: "/assets/images/image-tiramisu-thumbnail.jpg",
      mobile: "/assets/images/image-tiramisu-mobile.jpg",
      tablet: "/assets/images/image-tiramisu-tablet.jpg",
      desktop: "/assets/images/image-tiramisu-desktop.jpg",
    },
    name: "Classic Tiramisu",
    description:"Traditional Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream",
    category: "Tiramisu",
    price: 5.5,
  },
  {
  id:"5",
    image: {
      thumbnail: "/assets/images/image-baklava-thumbnail.jpg",
      mobile: "/assets/images/image-baklava-mobile.jpg",
      tablet: "/assets/images/image-baklava-tablet.jpg",
      desktop: "/assets/images/image-baklava-desktop.jpg",
    },
    name: "Pistachio Baklava",
    description:"Sweet pastry made of layers of filo filled with chopped pistachios and honey",
    category: "Baklava",
    price: 4,
  },
  {
    id:"6", 
    image: {
      thumbnail: "/assets/images/image-meringue-thumbnail.jpg",
      mobile: "/assets/images/image-meringue-mobile.jpg",
      tablet: "/assets/images/image-meringue-tablet.jpg",
      desktop: "/assets/images/image-meringue-desktop.jpg",
    },
    name: "Lemon Meringue Pie",
    description:"Tangy lemon filling topped with fluffy meringue in a crisp pie crust",
    category: "Pie",
    price: 5,
  },
  {
    id:"7",
    image: {
      thumbnail: "/assets/images/image-cake-thumbnail.jpg",
      mobile: "/assets/images/image-cake-mobile.jpg",
      tablet: "/assets/images/image-cake-tablet.jpg",
      desktop: "/assets/images/image-cake-desktop.jpg",
    },
    name: "Red Velvet Cake",
    description:"Moist red velvet layers with cream cheese frosting",
    category: "Cake",
    price: 4.5,
  },
  {
    id:"8",
    image: {
      thumbnail: "/assets/images/image-brownie-thumbnail.jpg",
      mobile: "/assets/images/image-brownie-mobile.jpg",
      tablet: "/assets/images/image-brownie-tablet.jpg",
      desktop: "/assets/images/image-brownie-desktop.jpg",
    },
    name: "Salted Caramel Brownie",
    description:"Rich chocolate brownie topped with salted caramel sauce",
    category: "Brownie",
    price: 4.5,
  },
  {
    id:"9",
    image: {
      thumbnail: "/assets/images/image-panna-cotta-thumbnail.jpg",
      mobile: "/assets/images/image-panna-cotta-mobile.jpg",
      tablet: "/assets/images/image-panna-cotta-tablet.jpg",
      desktop: "/assets/images/image-panna-cotta-desktop.jpg",
    },
    name: "Vanilla Panna Cotta",
    description:"Creamy Italian dessert made with sweetened cream and vanilla",
    category: "Panna Cotta",
    price: 6.5,
  },
];


export default data

export const MOCK_ORDERS = [
  {
    id: "ord_12345",
    created_at: new Date().toISOString(),
    status: "completed",
    total_amount_cents: 4500,
    items: [{ name: "Chocolate Lava Cake", quantity: 2 }, { name: "Macarons", quantity: 5 }]
  },
  {
    id: "ord_67890",
    created_at: new Date(Date.now() - 86400000).toISOString(),
    status: "processing",
    total_amount_cents: 2200,
    items: [{ name: "Strawberry Tart", quantity: 1 }]
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};