
let API_URL = "http://localhost:3000";
let API_PRODUCT = "/products";
let API_CATEGORIES = '/categories';
let API_ORDER_DETAIL = "/order_details";
let API_ORDER = "/orders";

function productsTable(data) {
  let html = "";
  html += ` <div class="flex flex-col lg:flex-row justify-around items-center">`;
  let outerCount = 1;
  for (let i = 0; i < data.length && outerCount <= 2; i += 4) {
    html += `<div class="flex-1 m-5 rounded-xl px-4 py-6 sm:px-8 sm:py-10 tm-bg-brown tm-item-container">`;

    for (let j = 0; j < 4; j++) {
      let dataIndex = i + j;

      if (dataIndex < data.length) {
        let product = data[dataIndex];
        html += ` <a href="./client/detail.html?id=${product.id}">
                    <div class="flex items-start mb-6 tm-menu-item">
                     
                        <img src="./uploads/img/${product.image}" alt="Image" class="rounded-md">
                        <div class="ml-3 sm:ml-6">
                            <h3 class="text-lg sm:text-xl mb-2 sm:mb-3 tm-text-yellow">${product.name}</h3>
                            <div class="text-white text-md sm:text-lg font-light"> ${product.price} VNĐ</div>
                        </div>
                      
                    </div>
                  </a>`;
      }
    }

    html += `</div>`;
    outerCount++;
  }
  html += `</div>`;
  return html;
}

function categoriesProduct(categories) {
  let html = '';
  categories.forEach(element => {
    html += `
    <li class="inline-block  mb-4 mx-4">
    <a href="../client/categories.html?cate_id=${element.id}" class=" px-4 py-2">${element.name}</a>
    </li>
    `
  });
  return html;

}


fetch(API_URL + API_CATEGORIES)
  .then(function (response) {
    response.json().then(function (categories) {
      document.getElementById('categories').innerHTML = categoriesProduct(categories);
    })
  })


fetch(API_URL + API_PRODUCT)
  .then(function (response) {
    response.json().then(function (data) {
      document.getElementById("products").innerHTML = productsTable(data);
    });
  })
  .catch(function (error) {
    console.error("Error fetching data:", error);
  });
