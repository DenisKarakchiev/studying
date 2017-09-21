const TAXES = 0.5;

let phonePrice      = 400;
let myMoney         = 2500;
let expectations    = 1400; // how much would i spend
let accesoriesPrice = 110;

//calc total price with taxes
function priceNTax(price) {
  return price + (price * TAXES);
}

//keep purchasing phones until run of money
function buyPhones(money) {
  let purchaseAmount = 0;

  while (money > 0) {

    if (money - priceNTax(phonePrice) > 0) {
      money -= priceNTax(phonePrice);
      purchaseAmount += priceNTax(phonePrice);

      if (purchaseAmount < expectations) {
        money -= accesoriesPrice;
        purchaseAmount += accesoriesPrice;
      } else return '$' + String(purchaseAmount);
    } else return '$' + String(purchaseAmount);
  }

  return '$' + String(purchaseAmount);
}

console.log(buyPhones(myMoney));

//if purchase amount < expectations - buy accessories for each phone
//when purchase amoun === expectations -> format and print purcase amount

