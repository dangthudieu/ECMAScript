
export function productsTable(data) {
    
    let html = "";
    html += ` <div class="flex flex-col lg:flex-row justify-around items-center">`;
    let outerCount = 1;
    for (let i = 0; i < data.length && outerCount <= 2; i += 4) {
        html += `<div class="flex-1 m-5 rounded-xl px-4 py-6 sm:px-8 sm:py-10 tm-bg-brown tm-item-container">`;

        for (let j = 0; j < 4; j++) {
            let dataIndex = i + j;

            if (dataIndex < data.length) {

                let product = data[dataIndex];
                console.log(product); 
                console.log('Product Object Keys:', Object.keys(product)); 

                html += ` <a href="./client/detail.html?id=${product.id}">
                      <div class="flex items-start mb-6 tm-menu-item">
                       
                          <img src="./uploads/img/${product.image}" alt="Image" class="rounded-md">
                          <div class="ml-3 sm:ml-6">
                              <h3 class="text-lg sm:text-xl mb-2 sm:mb-3 tm-text-yellow">${product.name}</h3>
                              <div class="text-white text-md sm:text-lg font-light mb-1"> ${product.price} VNĐ</div>
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
