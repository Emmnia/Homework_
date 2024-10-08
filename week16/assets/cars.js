const brandChoice = document.forms.form1.elements.brand;
const makeChoice = document.forms.form1.elements.make;
const fuelChoice = document.forms.form1.elements.fuel;
const ageChoice = document.forms.form1.elements.age;
const ownersChoice = document.forms.form1.elements.owners;
const paymentChoice = document.forms.form1.elements.payment;
const owners = document.querySelector('.owners-container');
const makes = Array.from(document.querySelectorAll(".make"));
const fuel = Array.from(document.querySelectorAll(".fuel"));
const engine = document.forms.form1.elements.engine;
const volume = document.querySelector("#volume");;
const total = document.querySelector("#total");
const orderBrand = document.querySelector("#order_brand");
const orderMake = document.querySelector("#order_make");
const orderEngine = document.querySelector("#order_engine");
const orderFuel = document.querySelector("#order_fuel");
const orderAge = document.querySelector("#order_age");
const orderPayment = document.querySelector("#order_payment");

owners.style.display = 'none';

const makeList = () => {
  switch (brandChoice.value) {
    case 'Renault':
      makeChoice.innerHTML = '<option class="make" id="rafale" value="Rafale">Rafale</option><option class="make" id="express" value="Express">Express</option><option class="make" id="megane" value="Megane E-Tech">Megane E-Tech</option><option class="make" id="arkana" value="Arkana">Arkana</option>';
    break;
    case 'Opel':
      makeChoice.innerHTML = '<option class="make" id="zafira" value="Zafira Life">Zafira Life</option><option class="make" id="grandland" value="Grandland">Grandland</option><option class="make" id="combo" value="Combo">Combo</option><option class="make" id="vivaro" value="Vivaro">Vivaro</option>';
    break;
    case 'Mazda':
      makeChoice.innerHTML = '<option class="make" id="CX30" value="CX-30">CX-30</option><option class="make" id="CX5" value="CX-5">CX-5</option><option class="make" id="CX60" value="CX-60">CX-60</option><option class="make" id="six" value="6">6</option>';
    break;
    case 'Jaguar':
      makeChoice.innerHTML = '<option class="make" id="epace" value="E-Pace">E-Pace</option><option class="make" id="XE" value="XE">XE</option><option class="make" id="fpace" value="F-Pace">F-Pace</option><option class="make" id="XF" value="XF">XF</option>';
    break;
    default:
      makeChoice.innerHTML = '<option class="make" value="default">-модель-</option>';
  }
}

brandChoice.addEventListener('click', () => {
  makeList();
  orderUpdate();
});

makes.forEach((make) => {
  make.addEventListener("change", updatePrice);
});

makeChoice.addEventListener('change', orderUpdate);

fuelChoice.addEventListener('change', orderUpdate);

ageChoice.addEventListener('change', () => {
  if (ageChoice.value === '3') {
  owners.style.display = 'block';
  }
  orderUpdate();
})

paymentChoice.addEventListener('change', orderUpdate);

engine.addEventListener('input', engineUpdate);

fuel.forEach((el) => {
  el.addEventListener("click", fuelUpdate);
});

function fuelUpdate(e) {
  currentSet.fuel = e.target.id;
  updatePrice();
  orderUpdate();
}

function engineUpdate() {
  currentSet.engine = engine.value;
  volume.value = currentSet.engine;
  updatePrice();
  orderUpdate();
}

function makeUpdate() {
  updatePrice();
  orderUpdate();
}

function updatePrice() {
  let makePrice = currentSet.getMakePrice();
  let fuelPrice = currentSet.getFuelPrice();
  let totalPrice
  if (paymentChoice.value === 'cash') {
    totalPrice = currentSet.engine * fuelPrice + makePrice;
  } else if (paymentChoice.value === 'card') {
    totalPrice = (currentSet.engine * fuelPrice + makePrice) * 0.9;
  } else {
    totalPrice = currentSet.engine * fuelPrice + makePrice + (currentSet.engine * fuelPrice + makePrice) * 0.03;
  }
  total.value = totalPrice;
}

function orderUpdate() {
  orderBrand.textContent = brandChoice.value;
  orderMake.textContent = makeChoice.value;
  orderFuel.textContent = fuelChoice.value;
  orderEngine.textContent = engine.value + " литра";
  orderAge.textContent = ageChoice.value;
  orderPayment.textContent = paymentChoice.value;
}

const priceInfo = {
  make: {
    CX30: 3750000,
    CX5: 3100000,
    CX60: 6863800,
    six: 3690000,
    rafale:	7600000,
    express: 3130000,
    megane:	4489000,
    arkana:	1078000,
    zafira:	3050000,
    grandland: 1310000,
    combo: 122000, 
    vivaro:	650000,
    epace: 2145000,
    XE:	1395900,
    fpace: 2050000,
    XF: 745000,
  },
  fuel: {
    gasoline: 51.4,
    diesel: 58.3,
    gas: 22.49,
    electro: 20,
  },
};

let currentSet = {
  make: "CX30",
  engine: 2,
  fuel: "gas",
  getMakePrice() {
    return priceInfo.make[this.make];
  },
  getFuelPrice() {
    return priceInfo.fuel[this.fuel];
  },
};



// Используя JavaScript, добавьте обработчик события изменения (change) для каждого элемента калькулятора:
// Создайте функцию calculatePrice(), которая будет вызываться при изменении любого элемента калькулятора
// В функции calculatePrice(), получите значения выбранных элементов (марка, модель, тип топлива, объем двигателя, состояние автомобиля, количество владельцев, способ оплаты)
// Используя полученные значения, расчетом определите стоимость автомобиля в зависимости от выбранных параметров
// Обновите отображение стоимости на странице
// Обработка ошибок и отображение соответствующих сообщений при некорректном вводе данных