import { menu } from "./db.js";
import { calculatePrice } from "./helpers.js";

// htmlde arayüzü göndericeğimiz yer
const outlet = document.getElementById("container");

/*
 * URL deki parametreli yönetebilmek için
 * URLSearchParams class'ından bir örnek oluşturduk
 * örneği oluşturuken kendi url'mizdeki parametrelei gönderdik
 */
const searchParams = new URLSearchParams(window.location.search);

//* get methodu aracılığıyla urldeki id parametresine eriştik
const paramid = searchParams.get("id");

//! menü içerisinden id'sini bildiğimiz elemana erişme
const product = menu.find((item) => item.id === Number(paramid));

// Bulduğumuz ürüne göre arayüzü ekrana basma
outlet.innerHTML = `      <span style="font-size: 64px; margin: 26px 0px 0px 115px"
><a href="/" style="text-decoration: none">&#127969;</a></span
>

<div class="card-header">
<p
  style="
  margin: auto;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px;
  padding: 11px;
  margin-bottom: 23px;
"
>
  ${product.title}
</p>
</div>

<div class="card-image">
<img
  src=${product.img}
  alt="An orange painted blue, cut in half laying on a blue background"
/>
</div>
<br /><br />
<div class="card-header">
<p>Ürün kategorisi</p>
<p style="color: #37af44">${product.category}</p>
</div>
<br /><br />
<div class="card-header">
<p>Ürün Fiyatı</p>
<button class="icon-button">$ ${calculatePrice(product.price)}</button>
</div>
<div class="card-meta" style="margin-top: 58px">
${product.desc}
</div>`;
