// ! formu secicez formumuzu submitle olusturmusuz. html de formu aldik varblahalini getrdik.
const form = document.querySelector("form");
const section = document.querySelector(".section");
const inputValue = document.getElementById("input");
const API_KEY = "coinranking1c7b3e0f2985b989c1b5126b300468f9a38c9fc1fac9f0f9";

const URL = `https://api.coinranking.com/v2/coins?api_key=${API_KEY}`;
let coins = [];
// ! dolar storla degisken aliyoruz.

form.addEventListener("submit", (e) => {
  e.preventDefault(); //! neden prevent default? refresh i engelliyor. sayfanin surekli engellenmesini engelliyor.
  getCoin(); //! fonksiyonu asagida yazdik, burda cagirdik bil girilen bilgiyi cagirmak icin.
});

// !datayi cekicez.
const getCoin = async () => {
  //! async kullandin cunku api kullaniiyouz. apiler async olarak calisir. sync olarak CALISMAZ.

  try {
    const response = await fetch(URL); //! await yazamassak hata verir.
    if (!response.ok) {
      // ! eger res hata verirse;
      throw new Error("Bulunamadi.");
    }
    //!gelen cevabi json ile gosterir. daha rahat islem yapabilmek icin.
    const data = await response.json();
    // console.log(data);
    domaYaz(data);
  } catch (err) {
    console.log(err);
  }
};

// ! bir fonk olusturacagiz. figure caption. VERI

const domaYaz = (veri) => {
  // console.log(veri);

  console.log(veri.data.coins);
  let obj = veri.data.coins.filter((element) => {
    //! kullanicinin girdigi dgerler elementin
    return (
      element.name.toLowerCase().trim() ===
        inputValue.value.toLowerCase().trim() ||
      element.symbol.toLowerCase().trim() ===
        inputValue.value.toLowerCase().trim()
    );
  });
  // ! ayni coinin tekrar tekrar girilmesini engellemek icin onlem aldik.
  if (obj.length) {
    if (coins.includes(obj[0].symbol || coins.push(obj[0].name))) {
      hata2();
    } else {
      table(obj[0]);
      coins.push(obj[0].symbol);
    }
  } else {
    hata();
  }
  //   console.log(veri.data.coins);
  console.log(obj);
};

// !asagidaki kodlar fonksiyonlara ait

const hata2 = () => {
  section.innerHTML = `<h2>Ayni degeri daha once girdiniz. Farkli bir deger gririniz.</h2> `;
  section.style.color = "white";

  setTimeout(() => {
    section.innerHTML = "";
  }, 3000);
  inputValue.value = "";
  inputValue.focus();
};

const hata = () => {
  section.innerHTML = `<h2>Coin ismini dogru yazdiginizdan emin misiniz?</h2> `;
  section.style.color = "white";

  setTimeout(() => {
    section.innerHTML = "";
  }, 3000);
  inputValue.value = "";
  inputValue.focus();
};
//burasi deneme!  console.log(veri.data.coins[0].name); //! ana datandan icindei dataya ulastik. oradanda coins in icine ulastik. biz nokta notasyonu ile objlere ulasiriz. ama arrayda ulasamayiz.  oyuzden veri.data.coins[0]name yazarak array formatinda ulasabilirz. consolda bitcoin yazacak.
const table = (obj) => {
  const coins = document.querySelector(".coins");
  coins.innerHTML += `<figure class="coin">
  <figcaption class="coin-name"> 
    <p class="coin-temp">${obj.name}<sup>${obj.symbol}</sup></p>
    <p>$ ${obj.price}</p>
    <img class="coin-icon" src=${obj.iconUrl} alt="">
  </figcaption>
  <sup id="supchange">- ${obj.change} %</sup>
</figure>
  `;
  inputValue.value = "";
  inputValue.focus();
};
