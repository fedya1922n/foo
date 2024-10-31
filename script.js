const timer = document.querySelector(".timer__count");

function counter(i = 0) {
    timer.innerHTML = i;
    i++;
    let speed = 0;
    if (i < 50) {
        speed = 20;
    } else if (i > 49 && i < 75) {
        speed = 50;
    } else if (i > 74 && i < 85) {
        speed = 80;
    } else if (i > 84 && i < 95) {
        speed = 100;
    } else {
        speed = 120;
    }
    if (i <= 100) {
        setTimeout(() => {
            counter(i)
        }, speed);
    }
}
counter() //ТАЙМЕР

const view = document.querySelector(".view");
const viewClose = document.querySelector(".view__close");
const viewImg = view.querySelector("img");
const mainContent = document.querySelectorAll(".main__content");
mainContent.forEach((val) => {
    val.addEventListener("dblclick", function () {
        changeImg(this);
    })
})
function changeImg(elem) {
    view.classList.add("active");
    const img = elem.querySelector("img");
    let path = img.getAttribute("src");
    viewImg.setAttribute("src", path);
}
viewClose.addEventListener("click", function () {
    view.classList.remove("active")
}) //Модальное окно

const products = {
    plainBurger: {
        name: "Простой гамбургер",
        price: 10000,
        kcall: 400,
        amount: 0,
        get totalSum() {
            return this.amount * this.price;
        },
        get totalkcall() {
            return this.amount * this.kcall;
        }
    },
    freshBurger: {
        name: "Гамбургер FRESH",
        price: 20500,
        kcall: 500,
        amount: 0,
        get totalSum() {
            return this.amount * this.price;
        },
        get totalkcall() {
            return this.amount * this.kcall;
        }
    },
    freshCombo: {
        name: "FRESH COMBO",
        price: 31900,
        kcall: 700,
        amount: 0,
        get totalSum() {
            return this.amount * this.price;
        },
        get totalkcall() {
            return this.amount * this.kcall;
        }
    }
};

const extraProduct = {
    doubleMayonnaise: {
        name: "Двойной майонез",
        price: 500,
        kcall: 50,
    },
    lettuce: {
        name: "Салатный лист",
        price: 300,
        kcall: 10,
    },
    cheese: {
        name: "Сыр",
        price: 300,
        kcall: 30,
    }
} //доп продукты

const updatePriceAndCalories = (product, section) => {
    const totalSumElem = section.querySelector('.main__price span');
    const totalKcallElem = section.querySelector('.main__kcall span');

    let totalPrice = product.totalSum;
    let totalKcall = product.totalkcall;

    const extraInputs = section.querySelectorAll('.main__input:checked');
    extraInputs.forEach(input => {
        const extraKey = input.getAttribute('data-extra');
        totalPrice += extraProduct[extraKey].price * product.amount;
        totalKcall += extraProduct[extraKey].kcall * product.amount;
    });

    totalSumElem.textContent = totalPrice;
    totalKcallElem.textContent = totalKcall;
};

const handleAmountChange = (productKey, section, increment) => {
    const product = products[productKey];
    const countElem = section.querySelector('.main__count');
    product.amount = Math.max(0, product.amount + increment);
    countElem.textContent = product.amount;
    updatePriceAndCalories(product, section);
};

document.querySelectorAll('.main__product').forEach(section => {
    const productKey = section.id;
    const minusBtn = section.querySelector('.main__btn[data-symbol="-"]');
    const plusBtn = section.querySelector('.main__btn[data-symbol="+"]');

    minusBtn.addEventListener('click', () => handleAmountChange(productKey, section, -1));
    plusBtn.addEventListener('click', () => handleAmountChange(productKey, section, 1));

    const extraInputs = section.querySelectorAll('.main__input');
    extraInputs.forEach(input => {
        input.addEventListener('change', () => updatePriceAndCalories(products[productKey], section));
    });
}); 
